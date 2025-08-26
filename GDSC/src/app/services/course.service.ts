import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course, CourseCategory } from '../models/course.model';
import { ApiResponse } from '../models/api-response.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // Course Category methods
  getCategories(): Observable<ApiResponse<CourseCategory[]>> {
    return this.http.get<ApiResponse<CourseCategory[]>>(`${this.apiUrl}/course-categories`);
  }

  getCategoryById(id: number): Observable<ApiResponse<CourseCategory>> {
    return this.http.get<ApiResponse<CourseCategory>>(`${this.apiUrl}/course-categories/${id}`);
  }

  createCategory(category: CourseCategory): Observable<ApiResponse<CourseCategory>> {
    return this.http.post<ApiResponse<CourseCategory>>(
      `${this.apiUrl}/course-categories`, 
      category, 
      { headers: this.getHeaders() }
    );
  }

  updateCategory(id: number, category: CourseCategory): Observable<ApiResponse<CourseCategory>> {
    return this.http.put<ApiResponse<CourseCategory>>(
      `${this.apiUrl}/course-categories/${id}`, 
      category, 
      { headers: this.getHeaders() }
    );
  }

  deleteCategory(id: number): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(
      `${this.apiUrl}/course-categories/${id}`, 
      { headers: this.getHeaders() }
    );
  }

  // Course methods
  getCourses(): Observable<ApiResponse<Course[]>> {
    return this.http.get<ApiResponse<Course[]>>(`${this.apiUrl}/courses`);
  }

  getCourseById(id: number): Observable<ApiResponse<Course>> {
    return this.http.get<ApiResponse<Course>>(`${this.apiUrl}/courses/${id}`);
  }

  createCourse(course: Course): Observable<ApiResponse<Course>> {
    return this.http.post<ApiResponse<Course>>(
      `${this.apiUrl}/courses`, 
      course, 
      { headers: this.getHeaders() }
    );
  }

  updateCourse(id: number, course: Course): Observable<ApiResponse<Course>> {
    return this.http.put<ApiResponse<Course>>(
      `${this.apiUrl}/courses/${id}`, 
      course, 
      { headers: this.getHeaders() }
    );
  }

  deleteCourse(id: number): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(
      `${this.apiUrl}/courses/${id}`, 
      { headers: this.getHeaders() }
    );
  }

  getCoursesByCategory(categoryId: number): Observable<ApiResponse<Course[]>> {
    return this.http.get<ApiResponse<Course[]>>(`${this.apiUrl}/courses/category/${categoryId}`);
  }

  searchCourses(keyword: string): Observable<ApiResponse<Course[]>> {
    return this.http.get<ApiResponse<Course[]>>(`${this.apiUrl}/courses/search?keyword=${keyword}`);
  }
}
