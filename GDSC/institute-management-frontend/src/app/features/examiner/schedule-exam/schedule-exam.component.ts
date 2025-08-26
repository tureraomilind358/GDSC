import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-schedule-exam',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="schedule-exam">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Schedule Exam</mat-card-title>
          <mat-card-subtitle>Create and schedule new examinations</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p>Exam scheduling functionality will be implemented here.</p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary">
            <mat-icon>schedule</mat-icon>
            Schedule Exam
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .schedule-exam { padding: 20px; }
    mat-card { margin-bottom: 20px; }
  `]
})
export class ScheduleExamComponent {}
