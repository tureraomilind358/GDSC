import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

export interface RoleGuardData {
  roles: string[];
  redirectTo?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate, CanActivateChild {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: any): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkRole(route.data);
  }

  canActivateChild(childRoute: any): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkRole(childRoute.data);
  }

  private checkRole(data: RoleGuardData): boolean {
    if (!data || !data.roles || data.roles.length === 0) {
      return true; // No role requirement specified
    }

    const userRoles = this.authService.getCurrentUserRoles();
    if (!userRoles || userRoles.length === 0) {
      return this.redirectToLogin();
    }

    // Check if user has any of the required roles
    const hasRequiredRole = data.roles.some(role => 
      userRoles.includes(role.toUpperCase())
    );

    if (!hasRequiredRole) {
      // User doesn't have required role, redirect to unauthorized page or dashboard
      const redirectTo = data.redirectTo || '/unauthorized';
      this.router.navigate([redirectTo]);
      return false;
    }

    return true;
  }

  private redirectToLogin(): boolean {
    this.router.navigate(['/auth/login']);
    return false;
  }
}
