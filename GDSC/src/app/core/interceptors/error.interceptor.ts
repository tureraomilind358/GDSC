import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  
  constructor(
    private notificationService: NotificationService,
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An error occurred';

        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = error.error.message;
        } else {
          // Server-side error
          switch (error.status) {
            case 400:
              errorMessage = error.error?.message || 'Bad Request';
              break;
            case 401:
              errorMessage = 'Unauthorized access';
              this.handleUnauthorized();
              break;
            case 403:
              errorMessage = 'Access forbidden';
              this.handleForbidden();
              break;
            case 404:
              errorMessage = 'Resource not found';
              break;
            case 409:
              errorMessage = error.error?.message || 'Conflict occurred';
              break;
            case 422:
              errorMessage = error.error?.message || 'Validation failed';
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
              errorMessage = error.error?.message || `Error ${error.status}`;
          }
        }

        // Show notification for errors
        if (error.status !== 401 && error.status !== 403) {
          this.notificationService.error('Error', errorMessage);
        }

        return throwError(() => error);
      })
    );
  }

  private handleUnauthorized(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  private handleForbidden(): void {
    this.router.navigate(['/unauthorized']);
  }
}
