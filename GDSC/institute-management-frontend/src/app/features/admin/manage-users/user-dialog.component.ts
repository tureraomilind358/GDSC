import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule
  ],
  template: `
    <h2 mat-dialog-title>
      <mat-icon>{{ isEditMode ? 'edit' : 'add' }}</mat-icon>
      {{ isEditMode ? 'Edit User' : 'Create New User' }}
    </h2>
    
    <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
      <mat-dialog-content>
        <div class="form-row">
          <mat-form-field appearance="outline" class="half-width">
            <mat-label>First Name</mat-label>
            <input matInput formControlName="firstName" placeholder="Enter first name">
            <mat-error *ngIf="userForm.get('firstName')?.hasError('required')">
              First name is required
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Last Name</mat-label>
            <input matInput formControlName="lastName" placeholder="Enter last name">
            <mat-error *ngIf="userForm.get('lastName')?.hasError('required')">
              Last name is required
            </mat-error>
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Username</mat-label>
            <input matInput formControlName="username" placeholder="Enter username">
            <mat-error *ngIf="userForm.get('username')?.hasError('required')">
              Username is required
            </mat-error>
            <mat-error *ngIf="userForm.get('username')?.hasError('minlength')">
              Username must be at least 3 characters
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Email</mat-label>
            <input matInput type="email" formControlName="email" placeholder="Enter email">
            <mat-error *ngIf="userForm.get('email')?.hasError('required')">
              Email is required
            </mat-error>
            <mat-error *ngIf="userForm.get('email')?.hasError('email')">
              Please enter a valid email
            </mat-error>
          </mat-form-field>
        </div>

        <div class="form-row" *ngIf="!isEditMode">
          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Password</mat-label>
            <input matInput type="password" formControlName="password" placeholder="Enter password">
            <mat-error *ngIf="userForm.get('password')?.hasError('required')">
              Password is required
            </mat-error>
            <mat-error *ngIf="userForm.get('password')?.hasError('minlength')">
              Password must be at least 8 characters
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Confirm Password</mat-label>
            <input matInput type="password" formControlName="confirmPassword" placeholder="Confirm password">
            <mat-error *ngIf="userForm.get('confirmPassword')?.hasError('required')">
              Confirm password is required
            </mat-error>
            <mat-error *ngIf="userForm.get('confirmPassword')?.hasError('passwordMismatch')">
              Passwords do not match
            </mat-error>
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Phone</mat-label>
            <input matInput formControlName="phone" placeholder="Enter phone number">
          </mat-form-field>

          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Date of Birth</mat-label>
            <input matInput type="date" formControlName="dateOfBirth">
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Address</mat-label>
            <textarea matInput formControlName="address" rows="2" placeholder="Enter address"></textarea>
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline" class="half-width">
            <mat-label>City</mat-label>
            <input matInput formControlName="city" placeholder="Enter city">
          </mat-form-field>

          <mat-form-field appearance="outline" class="half-width">
            <mat-label>State</mat-label>
            <input matInput formControlName="state" placeholder="Enter state">
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Country</mat-label>
            <input matInput formControlName="country" placeholder="Enter country">
          </mat-form-field>

          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Postal Code</mat-label>
            <input matInput formControlName="postalCode" placeholder="Enter postal code">
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Roles</mat-label>
            <mat-select formControlName="roles" multiple>
              <mat-option value="admin">Admin</mat-option>
              <mat-option value="super_admin">Super Admin</mat-option>
              <mat-option value="examiner">Examiner</mat-option>
              <mat-option value="candidate">Candidate</mat-option>
              <mat-option value="centre_manager">Centre Manager</mat-option>
            </mat-select>
            <mat-error *ngIf="userForm.get('roles')?.hasError('required')">
              At least one role is required
            </mat-error>
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Department</mat-label>
            <input matInput formControlName="department" placeholder="Enter department">
          </mat-form-field>
        </div>

        <div class="form-row options">
          <mat-checkbox formControlName="isActive">Active User</mat-checkbox>
          <mat-checkbox formControlName="emailVerified">Email Verified</mat-checkbox>
          <mat-checkbox formControlName="twoFactorEnabled">Two-Factor Authentication</mat-checkbox>
        </div>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button mat-dialog-close type="button">Cancel</button>
        <button *ngIf="data.mode !== 'view'" 
                mat-raised-button 
                color="primary" 
                type="submit" 
                [disabled]="userForm.invalid || isSubmitting">
          <mat-icon *ngIf="isSubmitting">hourglass_empty</mat-icon>
          {{ isSubmitting ? 'Saving...' : (isEditMode ? 'Update' : 'Create') }}
        </button>
      </mat-dialog-actions>
    </form>
  `,
  styles: [`
    .form-row {
      display: flex;
      gap: 16px;
      margin-bottom: 16px;
    }

    .full-width {
      width: 100%;
    }

    .half-width {
      flex: 1;
    }

    .options {
      display: flex;
      gap: 24px;
      flex-wrap: wrap;
    }

    mat-dialog-content {
      min-width: 600px;
      max-height: 70vh;
      overflow-y: auto;
    }

    mat-dialog-actions {
      padding: 16px 0;
    }

    @media (max-width: 600px) {
      .form-row {
        flex-direction: column;
        gap: 8px;
      }

      mat-dialog-content {
        min-width: auto;
      }
    }
  `]
})
export class UserDialogComponent implements OnInit {
  userForm: FormGroup;
  isEditMode = false;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user?: User; mode: 'add' | 'edit' | 'view' }
  ) {
    this.isEditMode = data.mode === 'edit';
    this.initializeForm();
  }

  ngOnInit(): void {
    if ((this.isEditMode || this.data.mode === 'view') && this.data.user) {
      this.userForm.patchValue(this.data.user);
      if (this.data.mode === 'view') {
        this.userForm.disable();
      }
    }
  }

  private initializeForm(): void {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      phone: [''],
      dateOfBirth: [null],
      address: [''],
      city: [''],
      state: [''],
      country: [''],
      postalCode: [''],
      roles: [[], [Validators.required]],
      department: [''],
      isActive: [true],
      emailVerified: [false],
      twoFactorEnabled: [false]
    }, { validators: this.passwordMatchValidator });
  }

  private passwordMatchValidator(group: FormGroup): {[key: string]: any} | null {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.isSubmitting = true;
      const userData = this.userForm.value;
      
      // Remove confirmPassword from the data
      delete userData.confirmPassword;
      
      // Simulate API call
      setTimeout(() => {
        this.isSubmitting = false;
        this.dialogRef.close({
          success: true,
          data: userData,
          mode: this.isEditMode ? 'edit' : 'add'
        });
      }, 1000);
    }
  }
}
