import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="unauthorized-container">
      <div class="unauthorized-card">
        <mat-card>
          <mat-card-content>
            <div class="error-content">
              <div class="error-icon">
                <mat-icon>block</mat-icon>
              </div>
              <h1>403</h1>
              <h2>Access Denied</h2>
              <p>Sorry, you don't have permission to access this page.</p>
              <p class="sub-text">Please contact your administrator if you believe this is an error.</p>
              
              <div class="actions">
                <button mat-raised-button 
                        color="primary" 
                        (click)="goBack()">
                  <mat-icon>arrow_back</mat-icon>
                  Go Back
                </button>
                <button mat-stroked-button 
                        (click)="goHome()">
                  <mat-icon>home</mat-icon>
                  Go Home
                </button>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .unauthorized-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }

    .unauthorized-card {
      width: 100%;
      max-width: 500px;
    }

    mat-card {
      padding: 0;
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    mat-card-content {
      padding: 48px 32px;
    }

    .error-content {
      text-align: center;
    }

    .error-icon {
      margin-bottom: 24px;
    }

    .error-icon mat-icon {
      font-size: 80px;
      width: 80px;
      height: 80px;
      color: #f44336;
    }

    .error-content h1 {
      font-size: 72px;
      font-weight: 700;
      color: #f44336;
      margin: 0 0 16px 0;
      line-height: 1;
    }

    .error-content h2 {
      font-size: 32px;
      font-weight: 600;
      color: #333;
      margin: 0 0 16px 0;
    }

    .error-content p {
      font-size: 18px;
      color: #666;
      margin: 0 0 12px 0;
      line-height: 1.5;
    }

    .sub-text {
      font-size: 14px;
      color: #888;
      margin-bottom: 32px;
    }

    .actions {
      display: flex;
      gap: 16px;
      justify-content: center;
      flex-wrap: wrap;
    }

    .actions button {
      min-width: 140px;
      height: 48px;
      font-size: 16px;
      font-weight: 500;
    }

    @media (max-width: 600px) {
      .unauthorized-container {
        padding: 16px;
      }
      
      mat-card-content {
        padding: 32px 24px;
      }

      .error-content h1 {
        font-size: 56px;
      }

      .error-content h2 {
        font-size: 24px;
      }

      .actions {
        flex-direction: column;
        align-items: center;
      }

      .actions button {
        width: 100%;
        max-width: 200px;
      }
    }
  `]
})
export class UnauthorizedComponent {
  constructor(private router: Router) {}

  goBack(): void {
    window.history.back();
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
