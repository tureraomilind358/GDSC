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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Exam } from '../../../shared/models/exam.model';

@Component({
  selector: 'app-exam-dialog',
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
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule
  ],
  template: `
    <h2 mat-dialog-title>
      <mat-icon>{{ isEditMode ? 'edit' : 'add' }}</mat-icon>
      {{ isEditMode ? 'Edit Exam' : 'Create New Exam' }}
    </h2>
    
    <form [formGroup]="examForm" (ngSubmit)="onSubmit()">
      <mat-dialog-content>
        <div class="form-row">
          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Exam Code</mat-label>
            <input matInput formControlName="code" placeholder="Enter exam code">
            <mat-error *ngIf="examForm.get('code')?.hasError('required')">
              Exam code is required
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Course</mat-label>
            <mat-select formControlName="courseId">
              <mat-option *ngFor="let course of courses" [value]="course.id">
                {{ course.name }}
              </mat-option>
            </mat-select>
            <mat-error *ngIf="examForm.get('courseId')?.hasError('required')">
              Course is required
            </mat-error>
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Exam Title</mat-label>
            <input matInput formControlName="title" placeholder="Enter exam title">
            <mat-error *ngIf="examForm.get('title')?.hasError('required')">
              Exam title is required
            </mat-error>
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Duration (minutes)</mat-label>
            <input matInput type="number" formControlName="duration" placeholder="Enter duration">
            <mat-error *ngIf="examForm.get('duration')?.hasError('required')">
              Duration is required
            </mat-error>
            <mat-error *ngIf="examForm.get('duration')?.hasError('min')">
              Duration must be at least 15 minutes
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Total Questions</mat-label>
            <input matInput type="number" formControlName="totalQuestions" placeholder="Enter total questions">
            <mat-error *ngIf="examForm.get('totalQuestions')?.hasError('required')">
              Total questions is required
            </mat-error>
            <mat-error *ngIf="examForm.get('totalQuestions')?.hasError('min')">
              Total questions must be at least 1
            </mat-error>
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Passing Score (%)</mat-label>
            <input matInput type="number" formControlName="passingScore" placeholder="Enter passing score">
            <mat-error *ngIf="examForm.get('passingScore')?.hasError('required')">
              Passing score is required
            </mat-error>
            <mat-error *ngIf="examForm.get('passingScore')?.hasError('min')">
              Passing score must be at least 0
            </mat-error>
            <mat-error *ngIf="examForm.get('passingScore')?.hasError('max')">
              Passing score cannot exceed 100
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Max Attempts</mat-label>
            <input matInput type="number" formControlName="maxAttempts" placeholder="Enter max attempts">
            <mat-error *ngIf="examForm.get('maxAttempts')?.hasError('required')">
              Max attempts is required
            </mat-error>
            <mat-error *ngIf="examForm.get('maxAttempts')?.hasError('min')">
              Max attempts must be at least 1
            </mat-error>
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Description</mat-label>
            <textarea matInput formControlName="description" rows="3" placeholder="Enter exam description"></textarea>
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Instructions</mat-label>
            <textarea matInput formControlName="instructions" rows="3" placeholder="Enter exam instructions"></textarea>
          </mat-form-field>

          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Notes</mat-label>
            <textarea matInput formControlName="notes" rows="3" placeholder="Enter additional notes"></textarea>
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Scheduled Date</mat-label>
            <input matInput [matDatepicker]="scheduledPicker" formControlName="scheduledDate">
            <mat-datepicker-toggle matSuffix [for]="scheduledPicker"></mat-datepicker-toggle>
            <mat-datepicker #scheduledPicker></mat-datepicker>
          </mat-form-field>

          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Status</mat-label>
            <mat-select formControlName="status">
              <mat-option value="draft">Draft</mat-option>
              <mat-option value="scheduled">Scheduled</mat-option>
              <mat-option value="active">Active</mat-option>
              <mat-option value="completed">Completed</mat-option>
              <mat-option value="cancelled">Cancelled</mat-option>
            </mat-select>
          </mat-form-field>
        </div>

        <div class="form-row options">
          <mat-checkbox formControlName="isRandomized">Randomize Questions</mat-checkbox>
          <mat-checkbox formControlName="showResults">Show Results Immediately</mat-checkbox>
          <mat-checkbox formControlName="allowReview">Allow Review After Submission</mat-checkbox>
        </div>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button mat-dialog-close type="button">Cancel</button>
        <button *ngIf="data.mode !== 'view'" 
                mat-raised-button 
                color="primary" 
                type="submit" 
                [disabled]="examForm.invalid || isSubmitting">
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
export class ExamDialogComponent implements OnInit {
  examForm: FormGroup;
  isEditMode = false;
  isSubmitting = false;
  courses: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ExamDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { exam?: Exam; mode: 'add' | 'edit' | 'view' }
  ) {
    this.isEditMode = data.mode === 'edit';
    this.initializeForm();
    this.loadCourses();
  }

  ngOnInit(): void {
    if ((this.isEditMode || this.data.mode === 'view') && this.data.exam) {
      this.examForm.patchValue(this.data.exam);
      if (this.data.mode === 'view') {
        this.examForm.disable();
      }
    }
  }

  private initializeForm(): void {
    this.examForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(3)]],
      title: ['', [Validators.required, Validators.minLength(5)]],
      courseId: ['', [Validators.required]],
      description: [''],
      instructions: [''],
      notes: [''],
      duration: [60, [Validators.required, Validators.min(15)]],
      totalQuestions: [50, [Validators.required, Validators.min(1)]],
      passingScore: [70, [Validators.required, Validators.min(0), Validators.max(100)]],
      maxAttempts: [3, [Validators.required, Validators.min(1)]],
      scheduledDate: [null],
      status: ['draft', [Validators.required]],
      isRandomized: [false],
      showResults: [true],
      allowReview: [true]
    });
  }

  private loadCourses(): void {
    // TODO: Load courses from course service
    this.courses = [
      { id: '1', name: 'Mathematics' },
      { id: '2', name: 'Physics' },
      { id: '3', name: 'Chemistry' },
      { id: '4', name: 'Biology' },
      { id: '5', name: 'Computer Science' }
    ];
  }

  onSubmit(): void {
    if (this.examForm.valid) {
      this.isSubmitting = true;
      const examData = this.examForm.value;
      
      // Simulate API call
      setTimeout(() => {
        this.isSubmitting = false;
        this.dialogRef.close({
          success: true,
          data: examData,
          mode: this.isEditMode ? 'edit' : 'add'
        });
      }, 1000);
    }
  }
}
