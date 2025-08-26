import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService } from '../core/services/api.service';
import { 
  Centre, 
  CentreFilter, 
  CentreStats,
  Facility,
  StaffMember,
  OperatingHours
} from '../shared/models/centre.model';

@Injectable({
  providedIn: 'root'
})
export class CentreService {
  private readonly baseEndpoint = '/centers';

  constructor(private apiService: ApiService) {}

  // Centre CRUD operations
  getCentres(filter?: CentreFilter): Observable<{ centres: Centre[]; total: number; page: number; limit: number }> {
    // Clean up filter object by removing undefined/null/empty values
    const cleanFilter = filter ? Object.fromEntries(
      Object.entries(filter).filter(([_, value]) => 
        value !== undefined && value !== null && value !== ''
      )
    ) : {};
    
    // console.log('Calling API for centres with clean filter:', cleanFilter);
    return this.apiService.get<{ centres: Centre[]; total: number; page: number; limit: number }>(
      this.baseEndpoint,
      cleanFilter
    );
  }

  getCentreById(id: string): Observable<Centre> {
    return this.apiService.get<Centre>(`${this.baseEndpoint}/${id}`);
  }

  createCentre(centre: Partial<Centre>): Observable<Centre> {
    return this.apiService.post<Centre>(this.baseEndpoint, centre);
  }

  updateCentre(id: string, centre: Partial<Centre>): Observable<Centre> {
    return this.apiService.put<Centre>(`${this.baseEndpoint}/${id}`, centre);
  }

  deleteCentre(id: string): Observable<void> {
    return this.apiService.delete<void>(`${this.baseEndpoint}/${id}`);
  }

  // Centre facilities
  getFacilities(centreId: string): Observable<Facility[]> {
    return this.apiService.get<Facility[]>(`${this.baseEndpoint}/${centreId}/facilities`);
  }

  addFacility(centreId: string, facility: Partial<Facility>): Observable<Facility> {
    return this.apiService.post<Facility>(`${this.baseEndpoint}/${centreId}/facilities`, facility);
  }

  updateFacility(centreId: string, facilityId: string, facility: Partial<Facility>): Observable<Facility> {
    return this.apiService.put<Facility>(`${this.baseEndpoint}/${centreId}/facilities/${facilityId}`, facility);
  }

  deleteFacility(centreId: string, facilityId: string): Observable<void> {
    return this.apiService.delete<void>(`${this.baseEndpoint}/${centreId}/facilities/${facilityId}`);
  }

  // Centre staff
  getStaff(centreId: string): Observable<StaffMember[]> {
    return this.apiService.get<StaffMember[]>(`${this.baseEndpoint}/${centreId}/staff`);
  }

  addStaff(centreId: string, staff: Partial<StaffMember>): Observable<StaffMember> {
    return this.apiService.post<StaffMember>(`${this.baseEndpoint}/${centreId}/staff`, staff);
  }

  updateStaff(centreId: string, staffId: string, staff: Partial<StaffMember>): Observable<StaffMember> {
    return this.apiService.put<StaffMember>(`${this.baseEndpoint}/${centreId}/staff/${staffId}`, staff);
  }

  removeStaff(centreId: string, staffId: string): Observable<void> {
    return this.apiService.delete<void>(`${this.baseEndpoint}/${centreId}/staff/${staffId}`);
  }

  // Centre operating hours
  getOperatingHours(centreId: string): Observable<OperatingHours> {
    return this.apiService.get<OperatingHours>(`${this.baseEndpoint}/${centreId}/operating-hours`);
  }

  updateOperatingHours(centreId: string, hours: OperatingHours): Observable<OperatingHours> {
    return this.apiService.put<OperatingHours>(`${this.baseEndpoint}/${centreId}/operating-hours`, hours);
  }

  // Centre statistics
  getCentreStats(centreId: string): Observable<any> {
    return this.apiService.get<any>(`${this.baseEndpoint}/${centreId}/stats`);
  }

  getOverallStats(): Observable<CentreStats> {
    return this.apiService.get<CentreStats>(`${this.baseEndpoint}/stats`);
  }

  // Centre activation/deactivation
  activateCentre(id: string): Observable<Centre> {
    return this.apiService.patch<Centre>(`${this.baseEndpoint}/${id}/activate`, {});
  }

  deactivateCentre(id: string): Observable<Centre> {
    return this.apiService.patch<Centre>(`${this.baseEndpoint}/${id}/deactivate`, {});
  }

  putCentreInMaintenance(id: string, reason: string): Observable<Centre> {
    return this.apiService.patch<Centre>(`${this.baseEndpoint}/${id}/maintenance`, { reason });
  }

  // Centre search and filtering
  searchCentres(query: string): Observable<Centre[]> {
    return this.apiService.get<Centre[]>(`${this.baseEndpoint}/search`, { q: query });
  }

  getCentresByLocation(city: string, state?: string): Observable<Centre[]> {
    const params: any = { city };
    if (state) params.state = state;
    return this.apiService.get<Centre[]>(`${this.baseEndpoint}/location`, params);
  }

