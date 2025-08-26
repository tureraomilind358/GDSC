import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate, CanActivateChild {
  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  canActivate(route: any): Observable<boolean | UrlTree> {
    return this.checkRole(route);
  }

  canActivateChild(childRoute: any): Observable<boolean | UrlTree> {
    return this.checkRole(childRoute);
  }

  private checkRole(route: any): Observable<boolean | UrlTree> {
    return this.authService.isAuthenticated$.pipe(
      take(1),
      map(isAuthenticated => {
        if (!isAuthenticated) {
          this.notificationService.showError('Please login to access this page');
          return this.router.createUrlTree(['/auth/login']);
        }

        const requiredRoles = route.data?.roles as string[];
        if (!requiredRoles || requiredRoles.length === 0) {
          return true; // No roles required
        }

        const user = this.authService.getCurrentUser();
        if (!user) {
          this.notificationService.showError('User information not found');
          return this.router.createUrlTree(['/auth/login']);
        }

        console.log('Role Guard Debug:', {
          requiredRoles,
          userRoles: user.roles,
          user: user
        });

        // Admin and Super admin bypass
        if (this.authService.isAdminOrSuper()) {
          return true;
        }

        const hasRequiredRole = requiredRoles.some(role => user.roles.includes(role));

        if (!hasRequiredRole) {
          console.warn('Access denied - User roles:', user.roles, 'Required roles:', requiredRoles);
          this.notificationService.showError('You do not have permission to access this page');
          return this.router.createUrlTree(['/unauthorized']);
        }

        return true;
      })
    );
  }
}
