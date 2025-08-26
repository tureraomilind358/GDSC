import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-evaluate-answers',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="evaluate-answers">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Evaluate Answers</mat-card-title>
          <mat-card-subtitle>Grade and assess student responses</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p>Answer evaluation functionality will be implemented here.</p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary">
            <mat-icon>grading</mat-icon>
            Start Evaluation
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .evaluate-answers { padding: 20px; }
    mat-card { margin-bottom: 20px; }
  `]
})
export class EvaluateAnswersComponent {}
