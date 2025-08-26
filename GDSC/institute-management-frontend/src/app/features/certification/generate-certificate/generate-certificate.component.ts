import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-generate-certificate',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="generate-certificate">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Generate Certificate</mat-card-title>
          <mat-card-subtitle>Create new certificates</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p>Certificate generation functionality will be implemented here.</p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary">
            <mat-icon>add</mat-icon>
            Generate Certificate
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .generate-certificate { padding: 20px; }
    mat-card { margin-bottom: 20px; }
  `]
})
export class GenerateCertificateComponent {}
