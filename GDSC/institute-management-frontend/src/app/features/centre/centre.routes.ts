import { Routes } from '@angular/router';

export const CENTRE_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./centre-dashboard/centre-dashboard.component').then(m => m.CentreDashboardComponent)
  },
  {
    path: 'list',
    loadComponent: () => import('./centre-list/centre-list.component').then(m => m.CentreListComponent)
  },
  {
    path: 'detail/:id',
    loadComponent: () => import('./centre-detail/centre-detail.component').then(m => m.CentreDetailComponent)
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];
