import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { AUTH_ROUTES } from './core/auth/auth.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: 'faq',
    loadComponent: () => import('./pages/faq/faq.component').then(m => m.FaqComponent)
  },
  {
    path: 'unauthorized',
    loadComponent: () => import('./shared/unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent),
    title: 'Access Denied'
  },
  // Authentication routes
  {
    path: 'auth',
    children: AUTH_ROUTES
  },
  // Admin routes
  {
    path: 'admin',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin', 'super_admin', 'ROLE_ADMIN', 'ROLE_SUPER_ADMIN'] },
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES)
  },
  // Candidate routes
  {
    path: 'candidate',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['candidate', 'student', 'ROLE_CANDIDATE', 'ROLE_STUDENT'] },
    loadChildren: () => import('./features/candidate/candidate.routes').then(m => m.CANDIDATE_ROUTES)
  },
  // Centre routes
  {
    path: 'centre',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['centre_admin', 'centre_manager', 'ROLE_CENTRE_ADMIN', 'ROLE_CENTRE_MANAGER'] },
    loadChildren: () => import('./features/centre/centre.routes').then(m => m.CENTRE_ROUTES)
  },
  // Certification routes
  {
    path: 'certification',
    loadChildren: () => import('./features/certification/certification.routes').then(m => m.CERTIFICATION_ROUTES)
  },
  // Examiner routes
  {
    path: 'examiner',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['examiner', 'instructor', 'ROLE_EXAMINER', 'ROLE_INSTRUCTOR'] },
    loadChildren: () => import('./features/examiner/examiner.routes').then(m => m.EXAMINER_ROUTES)
  },
  // Public certification verification
  {
    path: 'verify',
    loadComponent: () => import('./features/certification/verify-certificate/verify-certificate.component').then(m => m.VerifyCertificateComponent)
  },
  // Fallback route
  {
    path: '**',
    redirectTo: '/home'
  }
];
