import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse, RegisterRequest, User } from '../models/user.model';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadStoredUser();
  }

  login(credentials: LoginRequest): Observable<ApiResponse<LoginResponse>> {
    return this.http.post<ApiResponse<LoginResponse>>(`${this.apiUrl}/auth/login`, credentials)
      .pipe(
        tap(response => {
          if (response.status === 'SUCCESS') {
            this.storeToken(response.data.token);
            this.storeUser(response.data);
          }
        })
      );
  }

  register(userData: RegisterRequest): Observable<ApiResponse<LoginResponse>> {
    return this.http.post<ApiResponse<LoginResponse>>(`${this.apiUrl}/auth/register`, userData)
      .pipe(
        tap(response => {
          if (response.status === 'SUCCESS') {
            this.storeToken(response.data.token);
            this.storeUser(response.data);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  hasRole(role: string): boolean {
    const user = this.currentUserSubject.value;
    return user ? user.roles.includes(role) : false;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private storeToken(token: string): void {
    localStorage.setItem('token', token);
  }

  private storeUser(userData: LoginResponse): void {
    const user: User = {
      id: 0, // Will be set from backend
      username: userData.username,
      email: '', // Will be set from backend
      firstName: '', // Will be set from backend
      lastName: '', // Will be set from backend
      roles: userData.roles,
      isEnabled: true
    };
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  private loadStoredUser(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }
}
