import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../core/services/api.service';

export interface Certificate {
  id: string;
  certificateNumber: string;
  studentId: string;
  courseId: string;
  issueDate: Date;
  expiryDate?: Date;
  status: 'active' | 'expired' | 'revoked';
  verificationCode: string;
  downloadUrl?: string;
  student?: any;
  course?: any;
}

export interface CertificateTemplate {
  id: string;
  name: string;
  description: string;
  templateUrl: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CertificateVerification {
  certificateNumber: string;
  verificationCode: string;
  isValid: boolean;
  certificate?: Certificate;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class CertificationService {
  private readonly baseEndpoint = '/certifications';

  constructor(private apiService: ApiService) {}

  // Certificate CRUD operations
  getCertificates(filter?: any): Observable<{ certificates: Certificate[]; total: number; page: number; limit: number }> {
    return this.apiService.get<{ certificates: Certificate[]; total: number; page: number; limit: number }>(
      this.baseEndpoint,
      filter
    );
  }

  getCertificateById(id: string): Observable<Certificate> {
    return this.apiService.get<Certificate>(`${this.baseEndpoint}/${id}`);
  }

  getCertificateByNumber(certificateNumber: string): Observable<Certificate> {
    return this.apiService.get<Certificate>(`${this.baseEndpoint}/number/${certificateNumber}`);
  }

  createCertificate(certificate: Partial<Certificate>): Observable<Certificate> {
    return this.apiService.post<Certificate>(this.baseEndpoint, certificate);
  }

  updateCertificate(id: string, certificate: Partial<Certificate>): Observable<Certificate> {
    return this.apiService.put<Certificate>(`${this.baseEndpoint}/${id}`, certificate);
  }

  deleteCertificate(id: string): Observable<void> {
    return this.apiService.delete<void>(`${this.baseEndpoint}/${id}`);
  }

  // Certificate generation
  generateCertificate(studentId: string, courseId: string, templateId?: string): Observable<Certificate> {
    const data = { studentId, courseId };
    if (templateId) data['templateId'] = templateId;
    return this.apiService.post<Certificate>(`${this.baseEndpoint}/generate`, data);
  }

  bulkGenerateCertificates(requests: any[]): Observable<Certificate[]> {
    return this.apiService.post<Certificate[]>(`${this.baseEndpoint}/bulk-generate`, { requests });
  }

  // Certificate verification
  verifyCertificate(certificateNumber: string, verificationCode: string): Observable<CertificateVerification> {
    return this.apiService.post<CertificateVerification>(`${this.baseEndpoint}/verify`, {
      certificateNumber,
      verificationCode
    });
  }

  verifyCertificatePublic(certificateNumber: string, verificationCode: string): Observable<CertificateVerification> {
    return this.apiService.post<CertificateVerification>(`${this.baseEndpoint}/verify/public`, {
      certificateNumber,
      verificationCode
    });
  }

  // Certificate templates
  getTemplates(): Observable<CertificateTemplate[]> {
    return this.apiService.get<CertificateTemplate[]>(`${this.baseEndpoint}/templates`);
  }

  getTemplateById(id: string): Observable<CertificateTemplate> {
    return this.apiService.get<CertificateTemplate>(`${this.baseEndpoint}/templates/${id}`);
  }

  createTemplate(template: Partial<CertificateTemplate>): Observable<CertificateTemplate> {
    return this.apiService.post<CertificateTemplate>(`${this.baseEndpoint}/templates`, template);
  }

  updateTemplate(id: string, template: Partial<CertificateTemplate>): Observable<CertificateTemplate> {
    return this.apiService.put<CertificateTemplate>(`${this.baseEndpoint}/templates/${id}`, template);
  }

  deleteTemplate(id: string): Observable<void> {
    return this.apiService.delete<void>(`${this.baseEndpoint}/templates/${id}`);
  }

  uploadTemplate(formData: FormData): Observable<CertificateTemplate> {
    return this.apiService.upload<CertificateTemplate>(`${this.baseEndpoint}/templates/upload`, formData);
  }

  // Certificate download
  downloadCertificate(id: string): Observable<Blob> {
    return this.apiService.download(`${this.baseEndpoint}/${id}/download`);
  }

  downloadCertificateByNumber(certificateNumber: string): Observable<Blob> {
    return this.apiService.download(`${this.baseEndpoint}/number/${certificateNumber}/download`);
  }

  // Certificate status management
  activateCertificate(id: string): Observable<Certificate> {
    return this.apiService.patch<Certificate>(`${this.baseEndpoint}/${id}/activate`, {});
  }

  revokeCertificate(id: string, reason: string): Observable<Certificate> {
    return this.apiService.patch<Certificate>(`${this.baseEndpoint}/${id}/revoke`, { reason });
  }

  renewCertificate(id: string, newExpiryDate: Date): Observable<Certificate> {
    return this.apiService.patch<Certificate>(`${this.baseEndpoint}/${id}/renew`, { newExpiryDate });
  }

  // Certificate search and filtering
  searchCertificates(query: string): Observable<Certificate[]> {
    return this.apiService.get<Certificate[]>(`${this.baseEndpoint}/search`, { q: query });
  }

  getCertificatesByStudent(studentId: string): Observable<Certificate[]> {
    return this.apiService.get<Certificate[]>(`${this.baseEndpoint}/student/${studentId}`);
  }

  getCertificatesByCourse(courseId: string): Observable<Certificate[]> {
    return this.apiService.get<Certificate[]>(`${this.baseEndpoint}/course/${courseId}`);
  }

  getActiveCertificates(): Observable<Certificate[]> {
    return this.apiService.get<Certificate[]>(`${this.baseEndpoint}/active`);
  }

  getExpiredCertificates(): Observable<Certificate[]> {
    return this.apiService.get<Certificate[]>(`${this.baseEndpoint}/expired`);
  }

  getRevokedCertificates(): Observable<Certificate[]> {
    return this.apiService.get<Certificate[]>(`${this.baseEndpoint}/revoked`);
  }

  // Certificate statistics
  getCertificateStats(): Observable<any> {
    return this.apiService.get<any>(`${this.baseEndpoint}/stats`);
  }

  getCertificateStatsByPeriod(startDate: Date, endDate: Date): Observable<any> {
    return this.apiService.get<any>(`${this.baseEndpoint}/stats/period`, {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    });
  }

  // Certificate analytics
  getAnalytics(period?: string): Observable<any> {
    const params = period ? { period } : {};
    return this.apiService.get<any>(`${this.baseEndpoint}/analytics`, params);
  }

  getVerificationAnalytics(): Observable<any> {
    return this.apiService.get<any>(`${this.baseEndpoint}/analytics/verifications`);
  }

  // Certificate export
  exportCertificates(filter?: any): Observable<Blob> {
    return this.apiService.download(`${this.baseEndpoint}/export`, filter);
  }

  exportCertificateReport(reportType: string, filter?: any): Observable<Blob> {
    const params = { reportType, ...filter };
    return this.apiService.download(`${this.baseEndpoint}/export-report`, params);
  }

  // Certificate notifications
  sendCertificateNotification(certificateId: string, notificationType: string): Observable<any> {
    return this.apiService.post<any>(`${this.baseEndpoint}/${certificateId}/notifications`, {
      type: notificationType
    });
  }

  // Certificate settings
  updateCertificateSettings(settings: any): Observable<any> {
    return this.apiService.put<any>(`${this.baseEndpoint}/settings`, settings);
  }

  getCertificateSettings(): Observable<any> {
    return this.apiService.get<any>(`${this.baseEndpoint}/settings`);
  }

  // Certificate validation rules
  updateValidationRules(rules: any): Observable<any> {
    return this.apiService.put<any>(`${this.baseEndpoint}/validation-rules`, rules);
  }

  getValidationRules(): Observable<any> {
    return this.apiService.get<any>(`${this.baseEndpoint}/validation-rules`);
  }
}
