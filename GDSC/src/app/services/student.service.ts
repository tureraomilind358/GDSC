import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';
import { ApiResponse } from '../models/api-response.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
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

  getStudents(): Observable<ApiResponse<Student[]>> {
    return this.http.get<ApiResponse<Student[]>>(
      `${this.apiUrl}/students`, 
      { headers: this.getHeaders() }
    );
  }

  getStudentById(id: number): Observable<ApiResponse<Student>> {
    return this.http.get<ApiResponse<Student>>(
      `${this.apiUrl}/students/${id}`, 
      { headers: this.getHeaders() }
    );
  }

  createStudent(student: Student): Observable<ApiResponse<Student>> {
    return this.http.post<ApiResponse<Student>>(
      `${this.apiUrl}/students`, 
      student, 
      { headers: this.getHeaders() }
    );
  }

  updateStudent(id: number, student: Student): Observable<ApiResponse<Student>> {
    return this.http.put<ApiResponse<Student>>(
      `${this.apiUrl}/students/${id}`, 
      student, 
      { headers: this.getHeaders() }
    );
  }

  deleteStudent(id: number): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(
      `${this.apiUrl}/students/${id}`, 
      { headers: this.getHeaders() }
    );
  }

  searchStudents(keyword: string): Observable<ApiResponse<Student[]>> {
    return this.http.get<ApiResponse<Student[]>>(
      `${this.apiUrl}/students/search?keyword=${keyword}`, 
      { headers: this.getHeaders() }
    );
  }
}
