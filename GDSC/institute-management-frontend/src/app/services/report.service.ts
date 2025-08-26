import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../core/services/api.service';

export interface ReportFilter {
  startDate?: Date;
  endDate?: Date;
  centreId?: string;
  courseId?: string;
  instructorId?: string;
  studentId?: string;
  reportType?: string;
  format?: 'pdf' | 'excel' | 'csv';
}

export interface ReportConfig {
  id: string;
  name: string;
  description: string;
  type: string;
  parameters: ReportParameter[];
  isActive: boolean;
  schedule?: ReportSchedule;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReportParameter {
  name: string;
  type: 'string' | 'number' | 'date' | 'boolean' | 'select';
  required: boolean;
  defaultValue?: any;
  options?: any[];
  label: string;
}

export interface ReportSchedule {
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  time: string; // HH:mm format
  dayOfWeek?: number; // 0-6 for weekly
  dayOfMonth?: number; // 1-31 for monthly
  recipients: string[];
  isActive: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private readonly baseEndpoint = '/reports';

  constructor(private apiService: ApiService) {}

  // Report generation
  generateReport(reportType: string, filter?: ReportFilter): Observable<Blob> {
    return this.apiService.download(`${this.baseEndpoint}/generate/${reportType}`, filter);
  }

  generateCustomReport(reportConfig: any, parameters: any): Observable<Blob> {
    return this.apiService.post<Blob>(`${this.baseEndpoint}/generate/custom`, {
      config: reportConfig,
      parameters
    });
  }

  // Report configurations
  getReportConfigs(): Observable<ReportConfig[]> {
    return this.apiService.get<ReportConfig[]>(`${this.baseEndpoint}/configs`);
  }

  getReportConfigById(id: string): Observable<ReportConfig> {
    return this.apiService.get<ReportConfig>(`${this.baseEndpoint}/configs/${id}`);
  }

  createReportConfig(config: Partial<ReportConfig>): Observable<ReportConfig> {
    return this.apiService.post<ReportConfig>(`${this.baseEndpoint}/configs`, config);
  }

  updateReportConfig(id: string, config: Partial<ReportConfig>): Observable<ReportConfig> {
    return this.apiService.put<ReportConfig>(`${this.baseEndpoint}/configs/${id}`, config);
  }

  deleteReportConfig(id: string): Observable<void> {
    return this.apiService.delete<void>(`${this.baseEndpoint}/configs/${id}`);
  }

  // Student reports
  generateStudentReport(studentId: string, reportType: string, filter?: ReportFilter): Observable<Blob> {
    return this.apiService.download(`${this.baseEndpoint}/students/${studentId}/${reportType}`, filter);
  }

  generateStudentProgressReport(studentId: string, courseId?: string): Observable<Blob> {
    const params = courseId ? { courseId } : {};
    return this.apiService.download(`${this.baseEndpoint}/students/${studentId}/progress`, params);
  }

  generateStudentAttendanceReport(studentId: string, filter?: ReportFilter): Observable<Blob> {
    return this.apiService.download(`${this.baseEndpoint}/students/${studentId}/attendance`, filter);
  }

  generateStudentPerformanceReport(studentId: string, filter?: ReportFilter): Observable<Blob> {
    return this.apiService.download(`${this.baseEndpoint}/students/${studentId}/performance`, filter);
  }

  // Course reports
  generateCourseReport(courseId: string, reportType: string, filter?: ReportFilter): Observable<Blob> {
    return this.apiService.download(`${this.baseEndpoint}/courses/${courseId}/${reportType}`, filter);
  }

  generateCourseEnrollmentReport(courseId: string, filter?: ReportFilter): Observable<Blob> {
    return this.apiService.download(`${this.baseEndpoint}/courses/${courseId}/enrollment`, filter);
  }

  generateCoursePerformanceReport(courseId: string, filter?: ReportFilter): Observable<Blob> {
    return this.apiService.download(`${this.baseEndpoint}/courses/${courseId}/performance`, filter);
  }

  generateCourseCompletionReport(courseId: string, filter?: ReportFilter): Observable<Blob> {
    return this.apiService.download(`${this.baseEndpoint}/courses/${courseId}/completion`, filter);
  }

  // Exam reports
  generateExamReport(examId: string, reportType: string, filter?: ReportFilter): Observable<Blob> {
    return this.apiService.download(`${this.baseEndpoint}/exams/${examId}/${reportType}`, filter);
  }

  generateExamResultsReport(examId: string, filter?: ReportFilter): Observable<Blob> {
    return this.apiService.download(`${this.baseEndpoint}/exams/${examId}/results`, filter);
  }

  generateExamAnalyticsReport(examId: string, filter?: ReportFilter): Observable<Blob> {
    return this.apiService.download(`${this.baseEndpoint}/exams/${examId}/analytics`, filter);
  }

  // Centre reports
  generateCentreReport(centreId: string, reportType: string, filter?: ReportFilter): Observable<Blob> {
    return this.apiService.download(`${this.baseEndpoint}/centres/${centreId}/${reportType}`, filter);
  }

  generateCentreEnrollmentReport(centreId: string, filter?: ReportFilter): Observable<Blob> {
    return this.apiService.download(`${this.baseEndpoint}/centres/${centreId}/enrollment`, filter);
  }

  generateCentreRevenueReport(centreId: string, filter?: ReportFilter): Observable<Blob> {
    return this.apiService.download(`${this.baseEndpoint}/centres/${centreId}/revenue`, filter);
  }

  generateCentrePerformanceReport(centreId: string, filter?: ReportFilter): Observable<Blob> {
    return this.apiService.download(`${this.baseEndpoint}/centres/${centreId}/performance`, filter);
  }

