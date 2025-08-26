import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from '../../shared/models/user.model';
import { StorageService } from '../services/storage.service';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private notificationService: NotificationService
  ) {
    this.checkAuthStatus();
  }

  private checkAuthStatus(): void {
    const token = this.storageService.getToken();
    const user = this.storageService.getUser();
    
    console.log('Checking auth status:', { token: !!token, user });
    
    if (token && user) {
      console.log('Setting authenticated user:', user);
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);
    }
  }

  login(credentials:any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, credentials)
      .pipe(
        tap(response => {
          // console.log("Auth service response:", response);
          // console.log("Response data:", response.data);
          
          if (response.data.token && response.data) {
            // console.log("Setting user data:", response.data);
            // console.log("User roles:", response.data.roles);
            
            this.storageService.setToken(response.data.token);
            this.storageService.setUser(response.data);
            this.currentUserSubject.next(response.data);
            this.isAuthenticatedSubject.next(true);
            this.notificationService.showSuccess('Login successful!');
          }
        }),
        catchError(error => {
          console.error("Login error:", error);
          this.notificationService.showError('Login failed. Please check your credentials.');
          throw error;
        })
      );
  }

  register(userData: { firstName: string; lastName: string; email: string; phone: string; password: string; role: string }): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/auth/register`, userData)
      .pipe(
        tap(response => {
          this.notificationService.showSuccess('Registration successful! Please login.');
        }),
        catchError(error => {
          this.notificationService.showError('Registration failed. Please try again.');
          throw error;
        })
      );
  }

  logout(): void {
    this.storageService.clearAll();
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    this.notificationService.showInfo('Logged out successfully');
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/auth/forgot-password`, { email })
      .pipe(
        tap(response => {
          this.notificationService.showSuccess('Password reset email sent!');
        }),
        catchError(error => {
          this.notificationService.showError('Failed to send reset email. Please try again.');
          throw error;
        })
      );
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/auth/reset-password`, { token, newPassword })
      .pipe(
        tap(response => {
          this.notificationService.showSuccess('Password reset successful!');
        }),
        catchError(error => {
          this.notificationService.showError('Password reset failed. Please try again.');
          throw error;
        })
      );
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.storageService.getRefreshToken();
    if (!refreshToken) {
      return of(null);
    }

    return this.http.post<any>(`${environment.apiUrl}/auth/refresh`, { refreshToken })
      .pipe(
        tap(response => {
          if (response.token) {
            this.storageService.setToken(response.token);
          }
        }),
        catchError(error => {
          this.logout();
          throw error;
        })
      );
  }

  getCurrentUser(): User | null {
    const user = this.currentUserSubject.value;
    // console.log('Getting current user:', user);
    return user;
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user ? user.roles.includes(role) : false;
  }

  hasAnyRole(roles: string[]): boolean {
    const user = this.getCurrentUser();
    return user ? roles.some(role => user.roles.includes(role)) : false;
  }

  // Super admin helper: grants full access
  isSuperAdmin(): boolean {
    const user = this.getCurrentUser();
    if (!user || !Array.isArray(user.roles)) return false;
    return user.roles.includes('super_admin') || user.roles.includes('ROLE_SUPER_ADMIN');
  }

  // Admin or Super Admin helper
  isAdminOrSuper(): boolean {
    const user = this.getCurrentUser();
    if (!user || !Array.isArray(user.roles)) return false;
    return this.isSuperAdmin() || user.roles.includes('admin') || user.roles.includes('ROLE_ADMIN');
  }

  // Debug method to check user roles
  debugUserRoles(): void {
    const user = this.getCurrentUser();
    console.log('=== User Role Debug ===');
    console.log('Current user:', user);
    console.log('User roles:', user?.roles);
    console.log('Is authenticated:', this.isAuthenticated());
    console.log('Has admin role:', this.hasRole('admin'));
    console.log('Has ROLE_ADMIN:', this.hasRole('ROLE_ADMIN'));
    console.log('Has super_admin:', this.hasRole('super_admin'));
    console.log('Has ROLE_SUPER_ADMIN:', this.hasRole('ROLE_SUPER_ADMIN'));
    console.log('======================');
  }
}
