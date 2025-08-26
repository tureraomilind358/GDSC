import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-exam-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="exam-list">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Exam List</mat-card-title>
          <mat-card-subtitle>Available examinations</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p>Exam list functionality will be implemented here.</p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary">
            <mat-icon>list</mat-icon>
            View Exams
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .exam-list { padding: 20px; }
    mat-card { margin-bottom: 20px; }
  `]
})
export class ExamListComponent {}