  // Financial reports
  generateFinancialReport(reportType: string, filter?: ReportFilter): Observable<Blob> {
    return this.apiService.download(`${this.baseEndpoint}/financial/${reportType}`, filter);
  }

  generateRevenueReport(filter?: ReportFilter): Observable<Blob> {
    return this.apiService.download(`${this.baseEndpoint}/financial/revenue`, filter);
  }

  generateExpenseReport(filter?: ReportFilter): Observable<Blob> {
    return this.apiService.download(`${this.baseEndpoint}/financial/expenses`, filter);
  }

  generateProfitLossReport(filter?: ReportFilter): Observable<Blob> {
    return this.apiService.download(`${this.baseEndpoint}/financial/profit-loss`, filter);
  }

  // Analytics reports
  generateAnalyticsReport(reportType: string, filter?: ReportFilter): Observable<Blob> {
    return this.apiService.download(`${this.baseEndpoint}/analytics/${reportType}`, filter);
  }

  generateEnrollmentAnalytics(filter?: ReportFilter): Observable<Blob> {
    return this.apiService.download(`${this.baseEndpoint}/analytics/enrollment`, filter);
  }

  generatePerformanceAnalytics(filter?: ReportFilter): Observable<Blob> {
    return this.apiService.download(`${this.baseEndpoint}/analytics/performance`, filter);
  }

  generateTrendAnalysis(filter?: ReportFilter): Observable<Blob> {
    return this.apiService.download(`${this.baseEndpoint}/analytics/trends`, filter);
  }

  // Certificate reports
  generateCertificateReport(reportType: string, filter?: ReportFilter): Observable<Blob> {
    return this.apiService.download(`${this.baseEndpoint}/certificates/${reportType}`, filter);
  }

  generateCertificateIssuanceReport(filter?: ReportFilter): Observable<Blob> {
    return this.apiService.download(`${this.baseEndpoint}/certificates/issuance`, filter);
  }

  generateCertificateVerificationReport(filter?: ReportFilter): Observable<Blob> {
    return this.apiService.download(`${this.baseEndpoint}/certificates/verification`, filter);
  }

  // User reports
  generateUserReport(reportType: string, filter?: ReportFilter): Observable<Blob> {
    return this.apiService.download(`${this.baseEndpoint}/users/${reportType}`, filter);
  }

  generateUserActivityReport(filter?: ReportFilter): Observable<Blob> {
    return this.apiService.download(`${this.baseEndpoint}/users/activity`, filter);
  }

  generateUserRoleReport(filter?: ReportFilter): Observable<Blob> {
    return this.apiService.download(`${this.baseEndpoint}/users/roles`, filter);
  }

  // Dashboard reports
  generateDashboardReport(dashboardType: string, filter?: ReportFilter): Observable<Blob> {
    return this.apiService.download(`${this.baseEndpoint}/dashboard/${dashboardType}`, filter);
  }

  generateExecutiveSummary(filter?: ReportFilter): Observable<Blob> {
    return this.apiService.download(`${this.baseEndpoint}/dashboard/executive-summary`, filter);
  }

  generateKPIReport(filter?: ReportFilter): Observable<Blob> {
    return this.apiService.download(`${this.baseEndpoint}/dashboard/kpi`, filter);
  }

  // Scheduled reports
  getScheduledReports(): Observable<any[]> {
    return this.apiService.get<any[]>(`${this.baseEndpoint}/scheduled`);
  }

  createScheduledReport(schedule: ReportSchedule, reportConfig: any): Observable<any> {
    return this.apiService.post<any>(`${this.baseEndpoint}/scheduled`, {
      schedule,
      reportConfig
    });
  }

  updateScheduledReport(id: string, schedule: Partial<ReportSchedule>): Observable<any> {
    return this.apiService.put<any>(`${this.baseEndpoint}/scheduled/${id}`, schedule);
  }

  deleteScheduledReport(id: string): Observable<void> {
    return this.apiService.delete<void>(`${this.baseEndpoint}/scheduled/${id}`);
  }

  // Report history
  getReportHistory(filter?: any): Observable<any[]> {
    return this.apiService.get<any[]>(`${this.baseEndpoint}/history`, filter);
  }

  downloadReportFromHistory(reportId: string): Observable<Blob> {
    return this.apiService.download(`${this.baseEndpoint}/history/${reportId}/download`);
  }

  // Report templates
  getReportTemplates(): Observable<any[]> {
    return this.apiService.get<any[]>(`${this.baseEndpoint}/templates`);
  }

  createReportTemplate(template: any): Observable<any> {
    return this.apiService.post<any>(`${this.baseEndpoint}/templates`, template);
  }

  updateReportTemplate(id: string, template: any): Observable<any> {
    return this.apiService.put<any>(`${this.baseEndpoint}/templates/${id}`, template);
  }

  deleteReportTemplate(id: string): Observable<void> {
    return this.apiService.delete<void>(`${this.baseEndpoint}/templates/${id}`);
  }

  // Report settings
  getReportSettings(): Observable<any> {
    return this.apiService.get<any>(`${this.baseEndpoint}/settings`);
  }

  updateReportSettings(settings: any): Observable<any> {
    return this.apiService.put<any>(`${this.baseEndpoint}/settings`, settings);
  }

  // Report export formats
  getExportFormats(): Observable<string[]> {
    return this.apiService.get<string[]>(`${this.baseEndpoint}/export-formats`);
  }

  // Report validation
  validateReportParameters(reportType: string, parameters: any): Observable<any> {
    return this.apiService.post<any>(`${this.baseEndpoint}/validate`, {
      reportType,
      parameters
    });
  }
}
