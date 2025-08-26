import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../core/services/api.service';
import { 
  Student, 
  StudentFilter, 
  StudentStats,
  Enrollment,
  Payment,
  Certificate,
  Assignment,
  StudentExamResult
} from '../shared/models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private readonly baseEndpoint = '/students';

  constructor(private apiService: ApiService) {}

  // Student CRUD operations
  getStudents(filter?: StudentFilter): Observable<{ students: Student[]; total: number; page: number; limit: number }> {
    return this.apiService.get<{ students: Student[]; total: number; page: number; limit: number }>(
      this.baseEndpoint,
      filter
    );
  }

  getStudentById(id: string): Observable<Student> {
    return this.apiService.get<Student>(`${this.baseEndpoint}/${id}`);
  }

  getStudentByUserId(userId: string): Observable<Student> {
    return this.apiService.get<Student>(`${this.baseEndpoint}/user/${userId}`);
  }

  createStudent(student: Partial<Student>): Observable<Student> {
    return this.apiService.post<Student>(this.baseEndpoint, student);
  }

  updateStudent(id: string, student: Partial<Student>): Observable<Student> {
    return this.apiService.put<Student>(`${this.baseEndpoint}/${id}`, student);
  }

  deleteStudent(id: string): Observable<void> {
    return this.apiService.delete<void>(`${this.baseEndpoint}/${id}`);
  }

  // Student enrollment
  getEnrollments(studentId: string): Observable<Enrollment[]> {
    return this.apiService.get<Enrollment[]>(`${this.baseEndpoint}/${studentId}/enrollments`);
  }

  getEnrollmentById(studentId: string, enrollmentId: string): Observable<Enrollment> {
    return this.apiService.get<Enrollment>(`${this.baseEndpoint}/${studentId}/enrollments/${enrollmentId}`);
  }

  updateEnrollment(studentId: string, enrollmentId: string, enrollment: Partial<Enrollment>): Observable<Enrollment> {
    return this.apiService.put<Enrollment>(`${this.baseEndpoint}/${studentId}/enrollments/${enrollmentId}`, enrollment);
  }

  // Student payments
  getPayments(studentId: string): Observable<Payment[]> {
    return this.apiService.get<Payment[]>(`${this.baseEndpoint}/${studentId}/payments`);
  }

  createPayment(studentId: string, payment: Partial<Payment>): Observable<Payment> {
    return this.apiService.post<Payment>(`${this.baseEndpoint}/${studentId}/payments`, payment);
  }

  updatePayment(studentId: string, paymentId: string, payment: Partial<Payment>): Observable<Payment> {
    return this.apiService.put<Payment>(`${this.baseEndpoint}/${studentId}/payments/${paymentId}`, payment);
  }

  deletePayment(studentId: string, paymentId: string): Observable<void> {
    return this.apiService.delete<void>(`${this.baseEndpoint}/${studentId}/payments/${paymentId}`);
  }

  // Student certificates
  getCertificates(studentId: string): Observable<Certificate[]> {
    return this.apiService.get<Certificate[]>(`${this.baseEndpoint}/${studentId}/certificates`);
  }

  getCertificateById(studentId: string, certificateId: string): Observable<Certificate> {
    return this.apiService.get<Certificate>(`${this.baseEndpoint}/${studentId}/certificates/${certificateId}`);
  }

  downloadCertificate(studentId: string, certificateId: string): Observable<Blob> {
    return this.apiService.download(`${this.baseEndpoint}/${studentId}/certificates/${certificateId}/download`);
  }

  // Student assignments
  getAssignments(studentId: string, courseId?: string): Observable<Assignment[]> {
    const params = courseId ? { courseId } : {};
    return this.apiService.get<Assignment[]>(`${this.baseEndpoint}/${studentId}/assignments`, params);
  }

  submitAssignment(studentId: string, assignmentId: string, submission: any): Observable<Assignment> {
    return this.apiService.post<Assignment>(`${this.baseEndpoint}/${studentId}/assignments/${assignmentId}/submit`, submission);
  }

  uploadAssignmentFile(studentId: string, assignmentId: string, formData: FormData): Observable<Assignment> {
    return this.apiService.upload<Assignment>(`${this.baseEndpoint}/${studentId}/assignments/${assignmentId}/upload`, formData);
  }

  // Student exam results
  getExamResults(studentId: string): Observable<StudentExamResult[]> {
    return this.apiService.get<StudentExamResult[]>(`${this.baseEndpoint}/${studentId}/exam-results`);
  }

  getExamResultById(studentId: string, resultId: string): Observable<StudentExamResult> {
    return this.apiService.get<StudentExamResult>(`${this.baseEndpoint}/${studentId}/exam-results/${resultId}`);
  }

  // Student statistics
  getStudentStats(studentId: string): Observable<any> {
    return this.apiService.get<any>(`${this.baseEndpoint}/${studentId}/stats`);
  }

  getOverallStats(): Observable<StudentStats> {
    return this.apiService.get<StudentStats>(`${this.baseEndpoint}/stats`);
  }

  // Student search and filtering
  searchStudents(query: string): Observable<Student[]> {
    return this.apiService.get<Student[]>(`${this.baseEndpoint}/search`, { q: query });
  }

  getStudentsByCourse(courseId: string): Observable<Student[]> {
    return this.apiService.get<Student[]>(`${this.baseEndpoint}/course/${courseId}`);
  }

  getActiveStudents(): Observable<Student[]> {
    return this.apiService.get<Student[]>(`${this.baseEndpoint}/active`);
  }

  getGraduatedStudents(): Observable<Student[]> {
    return this.apiService.get<Student[]>(`${this.baseEndpoint}/graduated`);
  }

  // Student activation/deactivation
  activateStudent(id: string): Observable<Student> {
    return this.apiService.patch<Student>(`${this.baseEndpoint}/${id}/activate`, {});
  }

  deactivateStudent(id: string): Observable<Student> {
    return this.apiService.patch<Student>(`${this.baseEndpoint}/${id}/deactivate`, {});
  }

  // Student profile management
  updateProfile(studentId: string, profile: any): Observable<Student> {
    return this.apiService.patch<Student>(`${this.baseEndpoint}/${studentId}/profile`, profile);
  }

  uploadProfilePicture(studentId: string, formData: FormData): Observable<Student> {
    return this.apiService.upload<Student>(`${this.baseEndpoint}/${studentId}/profile/picture`, formData);
  }

  // Student attendance
  getAttendance(studentId: string, courseId?: string, startDate?: Date, endDate?: Date): Observable<any[]> {
    const params: any = {};
    if (courseId) params.courseId = courseId;
    if (startDate) params.startDate = startDate.toISOString();
    if (endDate) params.endDate = endDate.toISOString();
    
    return this.apiService.get<any[]>(`${this.baseEndpoint}/${studentId}/attendance`, params);
  }

  markAttendance(studentId: string, attendanceData: any): Observable<any> {
    return this.apiService.post<any>(`${this.baseEndpoint}/${studentId}/attendance`, attendanceData);
  }

  // Student progress tracking
  getProgress(studentId: string, courseId: string): Observable<any> {
    return this.apiService.get<any>(`${this.baseEndpoint}/${studentId}/progress/${courseId}`);
  }

  updateProgress(studentId: string, courseId: string, progress: any): Observable<any> {
    return this.apiService.put<any>(`${this.baseEndpoint}/${studentId}/progress/${courseId}`, progress);
  }

  // Student notifications
  getNotifications(studentId: string): Observable<any[]> {
    return this.apiService.get<any[]>(`${this.baseEndpoint}/${studentId}/notifications`);
  }

  markNotificationAsRead(studentId: string, notificationId: string): Observable<any> {
    return this.apiService.patch<any>(`${this.baseEndpoint}/${studentId}/notifications/${notificationId}/read`, {});
  }

  // Bulk operations
  bulkEnrollStudents(courseId: string, studentIds: string[]): Observable<any> {
    return this.apiService.post<any>(`${this.baseEndpoint}/bulk-enroll`, { courseId, studentIds });
  }

  bulkUpdateStudents(updates: any[]): Observable<any> {
    return this.apiService.put<any>(`${this.baseEndpoint}/bulk-update`, { updates });
  }

  // Export functionality
  exportStudents(filter?: StudentFilter): Observable<Blob> {
    return this.apiService.download(`${this.baseEndpoint}/export`, filter);
  }

  importStudents(formData: FormData): Observable<any> {
    return this.apiService.upload<any>(`${this.baseEndpoint}/import`, formData);
  }
}
