import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../models/user.model';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() isOpen = false;
  @Output() toggleSidebar = new EventEmitter<void>();
  
  currentUser: User | null = null;
  menuItems: any[] = [];

  constructor(private authService: AuthService) {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.updateMenuItems();
    });
  }

  private updateMenuItems(): void {
    if (!this.currentUser) {
      this.menuItems = [];
      return;
    }

    const hasRole = (role: string) => this.currentUser?.roles.includes(role) || false;

    if (hasRole('admin')) {
      this.menuItems = [
        { label: 'Dashboard', route: '/admin/dashboard', icon: 'dashboard' },
        { label: 'Manage Centres', route: '/admin/centres', icon: 'business' },
        { label: 'Manage Exams', route: '/admin/exams', icon: 'quiz' },
        { label: 'Manage Users', route: '/admin/users', icon: 'people' },
        { label: 'Reports', route: '/admin/reports', icon: 'assessment' }
      ];
    } else if (hasRole('examiner')) {
      this.menuItems = [
        { label: 'Dashboard', route: '/examiner/dashboard', icon: 'dashboard' },
        { label: 'Schedule Exam', route: '/examiner/schedule', icon: 'schedule' },
        { label: 'Invigilate Exam', route: '/examiner/invigilate', icon: 'supervisor_account' },
        { label: 'Evaluate Answers', route: '/examiner/evaluate', icon: 'grading' }
      ];
    } else if (hasRole('candidate')) {
      this.menuItems = [
        { label: 'Dashboard', route: '/candidate/dashboard', icon: 'dashboard' },
        { label: 'Profile', route: '/candidate/profile', icon: 'person' },
        { label: 'Exam List', route: '/candidate/exams', icon: 'list' },
        { label: 'Take Exam', route: '/candidate/take-exam', icon: 'edit' },
        { label: 'Results', route: '/candidate/results', icon: 'assessment' },
        { label: 'Certificates', route: '/candidate/certificates', icon: 'card_membership' }
      ];
    } else {
      this.menuItems = [
        { label: 'Home', route: '/', icon: 'home' },
        { label: 'About', route: '/about', icon: 'info' },
        { label: 'Contact', route: '/contact', icon: 'contact_support' }
      ];
    }
  }

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }
}
