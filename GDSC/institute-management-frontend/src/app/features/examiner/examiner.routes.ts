import { Routes } from '@angular/router';

export const EXAMINER_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'schedule',
    loadComponent: () => import('./schedule-exam/schedule-exam.component').then(m => m.ScheduleExamComponent)
  },
  {
    path: 'invigilate',
    loadComponent: () => import('./invigilate-exam/invigilate-exam.component').then(m => m.InvigilateExamComponent)
  },
  {
    path: 'evaluate',
    loadComponent: () => import('./evaluate-answers/evaluate-answers.component').then(m => m.EvaluateAnswersComponent)
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];
