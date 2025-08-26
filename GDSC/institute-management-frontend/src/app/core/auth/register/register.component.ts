import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthService } from '../auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-register',
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
    MatSelectModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="register-container">
      <div class="register-card">
        <mat-card>
          <mat-card-header>
            <mat-card-title>Create Account</mat-card-title>
            <mat-card-subtitle>Join our institute management system</mat-card-subtitle>
          </mat-card-header>
          
          <mat-card-content>
            <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
              <div class="name-fields">
                <mat-form-field appearance="outline">
                  <mat-label>First Name</mat-label>
                  <input matInput 
                         formControlName="firstName" 
                         placeholder="Enter your first name"
                         autocomplete="given-name">
                  <mat-error *ngIf="registerForm.get('firstName')?.hasError('required')">
                    First name is required
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Last Name</mat-label>
                  <input matInput 
                         formControlName="lastName" 
                         placeholder="Enter your last name"
                         autocomplete="family-name">
                  <mat-error *ngIf="registerForm.get('lastName')?.hasError('required')">
                    Last name is required
                  </mat-error>
                </mat-form-field>
              </div>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Email</mat-label>
                <input matInput 
                       type="email" 
                       formControlName="email" 
                       placeholder="Enter your email"
                       autocomplete="email">
                <mat-icon matSuffix>email</mat-icon>
                <mat-error *ngIf="registerForm.get('email')?.hasError('required')">
                  Email is required
                </mat-error>
                <mat-error *ngIf="registerForm.get('email')?.hasError('email')">
                  Please enter a valid email
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Phone Number</mat-label>
                <input matInput 
                       type="tel" 
                       formControlName="phone" 
                       placeholder="Enter your phone number"
                       autocomplete="tel">
                <mat-icon matSuffix>phone</mat-icon>
                <mat-error *ngIf="registerForm.get('phone')?.hasError('required')">
                  Phone number is required
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Role</mat-label>
                <mat-select formControlName="role">
                  <mat-option value="student">Student</mat-option>
                  <mat-option value="instructor">Instructor</mat-option>
                  <mat-option value="centre_admin">Centre Administrator</mat-option>
                </mat-select>
                <mat-error *ngIf="registerForm.get('role')?.hasError('required')">
                  Role is required
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Password</mat-label>
                <input matInput 
                       [type]="showPassword ? 'text' : 'password'" 
                       formControlName="password" 
                       placeholder="Create a password"
                       autocomplete="new-password">
                <mat-icon matSuffix (click)="togglePasswordVisibility()" class="password-toggle">
                  {{ showPassword ? 'visibility_off' : 'visibility' }}
                </mat-icon>
                <mat-error *ngIf="registerForm.get('password')?.hasError('required')">
                  Password is required
                </mat-error>
                <mat-error *ngIf="registerForm.get('password')?.hasError('minlength')">
                  Password must be at least 8 characters
                </mat-error>
                <mat-error *ngIf="registerForm.get('password')?.hasError('pattern')">
                  Password must contain at least one uppercase letter, one lowercase letter, and one number
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Confirm Password</mat-label>
                <input matInput 
                       [type]="showConfirmPassword ? 'text' : 'password'" 
                       formControlName="confirmPassword" 
                       placeholder="Confirm your password"
                       autocomplete="new-password">
                <mat-icon matSuffix (click)="toggleConfirmPasswordVisibility()" class="password-toggle">
                  {{ showConfirmPassword ? 'visibility_off' : 'visibility' }}
                </mat-icon>
                <mat-error *ngIf="registerForm.get('confirmPassword')?.hasError('required')">
                  Please confirm your password
                </mat-error>
                <mat-error *ngIf="registerForm.get('confirmPassword')?.hasError('passwordMismatch')">
                  Passwords do not match
                </mat-error>
              </mat-form-field>

              <div class="terms-section">
                <mat-checkbox formControlName="agreeToTerms" required>
                  I agree to the 
                  <a href="#" (click)="openTerms($event)">Terms of Service</a> 
                  and 
                  <a href="#" (click)="openPrivacy($event)">Privacy Policy</a>
                </mat-checkbox>
                <mat-error *ngIf="registerForm.get('agreeToTerms')?.hasError('required') && registerForm.get('agreeToTerms')?.touched">
                  You must agree to the terms and conditions
                </mat-error>
              </div>

              <button mat-raised-button 
                      color="primary" 
                      type="submit" 
                      class="register-button"
                      [disabled]="registerForm.invalid || isLoading">
                <mat-spinner *ngIf="isLoading" diameter="20"></mat-spinner>
                <span *ngIf="!isLoading">Create Account</span>
              </button>
            </form>

            <div class="login-link">
              <p>Already have an account? 
                <a routerLink="/auth/login">Sign in here</a>
              </p>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .register-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }

    .register-card {
      width: 100%;
      max-width: 500px;
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

    .name-fields {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 16px;
    }

    .full-width {
      width: 100%;
      margin-bottom: 16px;
    }

    .password-toggle {
      cursor: pointer;
      user-select: none;
    }

    .terms-section {
      margin: 24px 0;
    }

    .terms-section a {
      color: #667eea;
      text-decoration: none;
    }

    .terms-section a:hover {
      text-decoration: underline;
    }

    .register-button {
      width: 100%;
      height: 48px;
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 24px;
    }

    .login-link {
      text-align: center;
      margin-top: 16px;
    }

    .login-link p {
      margin: 0;
      color: #666;
      font-size: 14px;
    }

    .login-link a {
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
    }

    .login-link a:hover {
      text-decoration: underline;
    }

    @media (max-width: 600px) {
      .name-fields {
        grid-template-columns: 1fr;
      }
      
      .register-container {
        padding: 16px;
      }
      
      mat-card-content {
        padding: 24px 16px 16px;
      }
    }
  `]
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isLoading = false;
  showPassword = false;
  showConfirmPassword = false;

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
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[\d\s-()]+$/)]],
      role: ['student', [Validators.required]],
      password: ['', [
        Validators.required, 
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
      ]],
      confirmPassword: ['', [Validators.required]],
      agreeToTerms: [false, [Validators.requiredTrue]]
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

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.isLoading = true;
    const userData = {
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
      phone: this.registerForm.value.phone,
      password: this.registerForm.value.password,
      role: this.registerForm.value.role
    };

    this.authService.register(userData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.notificationService.showSuccess('Registration successful! Please check your email to verify your account.');
        this.router.navigate(['/auth/login']);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Registration error:', error);
        
        if (error.status === 409) {
          this.notificationService.showError('Email already exists. Please use a different email or try logging in.');
        } else if (error.status === 400) {
          this.notificationService.showError('Invalid registration data. Please check your information.');
        } else {
          this.notificationService.showError('Registration failed. Please try again later.');
        }
      }
    });
  }

  private markFormGroupTouched(): void {
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      control?.markAsTouched();
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  openTerms(event: Event): void {
    event.preventDefault();
    this.notificationService.showInfo('Terms of Service will be displayed here');
  }

  openPrivacy(event: Event): void {
    event.preventDefault();
    this.notificationService.showInfo('Privacy Policy will be displayed here');
  }
}
