import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { User } from '../models/user.model';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  
  isAuthenticated = false;
  currentUser: User | null = null;
  notificationCount = 3;
  notifications = [
    { id: 1, message: 'New exam scheduled', timestamp: new Date(), type: 'info' },
    { id: 2, message: 'Certificate ready for download', timestamp: new Date(), type: 'success' },
    { id: 3, message: 'System maintenance scheduled', timestamp: new Date(), type: 'warning' }
  ];

  constructor(private authService: AuthService) {
    this.authService.isAuthenticated$.subscribe(
      isAuth => this.isAuthenticated = isAuth
    );
    this.authService.currentUser$.subscribe(
      user => this.currentUser = user
    );
  }

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  logout(): void {
    this.authService.logout();
  }
}
