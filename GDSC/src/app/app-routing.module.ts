import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  
  // Public Pages
  {
    path: 'home',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },
  
  // Authentication
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  
  // Admin Module (Protected)
  {
    path: 'admin',
    canActivate: [AuthGuard],
    canActivateChild: [RoleGuard],
    data: { roles: ['ADMIN'] },
    loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule)
  },
  
  // Examiner Module (Protected)
  {
    path: 'examiner',
    canActivate: [AuthGuard],
    canActivateChild: [RoleGuard],
    data: { roles: ['EXAMINER', 'ADMIN'] },
    loadChildren: () => import('./features/examiner/examiner.module').then(m => m.ExaminerModule)
  },
  
  // Candidate Module (Protected)
  {
    path: 'candidate',
    canActivate: [AuthGuard],
    canActivateChild: [RoleGuard],
    data: { roles: ['CANDIDATE', 'ADMIN'] },
    loadChildren: () => import('./features/candidate/candidate.module').then(m => m.CandidateModule)
  },
  
  // Centre Module (Protected)
  {
    path: 'centre',
    canActivate: [AuthGuard],
    canActivateChild: [RoleGuard],
    data: { roles: ['ADMIN', 'STAFF'] },
    loadChildren: () => import('./features/centre/centre.module').then(m => m.CentreModule)
  },
  
  // Certification Module (Protected)
  {
    path: 'certification',
    canActivate: [AuthGuard],
    canActivateChild: [RoleGuard],
    data: { roles: ['ADMIN', 'STAFF', 'CANDIDATE'] },
    loadChildren: () => import('./features/certification/certification.module').then(m => m.CertificationModule)
  },
  
  // Public Certification Verification
  {
    path: 'verify',
    loadChildren: () => import('./features/certification/certification.module').then(m => m.CertificationModule)
  },
  
  // Error Pages
  {
    path: 'unauthorized',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },
  
  // Catch all route
  {
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false,
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    scrollOffset: [0, 0]
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
