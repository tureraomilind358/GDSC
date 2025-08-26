import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-exam-result',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="exam-result">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Exam Results</mat-card-title>
          <mat-card-subtitle>View your examination scores</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p>Exam results functionality will be implemented here.</p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary">
            <mat-icon>assessment</mat-icon>
            View Results
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .exam-result { padding: 20px; }
    mat-card { margin-bottom: 20px; }
  `]
})
export class ExamResultComponent {}