  getActiveCentres(): Observable<Centre[]> {
    return this.apiService.get<Centre[]>(`${this.baseEndpoint}/active`);
  }

  getCentresByCapacity(minCapacity: number, maxCapacity?: number): Observable<Centre[]> {
    const params: any = { minCapacity };
    if (maxCapacity) params.maxCapacity = maxCapacity;
    return this.apiService.get<Centre[]>(`${this.baseEndpoint}/capacity`, params);
  }

  // Centre courses
  getCentreCourses(centreId: string): Observable<any[]> {
    return this.apiService.get<any[]>(`${this.baseEndpoint}/${centreId}/courses`);
  }

  assignCourseToCentre(centreId: string, courseId: string): Observable<any> {
    return this.apiService.post<any>(`${this.baseEndpoint}/${centreId}/courses`, { courseId });
  }

  removeCourseFromCentre(centreId: string, courseId: string): Observable<void> {
    return this.apiService.delete<void>(`${this.baseEndpoint}/${centreId}/courses/${courseId}`);
  }

  // Centre students
  getCentreStudents(centreId: string): Observable<any[]> {
    return this.apiService.get<any[]>(`${this.baseEndpoint}/${centreId}/students`);
  }

  enrollStudentInCentre(centreId: string, studentId: string): Observable<any> {
    return this.apiService.post<any>(`${this.baseEndpoint}/${centreId}/students`, { studentId });
  }

  removeStudentFromCentre(centreId: string, studentId: string): Observable<void> {
    return this.apiService.delete<void>(`${this.baseEndpoint}/${centreId}/students/${studentId}`);
  }

  // Centre maintenance
  scheduleMaintenance(centreId: string, maintenanceData: any): Observable<any> {
    return this.apiService.post<any>(`${this.baseEndpoint}/${centreId}/maintenance`, maintenanceData);
  }

  getMaintenanceHistory(centreId: string): Observable<any[]> {
    return this.apiService.get<any[]>(`${this.baseEndpoint}/${centreId}/maintenance`);
  }

  updateMaintenanceStatus(centreId: string, maintenanceId: string, status: string): Observable<any> {
    return this.apiService.patch<any>(`${this.baseEndpoint}/${centreId}/maintenance/${maintenanceId}`, { status });
  }

  // Centre amenities
  updateAmenities(centreId: string, amenities: string[]): Observable<Centre> {
    return this.apiService.patch<Centre>(`${this.baseEndpoint}/${centreId}/amenities`, { amenities });
  }

  // Centre images
  uploadCentreImage(centreId: string, formData: FormData): Observable<Centre> {
    return this.apiService.upload<Centre>(`${this.baseEndpoint}/${centreId}/images`, formData);
  }

  deleteCentreImage(centreId: string, imageId: string): Observable<Centre> {
    return this.apiService.delete<Centre>(`${this.baseEndpoint}/${centreId}/images/${imageId}`);
  }

  // Centre analytics
  getAnalytics(centreId: string, period?: string): Observable<any> {
    const params = period ? { period } : {};
    return this.apiService.get<any>(`${this.baseEndpoint}/${centreId}/analytics`, params);
  }

  getEnrollmentTrends(centreId: string, period?: string): Observable<any> {
    const params = period ? { period } : {};
    return this.apiService.get<any>(`${this.baseEndpoint}/${centreId}/enrollment-trends`, params);
  }

  getRevenueAnalytics(centreId: string, period?: string): Observable<any> {
    const params = period ? { period } : {};
    return this.apiService.get<any>(`${this.baseEndpoint}/${centreId}/revenue-analytics`, params);
  }

  // Bulk operations
  bulkUpdateCentres(updates: any[]): Observable<any> {
    return this.apiService.put<any>(`${this.baseEndpoint}/bulk-update`, { updates });
  }

  bulkAssignCourses(assignments: any[]): Observable<any> {
    return this.apiService.post<any>(`${this.baseEndpoint}/bulk-assign-courses`, { assignments });
  }

  // Export functionality
  exportCentres(filter?: CentreFilter): Observable<Blob> {
    return this.apiService.download(`${this.baseEndpoint}/export`, filter);
  }

  exportCentreReport(centreId: string, reportType: string): Observable<Blob> {
    return this.apiService.download(`${this.baseEndpoint}/${centreId}/export-report`, { reportType });
  }

  // Centre notifications
  getCentreNotifications(centreId: string): Observable<any[]> {
    return this.apiService.get<any[]>(`${this.baseEndpoint}/${centreId}/notifications`);
  }

  sendCentreNotification(centreId: string, notification: any): Observable<any> {
    return this.apiService.post<any>(`${this.baseEndpoint}/${centreId}/notifications`, notification);
  }

  // Centre settings
  updateCentreSettings(centreId: string, settings: any): Observable<Centre> {
    return this.apiService.patch<Centre>(`${this.baseEndpoint}/${centreId}/settings`, settings);
  }

  getCentreSettings(centreId: string): Observable<any> {
    return this.apiService.get<any>(`${this.baseEndpoint}/${centreId}/settings`);
  }
}
