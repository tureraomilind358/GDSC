import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService } from '../core/services/api.service';
import { User, UserProfile, UserRole } from '../shared/models/user.model';

export interface UserFilter {
  role?: string;
  isActive?: boolean;
  search?: string;
  page?: number;
  limit?: number;
  sort?: string; // e.g., 'createdAt,desc'
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  usersByRole: { [key: string]: number };
  recentRegistrations: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseEndpoint = '/users';

  constructor(private apiService: ApiService) {}

  // User CRUD operations
  getUsers(filter?: UserFilter): Observable<{ users: User[]; total: number; page: number; limit: number }> {
    // Clean up filter object by removing undefined/null/empty values
    const cleanFilter = filter ? Object.fromEntries(
      Object.entries(filter).filter(([_, value]) => 
        value !== undefined && value !== null && value !== ''
      )
    ) : {};
    
    console.log('Calling API for users with clean filter:', cleanFilter);
    
    // Apply sensible defaults: latest users first
    const params: UserFilter = {
      page: cleanFilter['page'] ?? 0,
      limit: cleanFilter['limit'] ?? 10,
      search: cleanFilter['search'],
      role: cleanFilter['role'],
      isActive: cleanFilter['isActive'],
      sort: cleanFilter['sort'] ?? 'createdAt,desc'
    };
    
    return this.apiService.get<{ users: User[]; total: number; page: number; limit: number }>(
      this.baseEndpoint,
      params
    ).pipe(
      catchError(error => {
        console.warn('Users API failed, returning empty list as fallback', error);
        const empty = { users: [], total: 0, page: params.page ?? 0, limit: params.limit ?? 10 };
        return of(empty);
      })
    );
  }

  getUserById(id: string): Observable<User> {
    return this.apiService.get<User>(`${this.baseEndpoint}/${id}`);
  }

  createUser(user: Partial<User>): Observable<User> {
    return this.apiService.post<User>(this.baseEndpoint, user);
  }

  updateUser(id: string, user: Partial<User>): Observable<User> {
    return this.apiService.put<User>(`${this.baseEndpoint}/${id}`, user);
  }

  deleteUser(id: string): Observable<void> {
    return this.apiService.delete<void>(`${this.baseEndpoint}/${id}`);
  }

  // User roles
  getRoles(): Observable<UserRole[]> {
    return this.apiService.get<UserRole[]>(`${this.baseEndpoint}/roles`);
  }

  getRoleById(id: string): Observable<UserRole> {
    return this.apiService.get<UserRole>(`${this.baseEndpoint}/roles/${id}`);
  }

  createRole(role: Partial<UserRole>): Observable<UserRole> {
    return this.apiService.post<UserRole>(`${this.baseEndpoint}/roles`, role);
  }

  updateRole(id: string, role: Partial<UserRole>): Observable<UserRole> {
    return this.apiService.put<UserRole>(`${this.baseEndpoint}/roles/${id}`, role);
  }

  deleteRole(id: string): Observable<void> {
    return this.apiService.delete<void>(`${this.baseEndpoint}/roles/${id}`);
  }

  // User profile management
  updateProfile(userId: string, profile: Partial<UserProfile>): Observable<User> {
    return this.apiService.patch<User>(`${this.baseEndpoint}/${userId}/profile`, profile);
  }

  uploadProfilePicture(userId: string, formData: FormData): Observable<User> {
    return this.apiService.upload<User>(`${this.baseEndpoint}/${userId}/profile/picture`, formData);
  }

  // User activation/deactivation
  activateUser(id: string): Observable<User> {
    return this.apiService.patch<User>(`${this.baseEndpoint}/${id}/activate`, {});
  }

  deactivateUser(id: string): Observable<User> {
    return this.apiService.patch<User>(`${this.baseEndpoint}/${id}/deactivate`, {});
  }

  // User password management
  changePassword(userId: string, passwordData: { currentPassword: string; newPassword: string }): Observable<any> {
    return this.apiService.post<any>(`${this.baseEndpoint}/${userId}/change-password`, passwordData);
  }

  resetPassword(userId: string, newPassword: string): Observable<any> {
    return this.apiService.post<any>(`${this.baseEndpoint}/${userId}/reset-password`, { newPassword });
  }

  // User role management
  assignRole(userId: string, roleId: string): Observable<User> {
    return this.apiService.post<User>(`${this.baseEndpoint}/${userId}/roles`, { roleId });
  }

  removeRole(userId: string, roleId: string): Observable<User> {
    return this.apiService.delete<User>(`${this.baseEndpoint}/${userId}/roles/${roleId}`);
  }

  updateUserRoles(userId: string, roleIds: string[]): Observable<User> {
    return this.apiService.put<User>(`${this.baseEndpoint}/${userId}/roles`, { roleIds });
  }

  // User permissions
  getUserPermissions(userId: string): Observable<string[]> {
    return this.apiService.get<string[]>(`${this.baseEndpoint}/${userId}/permissions`);
  }

  checkPermission(userId: string, permission: string): Observable<boolean> {
    return this.apiService.get<boolean>(`${this.baseEndpoint}/${userId}/permissions/check`, { permission });
  }

