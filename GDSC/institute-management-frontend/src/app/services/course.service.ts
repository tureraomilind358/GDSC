import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../core/services/api.service';
import { 
  Course, 
  CourseEnrollment, 
  CourseCategory, 
  CourseFilter,
  SyllabusItem,
  CourseMaterial,
  CourseSchedule
} from '../shared/models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private readonly baseEndpoint = '/courses';

  constructor(private apiService: ApiService) {}

  // Course CRUD operations
  getCourses(filter?: CourseFilter): Observable<{ courses: Course[]; total: number; page: number; limit: number }> {
    return this.apiService.get<{ courses: Course[]; total: number; page: number; limit: number }>(
      this.baseEndpoint,
      filter
    );
  }

  getCourseById(id: string): Observable<Course> {
    return this.apiService.get<Course>(`${this.baseEndpoint}/${id}`);
  }

  createCourse(course: Partial<Course>): Observable<Course> {
    return this.apiService.post<Course>(this.baseEndpoint, course);
  }

  updateCourse(id: string, course: Partial<Course>): Observable<Course> {
    return this.apiService.put<Course>(`${this.baseEndpoint}/${id}`, course);
  }

  deleteCourse(id: string): Observable<void> {
    return this.apiService.delete<void>(`${this.baseEndpoint}/${id}`);
  }

  // Course categories
  getCategories(): Observable<CourseCategory[]> {
    return this.apiService.get<CourseCategory[]>(`${this.baseEndpoint}/categories`);
  }

  createCategory(category: Partial<CourseCategory>): Observable<CourseCategory> {
    return this.apiService.post<CourseCategory>(`${this.baseEndpoint}/categories`, category);
  }

  updateCategory(id: string, category: Partial<CourseCategory>): Observable<CourseCategory> {
    return this.apiService.put<CourseCategory>(`${this.baseEndpoint}/categories/${id}`, category);
  }

  deleteCategory(id: string): Observable<void> {
    return this.apiService.delete<void>(`${this.baseEndpoint}/categories/${id}`);
  }

  // Course enrollment
  getEnrollments(courseId?: string): Observable<CourseEnrollment[]> {
    const params = courseId ? { courseId } : {};
    return this.apiService.get<CourseEnrollment[]>(`${this.baseEndpoint}/enrollments`, params);
  }

  enrollStudent(courseId: string, studentId: string): Observable<CourseEnrollment> {
    return this.apiService.post<CourseEnrollment>(`${this.baseEndpoint}/${courseId}/enroll`, { studentId });
  }

  unenrollStudent(courseId: string, studentId: string): Observable<void> {
    return this.apiService.delete<void>(`${this.baseEndpoint}/${courseId}/enroll/${studentId}`);
  }

  updateEnrollmentStatus(courseId: string, studentId: string, status: string): Observable<CourseEnrollment> {
    return this.apiService.patch<CourseEnrollment>(`${this.baseEndpoint}/${courseId}/enroll/${studentId}`, { status });
  }

  // Course materials
  getMaterials(courseId: string): Observable<CourseMaterial[]> {
    return this.apiService.get<CourseMaterial[]>(`${this.baseEndpoint}/${courseId}/materials`);
  }

  addMaterial(courseId: string, material: Partial<CourseMaterial>): Observable<CourseMaterial> {
    return this.apiService.post<CourseMaterial>(`${this.baseEndpoint}/${courseId}/materials`, material);
  }

  updateMaterial(courseId: string, materialId: string, material: Partial<CourseMaterial>): Observable<CourseMaterial> {
    return this.apiService.put<CourseMaterial>(`${this.baseEndpoint}/${courseId}/materials/${materialId}`, material);
  }

  deleteMaterial(courseId: string, materialId: string): Observable<void> {
    return this.apiService.delete<void>(`${this.baseEndpoint}/${courseId}/materials/${materialId}`);
  }

  // Course syllabus
  getSyllabus(courseId: string): Observable<SyllabusItem[]> {
    return this.apiService.get<SyllabusItem[]>(`${this.baseEndpoint}/${courseId}/syllabus`);
  }

  addSyllabusItem(courseId: string, item: Partial<SyllabusItem>): Observable<SyllabusItem> {
    return this.apiService.post<SyllabusItem>(`${this.baseEndpoint}/${courseId}/syllabus`, item);
  }

  updateSyllabusItem(courseId: string, itemId: string, item: Partial<SyllabusItem>): Observable<SyllabusItem> {
    return this.apiService.put<SyllabusItem>(`${this.baseEndpoint}/${courseId}/syllabus/${itemId}`, item);
  }

  deleteSyllabusItem(courseId: string, itemId: string): Observable<void> {
    return this.apiService.delete<void>(`${this.baseEndpoint}/${courseId}/syllabus/${itemId}`);
  }

  // Course schedule
  getSchedule(courseId: string): Observable<CourseSchedule[]> {
    return this.apiService.get<CourseSchedule[]>(`${this.baseEndpoint}/${courseId}/schedule`);
  }

  addScheduleItem(courseId: string, schedule: Partial<CourseSchedule>): Observable<CourseSchedule> {
    return this.apiService.post<CourseSchedule>(`${this.baseEndpoint}/${courseId}/schedule`, schedule);
  }

  updateScheduleItem(courseId: string, scheduleId: string, schedule: Partial<CourseSchedule>): Observable<CourseSchedule> {
    return this.apiService.put<CourseSchedule>(`${this.baseEndpoint}/${courseId}/schedule/${scheduleId}`, schedule);
  }

  deleteScheduleItem(courseId: string, scheduleId: string): Observable<void> {
    return this.apiService.delete<void>(`${this.baseEndpoint}/${courseId}/schedule/${scheduleId}`);
  }

  // Course statistics
  getCourseStats(courseId: string): Observable<any> {
    return this.apiService.get<any>(`${this.baseEndpoint}/${courseId}/stats`);
  }

  getOverallStats(): Observable<any> {
    return this.apiService.get<any>(`${this.baseEndpoint}/stats`);
  }

  // File upload for course materials
  uploadMaterial(courseId: string, formData: FormData): Observable<CourseMaterial> {
    return this.apiService.upload<CourseMaterial>(`${this.baseEndpoint}/${courseId}/materials/upload`, formData);
  }

  // Course search and filtering
  searchCourses(query: string): Observable<Course[]> {
    return this.apiService.get<Course[]>(`${this.baseEndpoint}/search`, { q: query });
  }

  getCoursesByInstructor(instructorId: string): Observable<Course[]> {
    return this.apiService.get<Course[]>(`${this.baseEndpoint}/instructor/${instructorId}`);
  }

  getActiveCourses(): Observable<Course[]> {
    return this.apiService.get<Course[]>(`${this.baseEndpoint}/active`);
  }

  // Course activation/deactivation
  activateCourse(id: string): Observable<Course> {
    return this.apiService.patch<Course>(`${this.baseEndpoint}/${id}/activate`, {});
  }

  deactivateCourse(id: string): Observable<Course> {
    return this.apiService.patch<Course>(`${this.baseEndpoint}/${id}/deactivate`, {});
  }
}
