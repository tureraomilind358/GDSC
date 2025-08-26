import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthService } from '../auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="login-container">
      <div class="login-card">
        <mat-card>
          <mat-card-header>
            <mat-card-title>Welcome Back</mat-card-title>
            <mat-card-subtitle>Sign in to your account</mat-card-subtitle>
          </mat-card-header>
          
          <mat-card-content>
            <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>username</mat-label>
                <input matInput 
                       type="text" 
                       formControlName="username" 
                       placeholder="Enter your username"
                       autocomplete="username">
                <mat-icon matSuffix>username</mat-icon>
                <mat-error *ngIf="loginForm.get('username')?.hasError('required')">
                  username is required
                </mat-error>
                <mat-error *ngIf="loginForm.get('username')?.hasError('username')">
                  Please enter a valid username
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Password</mat-label>
                <input matInput 
                       [type]="showPassword ? 'text' : 'password'" 
                       formControlName="password" 
                       placeholder="Enter your password"
                       autocomplete="current-password">
                <mat-icon matSuffix (click)="togglePasswordVisibility()" class="password-toggle">
                  {{ showPassword ? 'visibility_off' : 'visibility' }}
                </mat-icon>
                <mat-error *ngIf="loginForm.get('password')?.hasError('required')">
                  Password is required
                </mat-error>
                <mat-error *ngIf="loginForm.get('password')?.hasError('minlength')">
                  Password must be at least 6 characters
                </mat-error>
              </mat-form-field>

              <div class="form-options">
                <!-- <mat-checkbox formControlName="rememberMe">
                  Remember me
                </mat-checkbox> -->
                <a routerLink="/auth/forgot-password" class="forgot-password">
                  Forgot Password?
                </a>
              </div>

              <button mat-raised-button 
                      color="primary" 
                      type="submit" 
                      class="login-button"
                      [disabled]="loginForm.invalid || isLoading">
                <mat-spinner *ngIf="isLoading" diameter="20"></mat-spinner>
                <span *ngIf="!isLoading">Sign In</span>
              </button>
            </form>

            <div class="divider">
              <span>or</span>
            </div>

            <div class="social-login">
              <button mat-stroked-button class="social-button google">
                <mat-icon>google</mat-icon>
                Continue with Google
              </button>
              <button mat-stroked-button class="social-button microsoft">
                <mat-icon>computer</mat-icon>
                Continue with Microsoft
              </button>
            </div>

            <div class="register-link">
              <p>Don't have an account? 
                <a routerLink="/auth/register">Sign up here</a>
              </p>
            </div>


          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }

    .login-card {
      width: 100%;
      max-width: 400px;
    }

    mat-card {
      padding: 0;
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    mat-card-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 24px 24px 0;
      border-radius: 12px 12px 0 0;
    }

    mat-card-title {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 8px;
    }

    mat-card-subtitle {
      color: rgba(255, 255, 255, 0.8);
      font-size: 14px;
    }

    mat-card-content {
      padding: 32px 24px 24px;
    }

    .full-width {
      width: 100%;
      margin-bottom: 16px;
    }

    .password-toggle {
      cursor: pointer;
      user-select: none;
    }

    .form-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .forgot-password {
      color: #667eea;
      text-decoration: none;
      font-size: 14px;
    }

    .forgot-password:hover {
      text-decoration: underline;
    }

    .login-button {
      width: 100%;
      height: 48px;
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 24px;
    }

    .divider {
      text-align: center;
      margin: 24px 0;
      position: relative;
    }

    .divider::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 1px;
      background: #e0e0e0;
    }

    .divider span {
      background: white;
      padding: 0 16px;
      color: #666;
      font-size: 14px;
    }

    .social-login {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 24px;
    }

    .social-button {
      height: 44px;
      border-radius: 8px;
      font-weight: 500;
    }

    .social-button.google {
      border-color: #db4437;
      color: #db4437;
    }

    .social-button.microsoft {
      border-color: #00a4ef;
      color: #00a4ef;
    }

    .register-link {
      text-align: center;
      margin-top: 16px;
    }

    .register-link p {
      margin: 0;
      color: #666;
      font-size: 14px;
    }

    .register-link a {
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
    }

    .register-link a:hover {
      text-decoration: underline;
    }

    @media (max-width: 480px) {
      .login-container {
        padding: 16px;
      }
      
      mat-card-content {
        padding: 24px 16px 16px;
      }
    }
  `]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.checkExistingAuth();
  }

  private initializeForm(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  private checkExistingAuth(): void {
    if (this.authService.isAuthenticated()) {
      this.redirectBasedOnRole();
    }
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    const credentials = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.notificationService.showSuccess('Login successful!');
        
        // Debug user roles
        this.authService.debugUserRoles();
        
        // Store remember me preference
        if (credentials.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        } else {
          localStorage.removeItem('rememberMe');
        }

        this.redirectBasedOnRole();
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Login error:', error);
        
        // Handle specific error cases
        if (error.status === 401) {
          this.notificationService.showError('Invalid username or password');
        } else if (error.status === 403) {
          this.notificationService.showError('Account is disabled. Please contact administrator.');
        } else if (error.status === 0) {
          this.notificationService.showError('Network error. Please check your connection.');
        } else {
          this.notificationService.showError('Login failed. Please try again.');
        }
      }
    });
  }

  private redirectBasedOnRole(): void {
    const user = this.authService.getCurrentUser();
    console.log("log in com ", user);
    console.log("User roles:", user?.roles);
    
    
    if (!user) {
      this.router.navigate(['/']);
      return;
    }

    // Redirect based on user role - handle multiple possible role formats
    if (user.roles.some(role => 
      role === 'ROLE_ADMIN' || 
      role === 'admin' || 
      role === 'super_admin' || 
      role === 'ROLE_SUPER_ADMIN'
    )) {
      this.router.navigate(['/admin/dashboard']);
    } else if (user.roles.some(role => 
      role === 'centre_admin' || 
      role === 'centre_manager' || 
      role === 'ROLE_CENTRE_ADMIN' || 
      role === 'ROLE_CENTRE_MANAGER'
    )) {
      this.router.navigate(['/centre/dashboard']);
    } else if (user.roles.some(role => 
      role === 'examiner' || 
      role === 'instructor' || 
      role === 'ROLE_EXAMINER' || 
      role === 'ROLE_INSTRUCTOR'
    )) {
      this.router.navigate(['/examiner/dashboard']);
    } else if (user.roles.some(role => 
      role === 'candidate' || 
      role === 'student' || 
      role === 'ROLE_CANDIDATE' || 
      role === 'ROLE_STUDENT'
    )) {
      this.router.navigate(['/candidate/dashboard']);
    } else {
      // Default redirect for unknown roles
      console.warn('Unknown user roles:', user.roles);
      this.router.navigate(['/']);
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  // Social login methods
  loginWithGoogle(): void {
    this.notificationService.showInfo('Google login coming soon');
  }

  loginWithMicrosoft(): void {
    this.notificationService.showInfo('Microsoft login coming soon');
  }


}
