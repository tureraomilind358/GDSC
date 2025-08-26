import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-verify-certificate',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="verify-certificate">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Verify Certificate</mat-card-title>
          <mat-card-subtitle>Validate certificate authenticity</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p>Certificate verification functionality will be implemented here.</p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary">
            <mat-icon>verified</mat-icon>
            Verify Certificate
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .verify-certificate { padding: 20px; }
    mat-card { margin-bottom: 20px; }
  `]
})
export class VerifyCertificateComponent {}
