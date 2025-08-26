import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './core/auth/auth.service';
import { LoadingService } from './core/services/loading.service';
import { NotificationService } from './core/services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Institute Management System';
  loading$ = this.loadingService.loading$;
  notifications$ = this.notificationService.notifications$;
  currentRoute = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private loadingService: LoadingService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    // Track route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.url;
      
      // Scroll to top on route change
      window.scrollTo(0, 0);
    });

    // Initialize app
    this.initializeApp();
  }

  private initializeApp(): void {
    // Check authentication status
    if (this.authService.isAuthenticated()) {
      // Validate token and refresh if needed
      this.authService.validateToken();
    }

    // Show welcome message
    this.notificationService.info('Welcome', 'Welcome to Institute Management System');
  }

  onNotificationClose(notificationId: string): void {
    this.notificationService.removeNotification(notificationId);
  }
}
