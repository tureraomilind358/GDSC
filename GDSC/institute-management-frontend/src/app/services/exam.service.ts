import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../core/services/api.service';
import { 
  Exam, 
  Question, 
  ExamResult, 
  ExamSchedule, 
  ExamFilter, 
  ExamStats,
  StudentAnswer
} from '../shared/models/exam.model';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  private readonly baseEndpoint = '/exams';

  constructor(private apiService: ApiService) {}

  // Exam CRUD operations
  getExams(filter?: ExamFilter): Observable<{ exams: Exam[]; total: number; page: number; limit: number }> {
    return this.apiService.get<{ exams: Exam[]; total: number; page: number; limit: number }>(
      this.baseEndpoint,
      filter
    );
  }

  getExamById(id: string): Observable<Exam> {
    return this.apiService.get<Exam>(`${this.baseEndpoint}/${id}`);
  }

  createExam(exam: Partial<Exam>): Observable<Exam> {
    return this.apiService.post<Exam>(this.baseEndpoint, exam);
  }

  updateExam(id: string, exam: Partial<Exam>): Observable<Exam> {
    return this.apiService.put<Exam>(`${this.baseEndpoint}/${id}`, exam);
  }

  deleteExam(id: string): Observable<void> {
    return this.apiService.delete<void>(`${this.baseEndpoint}/${id}`);
  }

  // Exam questions
  getQuestions(examId: string): Observable<Question[]> {
    return this.apiService.get<Question[]>(`${this.baseEndpoint}/${examId}/questions`);
  }

  addQuestion(examId: string, question: Partial<Question>): Observable<Question> {
    return this.apiService.post<Question>(`${this.baseEndpoint}/${examId}/questions`, question);
  }

  updateQuestion(examId: string, questionId: string, question: Partial<Question>): Observable<Question> {
    return this.apiService.put<Question>(`${this.baseEndpoint}/${examId}/questions/${questionId}`, question);
  }

  deleteQuestion(examId: string, questionId: string): Observable<void> {
    return this.apiService.delete<void>(`${this.baseEndpoint}/${examId}/questions/${questionId}`);
  }

  // Exam results
  getResults(examId: string): Observable<ExamResult[]> {
    return this.apiService.get<ExamResult[]>(`${this.baseEndpoint}/${examId}/results`);
  }

  getResultById(examId: string, resultId: string): Observable<ExamResult> {
    return this.apiService.get<ExamResult>(`${this.baseEndpoint}/${examId}/results/${resultId}`);
  }

  submitExam(examId: string, answers: StudentAnswer[]): Observable<ExamResult> {
    return this.apiService.post<ExamResult>(`${this.baseEndpoint}/${examId}/submit`, { answers });
  }

  gradeExam(examId: string, resultId: string, grades: any): Observable<ExamResult> {
    return this.apiService.put<ExamResult>(`${this.baseEndpoint}/${examId}/results/${resultId}/grade`, grades);
  }

  // Exam scheduling
  getSchedules(examId?: string): Observable<ExamSchedule[]> {
    const params = examId ? { examId } : {};
    return this.apiService.get<ExamSchedule[]>(`${this.baseEndpoint}/schedules`, params);
  }

  createSchedule(schedule: Partial<ExamSchedule>): Observable<ExamSchedule> {
    return this.apiService.post<ExamSchedule>(`${this.baseEndpoint}/schedules`, schedule);
  }

  updateSchedule(scheduleId: string, schedule: Partial<ExamSchedule>): Observable<ExamSchedule> {
    return this.apiService.put<ExamSchedule>(`${this.baseEndpoint}/schedules/${scheduleId}`, schedule);
  }

  deleteSchedule(scheduleId: string): Observable<void> {
    return this.apiService.delete<void>(`${this.baseEndpoint}/schedules/${scheduleId}`);
  }

  // Exam statistics
  getExamStats(examId: string): Observable<any> {
    return this.apiService.get<any>(`${this.baseEndpoint}/${examId}/stats`);
  }

  getOverallStats(): Observable<ExamStats> {
    return this.apiService.get<ExamStats>(`${this.baseEndpoint}/stats`);
  }

  // Exam activation/deactivation
  activateExam(id: string): Observable<Exam> {
    return this.apiService.patch<Exam>(`${this.baseEndpoint}/${id}/activate`, {});
  }

  deactivateExam(id: string): Observable<Exam> {
    return this.apiService.patch<Exam>(`${this.baseEndpoint}/${id}/deactivate`, {});
  }

  publishExam(id: string): Observable<Exam> {
    return this.apiService.patch<Exam>(`${this.baseEndpoint}/${id}/publish`, {});
  }

  archiveExam(id: string): Observable<Exam> {
    return this.apiService.patch<Exam>(`${this.baseEndpoint}/${id}/archive`, {});
  }

  // Exam search and filtering
  searchExams(query: string): Observable<Exam[]> {
    return this.apiService.get<Exam[]>(`${this.baseEndpoint}/search`, { q: query });
  }

  getExamsByCourse(courseId: string): Observable<Exam[]> {
    return this.apiService.get<Exam[]>(`${this.baseEndpoint}/course/${courseId}`);
  }

  getActiveExams(): Observable<Exam[]> {
    return this.apiService.get<Exam[]>(`${this.baseEndpoint}/active`);
  }

  getPublishedExams(): Observable<Exam[]> {
    return this.apiService.get<Exam[]>(`${this.baseEndpoint}/published`);
  }

  // Exam proctoring
  startProctoring(examId: string, studentId: string): Observable<any> {
    return this.apiService.post<any>(`${this.baseEndpoint}/${examId}/proctoring/start`, { studentId });
  }

  endProctoring(examId: string, studentId: string): Observable<any> {
    return this.apiService.post<any>(`${this.baseEndpoint}/${examId}/proctoring/end`, { studentId });
  }

  getProctoringStatus(examId: string, studentId: string): Observable<any> {
    return this.apiService.get<any>(`${this.baseEndpoint}/${examId}/proctoring/status/${studentId}`);
  }

  // Exam file uploads
  uploadQuestionFile(examId: string, questionId: string, formData: FormData): Observable<Question> {
    return this.apiService.upload<Question>(`${this.baseEndpoint}/${examId}/questions/${questionId}/upload`, formData);
  }

  uploadExamFile(examId: string, formData: FormData): Observable<Exam> {
    return this.apiService.upload<Exam>(`${this.baseEndpoint}/${examId}/upload`, formData);
  }

  // Exam templates
  getExamTemplates(): Observable<Exam[]> {
    return this.apiService.get<Exam[]>(`${this.baseEndpoint}/templates`);
  }

  createFromTemplate(templateId: string, examData: Partial<Exam>): Observable<Exam> {
    return this.apiService.post<Exam>(`${this.baseEndpoint}/templates/${templateId}/create`, examData);
  }

  saveAsTemplate(examId: string, templateData: any): Observable<Exam> {
    return this.apiService.post<Exam>(`${this.baseEndpoint}/${examId}/save-template`, templateData);
  }

  // Exam analytics
  getAnalytics(examId: string): Observable<any> {
    return this.apiService.get<any>(`${this.baseEndpoint}/${examId}/analytics`);
  }

  getQuestionAnalytics(examId: string, questionId: string): Observable<any> {
    return this.apiService.get<any>(`${this.baseEndpoint}/${examId}/questions/${questionId}/analytics`);
  }

  // Bulk operations
  bulkCreateExams(exams: Partial<Exam>[]): Observable<Exam[]> {
    return this.apiService.post<Exam[]>(`${this.baseEndpoint}/bulk-create`, { exams });
  }

  bulkGradeExams(grades: any[]): Observable<any> {
    return this.apiService.put<any>(`${this.baseEndpoint}/bulk-grade`, { grades });
  }

  // Export functionality
  exportExamResults(examId: string): Observable<Blob> {
    return this.apiService.download(`${this.baseEndpoint}/${examId}/export-results`);
  }

  exportExamQuestions(examId: string): Observable<Blob> {
    return this.apiService.download(`${this.baseEndpoint}/${examId}/export-questions`);
  }

  // Exam settings
  updateExamSettings(examId: string, settings: any): Observable<Exam> {
    return this.apiService.patch<Exam>(`${this.baseEndpoint}/${examId}/settings`, settings);
  }

  getExamSettings(examId: string): Observable<any> {
    return this.apiService.get<any>(`${this.baseEndpoint}/${examId}/settings`);
  }
}
