import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="certificates">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Certificates</mat-card-title>
          <mat-card-subtitle>View and download your certificates</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p>Certificate management functionality will be implemented here.</p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary">
            <mat-icon>card_membership</mat-icon>
            View Certificates
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .certificates { padding: 20px; }
    mat-card { margin-bottom: 20px; }
  `]
})
export class CertificatesComponent {}
