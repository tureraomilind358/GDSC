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
import { Centre } from '../../../shared/models/centre.model';

@Component({
  selector: 'app-centre-dialog',
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
    MatCardModule
  ],
  template: `
    <h2 mat-dialog-title>
      <mat-icon>{{ isEditMode ? 'edit' : 'add' }}</mat-icon>
      {{ isEditMode ? 'Edit Centre' : 'Add New Centre' }}
    </h2>
    
    <form [formGroup]="centreForm" (ngSubmit)="onSubmit()">
      <mat-dialog-content>
        <div class="form-row">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Centre Code</mat-label>
            <input matInput formControlName="code" placeholder="Enter centre code">
            <mat-error *ngIf="centreForm.get('code')?.hasError('required')">
              Centre code is required
            </mat-error>
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Centre Name</mat-label>
            <input matInput formControlName="name" placeholder="Enter centre name">
            <mat-error *ngIf="centreForm.get('name')?.hasError('required')">
              Centre name is required
            </mat-error>
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Location</mat-label>
            <input matInput formControlName="location" placeholder="Enter location">
            <mat-error *ngIf="centreForm.get('location')?.hasError('required')">
              Location is required
            </mat-error>
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Type</mat-label>
            <mat-select formControlName="type">
              <mat-option value="examination">Examination</mat-option>
              <mat-option value="training">Training</mat-option>
              <mat-option value="both">Both</mat-option>
            </mat-select>
            <mat-error *ngIf="centreForm.get('type')?.hasError('required')">
              Type is required
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Capacity</mat-label>
            <input matInput type="number" formControlName="capacity" placeholder="Enter capacity">
            <mat-error *ngIf="centreForm.get('capacity')?.hasError('required')">
              Capacity is required
            </mat-error>
            <mat-error *ngIf="centreForm.get('capacity')?.hasError('min')">
              Capacity must be at least 1
            </mat-error>
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Description</mat-label>
            <textarea matInput formControlName="description" rows="3" placeholder="Enter centre description"></textarea>
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Contact Person</mat-label>
            <input matInput formControlName="contactPerson" placeholder="Enter contact person name">
          </mat-form-field>

          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Contact Email</mat-label>
            <input matInput type="email" formControlName="contactEmail" placeholder="Enter contact email">
            <mat-error *ngIf="centreForm.get('contactEmail')?.hasError('email')">
              Please enter a valid email
            </mat-error>
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Contact Phone</mat-label>
            <input matInput formControlName="contactPhone" placeholder="Enter contact phone">
          </mat-form-field>

          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Status</mat-label>
            <mat-select formControlName="status">
              <mat-option value="active">Active</mat-option>
              <mat-option value="inactive">Inactive</mat-option>
              <mat-option value="maintenance">Maintenance</mat-option>
            </mat-select>
          </mat-form-field>
        </div>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button mat-dialog-close type="button">Cancel</button>
        <button *ngIf="data.mode !== 'view'" 
                mat-raised-button 
                color="primary" 
                type="submit" 
                [disabled]="centreForm.invalid || isSubmitting">
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

    mat-dialog-content {
      min-width: 500px;
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
export class CentreDialogComponent implements OnInit {
  centreForm: FormGroup;
  isEditMode = false;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CentreDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { centre?: Centre; mode: 'add' | 'edit' | 'view' }
  ) {
    this.isEditMode = data.mode === 'edit';
    this.initializeForm();
  }

  ngOnInit(): void {
    if ((this.isEditMode || this.data.mode === 'view') && this.data.centre) {
      this.centreForm.patchValue(this.data.centre);
      if (this.data.mode === 'view') {
        this.centreForm.disable();
      }
    }
  }

  private initializeForm(): void {
    this.centreForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      location: ['', [Validators.required]],
      type: ['examination', [Validators.required]],
      capacity: [50, [Validators.required, Validators.min(1)]],
      description: [''],
      contactPerson: [''],
      contactEmail: ['', [Validators.email]],
      contactPhone: [''],
      status: ['active', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.centreForm.valid) {
      this.isSubmitting = true;
      const centreData = this.centreForm.value;
      
      // Simulate API call
      setTimeout(() => {
        this.isSubmitting = false;
        this.dialogRef.close({
          success: true,
          data: centreData,
          mode: this.isEditMode ? 'edit' : 'add'
        });
      }, 1000);
    }
  }
}
