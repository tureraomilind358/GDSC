import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './dashboard/dashboard.component';
import { ReportsComponent } from './reports/reports.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: AdminDashboardComponent,
    title: 'Admin Dashboard'
  },
  {
    path: 'reports',
    component: ReportsComponent,
    title: 'Reports'
  },
  {
    path: 'manage-users',
    loadComponent: () => import('./manage-users/manage-users.component').then(m => m.ManageUsersComponent),
    title: 'Manage Users'
  },
  {
    path: 'manage-centres',
    loadComponent: () => import('./manage-centres/manage-centres.component').then(m => m.ManageCentresComponent),
    title: 'Manage Centres'
  },
  {
    path: 'manage-exams',
    loadComponent: () => import('./manage-exams/manage-exams.component').then(m => m.ManageExamsComponent),
    title: 'Manage Exams'
  }
];
