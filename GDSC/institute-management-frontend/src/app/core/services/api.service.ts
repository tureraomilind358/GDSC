import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { StorageService } from './storage.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private notificationService: NotificationService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.storageService.getToken();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.storageService.getToken();
    let headers = new HttpHeaders();

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 400:
          errorMessage = error.error?.message || 'Bad request';
          break;
        case 401:
          errorMessage = 'Unauthorized access';
          this.handleUnauthorized();
          break;
        case 403:
          errorMessage = 'Access forbidden';
          break;
        case 404:
          errorMessage = 'Resource not found';
          // Don't show notification for 404 errors in development
          if (!environment.enableDebug) {
            this.notificationService.showError(errorMessage);
          }
          break;
        case 409:
          errorMessage = error.error?.message || 'Conflict occurred';
          break;
        case 422:
          errorMessage = error.error?.message || 'Validation failed';
          break;
        case 429:
          errorMessage = 'Too many requests. Please try again later.';
          break;
        case 500:
          errorMessage = 'Internal server error';
          break;
        case 502:
          errorMessage = 'Bad gateway';
          break;
        case 503:
          errorMessage = 'Service unavailable';
          break;
        default:
          errorMessage = error.error?.message || `Error ${error.status}: ${error.statusText}`;
      }
    }

    if (environment.enableDebug) {
      console.error('API Error:', error);
      // In development, don't show notifications for 404 errors
      if (error.status !== 404) {
        this.notificationService.showError(errorMessage);
      }
    } else {
      this.notificationService.showError(errorMessage);
    }
    
    return throwError(() => new Error(errorMessage));
  }

  private handleUnauthorized(): void {
    // Clear stored tokens and redirect to login
    this.storageService.clearAll();
    // You can inject Router here and navigate to login
    // this.router.navigate(['/auth/login']);
  }

  private addRetry<T>(observable: Observable<T>): Observable<T> {
    return observable.pipe(
      retry(environment.production ? 1 : 3),
      catchError(this.handleError.bind(this))
    );
  }

  get<T>(endpoint: string, params?: any): Observable<T> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
          if (params[key] instanceof Date) {
            httpParams = httpParams.set(key, params[key].toISOString());
          } else {
            httpParams = httpParams.set(key, params[key].toString());
          }
        }
      });
    }

    const url = `${this.baseUrl}${endpoint}`;
    // console.log(`Making GET request to: ${url}`);
    // console.log('Parameters:', params);
    // console.log('Headers:', this.getHeaders());

    return this.addRetry(
      this.http.get<T>(url, { 
        params: httpParams,
        headers: this.getHeaders()
      }).pipe(
        tap(response => {
          // console.log(`GET response from ${url}:`, response);
        })
      )
    );
  }

  post<T>(endpoint: string, data: any): Observable<T> {
    return this.addRetry(
      this.http.post<T>(`${this.baseUrl}${endpoint}`, data, { 
        headers: this.getHeaders() 
      })
    );
  }

  put<T>(endpoint: string, data: any): Observable<T> {
    return this.addRetry(
      this.http.put<T>(`${this.baseUrl}${endpoint}`, data, { 
        headers: this.getHeaders() 
      })
    );
  }

  patch<T>(endpoint: string, data: any): Observable<T> {
    return this.addRetry(
      this.http.patch<T>(`${this.baseUrl}${endpoint}`, data, { 
        headers: this.getHeaders() 
      })
    );
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.addRetry(
      this.http.delete<T>(`${this.baseUrl}${endpoint}`, { 
        headers: this.getHeaders() 
      })
    );
  }

  upload<T>(endpoint: string, formData: FormData): Observable<T> {
    return this.addRetry(
      this.http.post<T>(`${this.baseUrl}${endpoint}`, formData, { 
        headers: this.getAuthHeaders() 
      })
    );
  }

  download(endpoint: string, params?: any): Observable<Blob> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
          if (params[key] instanceof Date) {
            httpParams = httpParams.set(key, params[key].toISOString());
          } else {
            httpParams = httpParams.set(key, params[key].toString());
          }
        }
      });
    }

    return this.addRetry(
      this.http.get(`${this.baseUrl}${endpoint}`, {
        responseType: 'blob',
        params: httpParams,
        headers: this.getHeaders()
      })
    );
  }

  // Method to handle file uploads with progress
  uploadWithProgress<T>(endpoint: string, formData: FormData): Observable<any> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, formData, {
      headers: this.getAuthHeaders(),
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  // Method to handle streaming responses
  stream<T>(endpoint: string, params?: any): Observable<T> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key].toString());
        }
      });
    }

    return this.http.get<T>(`${this.baseUrl}${endpoint}`, {
      params: httpParams,
      headers: this.getHeaders(),
      responseType: 'text' as any
    }).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  // Method to check API health
  healthCheck(): Observable<any> {
    return this.http.get(`${this.baseUrl}/health`, { 
      headers: this.getHeaders() 
    }).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  // Method to get API version
  getApiVersion(): Observable<any> {
    return this.http.get(`${this.baseUrl}/version`, { 
      headers: this.getHeaders() 
    }).pipe(
      catchError(this.handleError.bind(this))
    );
  }
}
