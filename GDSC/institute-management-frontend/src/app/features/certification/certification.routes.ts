import { Routes } from '@angular/router';

export const CERTIFICATION_ROUTES: Routes = [
  {
    path: 'generate',
    loadComponent: () => import('./generate-certificate/generate-certificate.component').then(m => m.GenerateCertificateComponent)
  },
  {
    path: 'verify',
    loadComponent: () => import('./verify-certificate/verify-certificate.component').then(m => m.VerifyCertificateComponent)
  },
  {
    path: 'list',
    loadComponent: () => import('./certification-list/certification-list.component').then(m => m.CertificationListComponent)
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  }
];
