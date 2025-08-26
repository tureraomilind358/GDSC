import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-take-exam',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="take-exam">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Take Exam</mat-card-title>
          <mat-card-subtitle>Complete your examination</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p>Exam taking functionality will be implemented here.</p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary">
            <mat-icon>edit</mat-icon>
            Start Exam
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .take-exam { padding: 20px; }
    mat-card { margin-bottom: 20px; }
  `]
})
export class TakeExamComponent {}
