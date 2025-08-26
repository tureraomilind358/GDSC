import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-invigilate-exam',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="invigilate-exam">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Invigilate Exam</mat-card-title>
          <mat-card-subtitle>Monitor and supervise examinations</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p>Exam invigilation functionality will be implemented here.</p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary">
            <mat-icon>supervisor_account</mat-icon>
            Start Invigilation
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .invigilate-exam { padding: 20px; }
    mat-card { margin-bottom: 20px; }
  `]
})
export class InvigilateExamComponent {}
