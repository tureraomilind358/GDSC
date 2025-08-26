import { Routes } from '@angular/router';

export const CANDIDATE_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent)
  },
  {
    path: 'exams',
    loadComponent: () => import('./exam-list/exam-list.component').then(m => m.ExamListComponent)
  },
  {
    path: 'take-exam',
    loadComponent: () => import('./take-exam/take-exam.component').then(m => m.TakeExamComponent)
  },
  {
    path: 'results',
    loadComponent: () => import('./exam-result/exam-result.component').then(m => m.ExamResultComponent)
  },
  {
    path: 'certificates',
    loadComponent: () => import('./certificates/certificates.component').then(m => m.CertificatesComponent)
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];
