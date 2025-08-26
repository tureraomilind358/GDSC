import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
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
  selector: 'app-forgot-password',
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
    <div class="forgot-password-container">
      <div class="forgot-password-card">
        <mat-card>
          <mat-card-header>
            <mat-card-title>Forgot Password</mat-card-title>
            <mat-card-subtitle>Enter your email to reset your password</mat-card-subtitle>
          </mat-card-header>
          
          <mat-card-content>
            <div *ngIf="!emailSent; else emailSentTemplate">
              <form [formGroup]="forgotPasswordForm" (ngSubmit)="onSubmit()">
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Email</mat-label>
                  <input matInput 
                         type="email" 
                         formControlName="email" 
                         placeholder="Enter your email address"
                         autocomplete="email">
                  <mat-icon matSuffix>email</mat-icon>
                  <mat-error *ngIf="forgotPasswordForm.get('email')?.hasError('required')">
                    Email is required
                  </mat-error>
                  <mat-error *ngIf="forgotPasswordForm.get('email')?.hasError('email')">
                    Please enter a valid email
                  </mat-error>
                </mat-form-field>

                <button mat-raised-button 
                        color="primary" 
                        type="submit" 
                        class="submit-button"
                        [disabled]="forgotPasswordForm.invalid || isLoading">
                  <mat-spinner *ngIf="isLoading" diameter="20"></mat-spinner>
                  <span *ngIf="!isLoading">Send Reset Link</span>
                </button>
              </form>

              <div class="back-to-login">
                <a routerLink="/auth/login">
                  <mat-icon>arrow_back</mat-icon>
                  Back to Login
                </a>
              </div>
            </div>

            <ng-template #emailSentTemplate>
              <div class="email-sent-content">
                <div class="success-icon">
                  <mat-icon>check_circle</mat-icon>
                </div>
                <h3>Check Your Email</h3>
                <p>We've sent a password reset link to:</p>
                <p class="email-address">{{ forgotPasswordForm.get('email')?.value }}</p>
                <p class="instructions">
                  Click the link in the email to reset your password. 
                  The link will expire in 1 hour.
                </p>
                
                <div class="actions">
                  <button mat-stroked-button (click)="resendEmail()" [disabled]="isResending">
                    <mat-spinner *ngIf="isResending" diameter="16"></mat-spinner>
                    <span *ngIf="!isResending">Resend Email</span>
                  </button>
                  <button mat-button (click)="changeEmail()">
                    Change Email
                  </button>
                </div>
              </div>
            </ng-template>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .forgot-password-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }

    .forgot-password-card {
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
      margin-bottom: 24px;
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

    .email-sent-content {
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

    .email-sent-content h3 {
      color: #333;
      margin-bottom: 16px;
      font-size: 20px;
      font-weight: 600;
    }

    .email-sent-content p {
      color: #666;
      margin-bottom: 12px;
      line-height: 1.5;
    }

    .email-address {
      font-weight: 600;
      color: #333;
      background: #f5f5f5;
      padding: 8px 12px;
      border-radius: 6px;
      margin: 16px 0;
    }

    .instructions {
      font-size: 14px;
      color: #888;
      margin-bottom: 24px;
    }

    .actions {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .actions button {
      height: 44px;
    }

    @media (max-width: 480px) {
      .forgot-password-container {
        padding: 16px;
      }
      
      mat-card-content {
        padding: 24px 16px 16px;
      }
    }
  `]
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  isLoading = false;
  isResending = false;
  emailSent = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.isLoading = true;
    const email = this.forgotPasswordForm.value.email;

    this.authService.forgotPassword(email).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.emailSent = true;
        this.notificationService.showSuccess('Password reset email sent successfully!');
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Forgot password error:', error);
        
        if (error.status === 404) {
          this.notificationService.showError('Email not found. Please check your email address.');
        } else if (error.status === 429) {
          this.notificationService.showError('Too many requests. Please wait before trying again.');
        } else {
          this.notificationService.showError('Failed to send reset email. Please try again later.');
        }
      }
    });
  }

  resendEmail(): void {
    this.isResending = true;
    const email = this.forgotPasswordForm.value.email;

    this.authService.forgotPassword(email).subscribe({
      next: (response) => {
        this.isResending = false;
        this.notificationService.showSuccess('Reset email sent again!');
      },
      error: (error) => {
        this.isResending = false;
        console.error('Resend email error:', error);
        this.notificationService.showError('Failed to resend email. Please try again.');
      }
    });
  }

  changeEmail(): void {
    this.emailSent = false;
    this.forgotPasswordForm.reset();
  }
}