  // User search and filtering
  searchUsers(query: string): Observable<User[]> {
    return this.apiService.get<User[]>(`${this.baseEndpoint}/search`, { q: query });
  }

  getUsersByRole(role: string): Observable<User[]> {
    return this.apiService.get<User[]>(`${this.baseEndpoint}/role/${role}`);
  }

  getActiveUsers(): Observable<User[]> {
    return this.apiService.get<User[]>(`${this.baseEndpoint}/active`);
  }

  getInactiveUsers(): Observable<User[]> {
    return this.apiService.get<User[]>(`${this.baseEndpoint}/inactive`);
  }

  // User statistics
  getUserStats(): Observable<UserStats> {
    return this.apiService.get<UserStats>(`${this.baseEndpoint}/stats`);
  }

  getUserStatsByPeriod(startDate: Date, endDate: Date): Observable<UserStats> {
    return this.apiService.get<UserStats>(`${this.baseEndpoint}/stats/period`, {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    });
  }

  // User sessions
  getUserSessions(userId: string): Observable<any[]> {
    return this.apiService.get<any[]>(`${this.baseEndpoint}/${userId}/sessions`);
  }

  terminateSession(userId: string, sessionId: string): Observable<any> {
    return this.apiService.delete<any>(`${this.baseEndpoint}/${userId}/sessions/${sessionId}`);
  }

  terminateAllSessions(userId: string): Observable<any> {
    return this.apiService.delete<any>(`${this.baseEndpoint}/${userId}/sessions`);
  }

  // User activity
  getUserActivity(userId: string, period?: string): Observable<any[]> {
    const params = period ? { period } : {};
    return this.apiService.get<any[]>(`${this.baseEndpoint}/${userId}/activity`, params);
  }

  getLoginHistory(userId: string): Observable<any[]> {
    return this.apiService.get<any[]>(`${this.baseEndpoint}/${userId}/login-history`);
  }

  // User notifications
  getUserNotifications(userId: string): Observable<any[]> {
    return this.apiService.get<any[]>(`${this.baseEndpoint}/${userId}/notifications`);
  }

  markNotificationAsRead(userId: string, notificationId: string): Observable<any> {
    return this.apiService.patch<any>(`${this.baseEndpoint}/${userId}/notifications/${notificationId}/read`, {});
  }

  sendNotification(userId: string, notification: any): Observable<any> {
    return this.apiService.post<any>(`${this.baseEndpoint}/${userId}/notifications`, notification);
  }

  // User preferences
  getUserPreferences(userId: string): Observable<any> {
    return this.apiService.get<any>(`${this.baseEndpoint}/${userId}/preferences`);
  }

  updateUserPreferences(userId: string, preferences: any): Observable<any> {
    return this.apiService.put<any>(`${this.baseEndpoint}/${userId}/preferences`, preferences);
  }

  // Bulk operations
  bulkUpdateUsers(updates: any[]): Observable<any> {
    return this.apiService.put<any>(`${this.baseEndpoint}/bulk-update`, { updates });
  }

  bulkAssignRoles(assignments: any[]): Observable<any> {
    return this.apiService.post<any>(`${this.baseEndpoint}/bulk-assign-roles`, { assignments });
  }

  bulkActivateUsers(userIds: string[]): Observable<any> {
    return this.apiService.post<any>(`${this.baseEndpoint}/bulk-activate`, { userIds });
  }

  bulkDeactivateUsers(userIds: string[]): Observable<any> {
    return this.apiService.post<any>(`${this.baseEndpoint}/bulk-deactivate`, { userIds });
  }

  // Export functionality
  exportUsers(filter?: UserFilter): Observable<Blob> {
    return this.apiService.download(`${this.baseEndpoint}/export`, filter);
  }

  exportUserReport(reportType: string, filter?: any): Observable<Blob> {
    const params = { reportType, ...filter };
    return this.apiService.download(`${this.baseEndpoint}/export-report`, params);
  }

  // Import functionality
  importUsers(formData: FormData): Observable<any> {
    return this.apiService.upload<any>(`${this.baseEndpoint}/import`, formData);
  }

  // User analytics
  getUserAnalytics(period?: string): Observable<any> {
    const params = period ? { period } : {};
    return this.apiService.get<any>(`${this.baseEndpoint}/analytics`, params);
  }

  getRoleAnalytics(): Observable<any> {
    return this.apiService.get<any>(`${this.baseEndpoint}/analytics/roles`);
  }

  // User settings
  updateUserSettings(userId: string, settings: any): Observable<User> {
    return this.apiService.patch<User>(`${this.baseEndpoint}/${userId}/settings`, settings);
  }

  getUserSettings(userId: string): Observable<any> {
    return this.apiService.get<any>(`${this.baseEndpoint}/${userId}/settings`);
  }

  // User verification
  verifyEmail(userId: string, token: string): Observable<any> {
    return this.apiService.post<any>(`${this.baseEndpoint}/${userId}/verify-email`, { token });
  }

  resendVerificationEmail(userId: string): Observable<any> {
    return this.apiService.post<any>(`${this.baseEndpoint}/${userId}/resend-verification`, {});
  }
}
