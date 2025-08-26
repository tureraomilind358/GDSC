import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthService } from '../auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-reset-password',
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
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="reset-password-container">
      <div class="reset-password-card">
        <mat-card>
          <mat-card-header>
            <mat-card-title>Reset Password</mat-card-title>
            <mat-card-subtitle>Enter your new password</mat-card-subtitle>
          </mat-card-header>
          
          <mat-card-content>
            <div *ngIf="!passwordReset; else passwordResetTemplate">
              <form [formGroup]="resetPasswordForm" (ngSubmit)="onSubmit()">
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>New Password</mat-label>
                  <input matInput 
                         [type]="showPassword ? 'text' : 'password'" 
                         formControlName="password" 
                         placeholder="Enter your new password"
                         autocomplete="new-password">
                  <mat-icon matSuffix (click)="togglePasswordVisibility()" class="password-toggle">
                    {{ showPassword ? 'visibility_off' : 'visibility' }}
                  </mat-icon>
                  <mat-error *ngIf="resetPasswordForm.get('password')?.hasError('required')">
                    Password is required
                  </mat-error>
                  <mat-error *ngIf="resetPasswordForm.get('password')?.hasError('minlength')">
                    Password must be at least 8 characters
                  </mat-error>
                  <mat-error *ngIf="resetPasswordForm.get('password')?.hasError('pattern')">
                    Password must contain at least one uppercase letter, one lowercase letter, and one number
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Confirm New Password</mat-label>
                  <input matInput 
                         [type]="showConfirmPassword ? 'text' : 'password'" 
                         formControlName="confirmPassword" 
                         placeholder="Confirm your new password"
                         autocomplete="new-password">
                  <mat-icon matSuffix (click)="toggleConfirmPasswordVisibility()" class="password-toggle">
                    {{ showConfirmPassword ? 'visibility_off' : 'visibility' }}
                  </mat-icon>
                  <mat-error *ngIf="resetPasswordForm.get('confirmPassword')?.hasError('required')">
                    Please confirm your password
                  </mat-error>
                  <mat-error *ngIf="resetPasswordForm.get('confirmPassword')?.hasError('passwordMismatch')">
                    Passwords do not match
                  </mat-error>
                </mat-form-field>

                <button mat-raised-button 
                        color="primary" 
                        type="submit" 
                        class="submit-button"
                        [disabled]="resetPasswordForm.invalid || isLoading">
                  <mat-spinner *ngIf="isLoading" diameter="20"></mat-spinner>
                  <span *ngIf="!isLoading">Reset Password</span>
                </button>
              </form>

              <div class="back-to-login">
                <a routerLink="/auth/login">
                  <mat-icon>arrow_back</mat-icon>
                  Back to Login
                </a>
              </div>
            </div>

            <ng-template #passwordResetTemplate>
              <div class="password-reset-content">
                <div class="success-icon">
                  <mat-icon>check_circle</mat-icon>
                </div>
                <h3>Password Reset Successful</h3>
                <p>Your password has been successfully reset. You can now log in with your new password.</p>
                
                <button mat-raised-button 
                        color="primary" 
                        class="login-button"
                        (click)="goToLogin()">
                  Go to Login
                </button>
              </div>
            </ng-template>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .reset-password-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }

    .reset-password-card {
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

    .submit-button {
      width: 100%;
      height: 48px;
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 24px;
    }

    .back-to-login {
      text-align: center;
    }

    .back-to-login a {
      color: #667eea;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-weight: 500;
    }

    .back-to-login a:hover {
      text-decoration: underline;
    }

    .password-reset-content {
      text-align: center;
    }

    .success-icon {
      margin-bottom: 16px;
    }

    .success-icon mat-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      color: #4caf50;
    }

    .password-reset-content h3 {
      color: #333;
      margin-bottom: 16px;
      font-size: 20px;
      font-weight: 600;
    }

    .password-reset-content p {
      color: #666;
      margin-bottom: 24px;
      line-height: 1.5;
    }

    .login-button {
      width: 100%;
      height: 48px;
      font-size: 16px;
      font-weight: 500;
    }

    @media (max-width: 480px) {
      .reset-password-container {
        padding: 16px;
      }
      
      mat-card-content {
        padding: 24px 16px 16px;
      }
    }
  `]
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  isLoading = false;
  showPassword = false;
  showConfirmPassword = false;
  passwordReset = false;
  token = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getTokenFromUrl();
  }

  private initializeForm(): void {
    this.resetPasswordForm = this.fb.group({
      password: ['', [
        Validators.required, 
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
      ]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  private passwordMatchValidator(form: FormGroup): { [key: string]: any } | null {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    if (confirmPassword && confirmPassword.errors?.['passwordMismatch']) {
      delete confirmPassword.errors['passwordMismatch'];
      if (Object.keys(confirmPassword.errors).length === 0) {
        confirmPassword.setErrors(null);
      }
    }
    
    return null;
  }

  private getTokenFromUrl(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      if (!this.token) {
        this.notificationService.showError('Invalid reset link. Please request a new password reset.');
        this.router.navigate(['/auth/forgot-password']);
      }
    });
  }

  onSubmit(): void {
    if (this.resetPasswordForm.invalid || !this.token) {
      return;
    }

    this.isLoading = true;
    const newPassword = this.resetPasswordForm.value.password;

    this.authService.resetPassword(this.token, newPassword).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.passwordReset = true;
        this.notificationService.showSuccess('Password reset successfully!');
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Reset password error:', error);
        
        if (error.status === 400) {
          this.notificationService.showError('Invalid or expired reset token. Please request a new password reset.');
          this.router.navigate(['/auth/forgot-password']);
        } else if (error.status === 422) {
          this.notificationService.showError('Password does not meet requirements. Please try again.');
        } else {
          this.notificationService.showError('Failed to reset password. Please try again later.');
        }
      }
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  goToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}
