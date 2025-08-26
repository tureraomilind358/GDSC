import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthService } from '../auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="verify-email-container">
      <div class="verify-email-card">
        <mat-card>
          <mat-card-header>
            <mat-card-title>Email Verification</mat-card-title>
            <mat-card-subtitle>Verify your email address</mat-card-subtitle>
          </mat-card-header>
          
          <mat-card-content>
            <div *ngIf="isLoading" class="loading-content">
              <mat-spinner diameter="40"></mat-spinner>
              <p>Verifying your email...</p>
            </div>

            <div *ngIf="!isLoading && !verificationComplete; else verificationResultTemplate" class="verification-content">
              <div class="info-icon">
                <mat-icon>info</mat-icon>
              </div>
              <h3>Check Your Email</h3>
              <p>We've sent a verification link to your email address. Please click the link to verify your account.</p>
              
              <div class="actions">
                <button mat-stroked-button (click)="resendVerification()" [disabled]="isResending">
                  <mat-spinner *ngIf="isResending" diameter="16"></mat-spinner>
                  <span *ngIf="!isResending">Resend Verification Email</span>
                </button>
                <button mat-button (click)="goToLogin()">
                  Back to Login
                </button>
              </div>
            </div>

            <ng-template #verificationResultTemplate>
              <div class="verification-result">
                <div class="result-icon">
                  <mat-icon [class.success]="verificationSuccess" [class.error]="!verificationSuccess">
                    {{ verificationSuccess ? 'check_circle' : 'error' }}
                  </mat-icon>
                </div>
                <h3>{{ verificationSuccess ? 'Email Verified!' : 'Verification Failed' }}</h3>
                <p>{{ verificationMessage }}</p>
                
                <button mat-raised-button 
                        color="primary" 
                        class="action-button"
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
    .verify-email-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }

    .verify-email-card {
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

    .loading-content {
      text-align: center;
    }

    .loading-content p {
      margin-top: 16px;
      color: #666;
    }

    .verification-content {
      text-align: center;
    }

    .info-icon {
      margin-bottom: 16px;
    }

    .info-icon mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      color: #2196f3;
    }

    .verification-content h3 {
      color: #333;
      margin-bottom: 16px;
      font-size: 20px;
      font-weight: 600;
    }

    .verification-content p {
      color: #666;
      margin-bottom: 24px;
      line-height: 1.5;
    }

    .actions {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .actions button {
      height: 44px;
    }

    .verification-result {
      text-align: center;
    }

    .result-icon {
      margin-bottom: 16px;
    }

    .result-icon mat-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
    }

    .result-icon mat-icon.success {
      color: #4caf50;
    }

    .result-icon mat-icon.error {
      color: #f44336;
    }

    .verification-result h3 {
      color: #333;
      margin-bottom: 16px;
      font-size: 20px;
      font-weight: 600;
    }

    .verification-result p {
      color: #666;
      margin-bottom: 24px;
      line-height: 1.5;
    }

    .action-button {
      width: 100%;
      height: 48px;
      font-size: 16px;
      font-weight: 500;
    }

    @media (max-width: 480px) {
      .verify-email-container {
        padding: 16px;
      }
      
      mat-card-content {
        padding: 24px 16px 16px;
      }
    }
  `]
})
export class VerifyEmailComponent implements OnInit {
  isLoading = true;
  isResending = false;
  verificationComplete = false;
  verificationSuccess = false;
  verificationMessage = '';
  token = '';

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getTokenFromUrl();
  }

  private getTokenFromUrl(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      if (this.token) {
        this.verifyEmail();
      } else {
        this.isLoading = false;
        this.verificationComplete = true;
        this.verificationSuccess = false;
        this.verificationMessage = 'Invalid verification link. Please check your email for the correct link.';
      }
    });
  }

  private verifyEmail(): void {
    // This would typically call an API endpoint to verify the email
    // For now, we'll simulate the verification process
    setTimeout(() => {
      this.isLoading = false;
      this.verificationComplete = true;
      
      // Simulate successful verification (in real app, this would be based on API response)
      this.verificationSuccess = true;
      this.verificationMessage = 'Your email has been successfully verified! You can now log in to your account.';
      
      this.notificationService.showSuccess('Email verified successfully!');
    }, 2000);
  }

  resendVerification(): void {
    this.isResending = true;
    
    // This would typically call an API endpoint to resend verification email
    setTimeout(() => {
      this.isResending = false;
      this.notificationService.showSuccess('Verification email sent again!');
    }, 1000);
  }

  goToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}
