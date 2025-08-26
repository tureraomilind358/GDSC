import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="profile">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Profile</mat-card-title>
          <mat-card-subtitle>Manage your personal information</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p>Profile management functionality will be implemented here.</p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary">
            <mat-icon>edit</mat-icon>
            Edit Profile
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .profile { padding: 20px; }
    mat-card { margin-bottom: 20px; }
  `]
})
export class ProfileComponent {}
