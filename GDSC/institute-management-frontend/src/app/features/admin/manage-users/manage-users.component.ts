import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/models/user.model';
import { NotificationService } from '../../../core/services/notification.service';
import { UserDialogComponent } from './user-dialog.component';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule,
    MatChipsModule,
    MatMenuModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatCheckboxModule
  ],
  template: `
    <div class="manage-users-container">
      <!-- Header Section -->
      <div class="header-section">
        <h1>Manage Users</h1>
        <p>Create, edit, and manage system users and their roles</p>
      </div>

      <!-- Search and Filter Section -->
      <mat-card class="search-card">
        <mat-card-content>
          <div class="search-filters">
            <mat-form-field appearance="outline" class="search-field">
              <mat-label>Search Users</mat-label>
              <input matInput 
                     [(ngModel)]="searchTerm" 
                     placeholder="Search by name, email, or username..."
                     (input)="onSearchInput()">
              <mat-icon matSuffix>search</mat-icon>
            </mat-form-field>

            <mat-form-field appearance="outline" class="filter-field">
              <mat-label>Role</mat-label>
              <mat-select [(ngModel)]="roleFilter">
                <mat-option value="">All Roles</mat-option>
                <mat-option value="admin">Admin</mat-option>
                <mat-option value="super_admin">Super Admin</mat-option>
                <mat-option value="examiner">Examiner</mat-option>
                <mat-option value="candidate">Candidate</mat-option>
                <mat-option value="centre_manager">Centre Manager</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline" class="filter-field">
              <mat-label>Status</mat-label>
              <mat-select [(ngModel)]="statusFilter">
                <mat-option value="">All Statuses</mat-option>
                <mat-option value="active">Active</mat-option>
                <mat-option value="inactive">Inactive</mat-option>
                <mat-option value="pending">Pending</mat-option>
                <mat-option value="suspended">Suspended</mat-option>
              </mat-select>
            </mat-form-field>

            <button mat-raised-button color="primary" (click)="applyFilters()">
              <mat-icon>filter_list</mat-icon>
              Apply Filters
            </button>

            <button mat-stroked-button (click)="clearFilters()">
              <mat-icon>clear</mat-icon>
              Clear
            </button>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Actions Section -->
      <div class="actions-section">
        <button mat-raised-button color="primary" (click)="openAddUserDialog()">
          <mat-icon>person_add</mat-icon>
          Add New User
        </button>
        <button mat-stroked-button (click)="exportUsers()">
          <mat-icon>download</mat-icon>
          Export
        </button>
        <button mat-stroked-button (click)="refreshData()">
          <mat-icon>refresh</mat-icon>
          Refresh
        </button>
        <button mat-stroked-button (click)="bulkActions()">
          <mat-icon>settings</mat-icon>
          Bulk Actions
        </button>
      </div>

      <!-- Users Table -->
      <mat-card class="table-card">
        <mat-card-content>
          <div class="table-container">
            <table mat-table [dataSource]="users" matSort (matSortChange)="sortData($event)">
              <!-- Selection Column -->
              <ng-container matColumnDef="select">
                <th mat-header-cell *matHeaderCellDef>
                  <mat-checkbox (change)="$event ? masterToggle() : null"
                               [checked]="selection.hasValue() && isAllSelected()"
                               [indeterminate]="selection.hasValue() && !isAllSelected()">
                  </mat-checkbox>
                </th>
                <td mat-cell *matCellDef="let row">
                  <mat-checkbox (click)="$event.stopPropagation()"
                               (change)="$event ? selection.toggle(row) : null"
                               [checked]="selection.isSelected(row)">
                  </mat-checkbox>
                </td>
              </ng-container>

              <!-- Avatar Column -->
              <ng-container matColumnDef="avatar">
                <th mat-header-cell *matHeaderCellDef> Avatar </th>
                <td mat-cell *matCellDef="let user">
                  <div class="user-avatar">
                    <mat-icon *ngIf="!user.profilePicture">person</mat-icon>
                    <img *ngIf="user.profilePicture" [src]="user.profilePicture" [alt]="user.fullName">
                  </div>
                </td>
              </ng-container>

                             <!-- Name Column -->
               <ng-container matColumnDef="name">
                 <th mat-header-cell *matHeaderCellDef mat-sort-header> Name </th>
                 <td mat-cell *matCellDef="let user">
                   <div class="user-info">
                     <div class="user-name">{{user.firstName}} {{user.lastName}}</div>
                     <div class="user-email">{{user.email}}</div>
                   </div>
                 </td>
               </ng-container>

              <!-- Username Column -->
              <ng-container matColumnDef="username">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Username </th>
                <td mat-cell *matCellDef="let user"> {{user.username}} </td>
              </ng-container>

              <!-- Roles Column -->
              <ng-container matColumnDef="roles">
                <th mat-header-cell *matHeaderCellDef> Roles </th>
                <td mat-cell *matCellDef="let user">
                  <div class="roles-container">
                    <mat-chip *ngFor="let role of user.roles" 
                             [color]="getRoleColor(role)" 
                             selected
                             class="role-chip">
                      {{role}}
                    </mat-chip>
                  </div>
                </td>
              </ng-container>

                             <!-- Status Column -->
               <ng-container matColumnDef="status">
                 <th mat-header-cell *matHeaderCellDef mat-sort-header> Status </th>
                 <td mat-cell *matCellDef="let user">
                   <mat-chip [color]="getStatusColor(user.isActive ? 'active' : 'inactive')" selected>
                     {{user.isActive ? 'Active' : 'Inactive'}}
                   </mat-chip>
                 </td>
               </ng-container>

                             <!-- Last Login Column -->
               <ng-container matColumnDef="lastLogin">
                 <th mat-header-cell *matHeaderCellDef mat-sort-header> Last Login </th>
                 <td mat-cell *matCellDef="let user">
                   {{user.lastLoginAt ? (user.lastLoginAt | date:'short') : 'Never'}}
                 </td>
               </ng-container>

              <!-- Actions Column -->
              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef> Actions </th>
                <td mat-cell *matCellDef="let user">
                  <button mat-icon-button [matMenuTriggerFor]="menu" [matTooltip]="'More actions'">
                    <mat-icon>more_vert</mat-icon>
                  </button>
                  <mat-menu #menu="matMenu">
                    <button mat-menu-item (click)="viewUser(user)">
                      <mat-icon>visibility</mat-icon>
                      <span>View Profile</span>
                    </button>
                    <button mat-menu-item (click)="editUser(user)">
                      <mat-icon>edit</mat-icon>
                      <span>Edit User</span>
                    </button>
                    <button mat-menu-item (click)="manageRoles(user)">
                      <mat-icon>admin_panel_settings</mat-icon>
                      <span>Manage Roles</span>
                    </button>
                    <button mat-menu-item (click)="resetPassword(user)">
                      <mat-icon>lock_reset</mat-icon>
                      <span>Reset Password</span>
                    </button>
                    <button mat-menu-item (click)="toggleUserStatus(user)">
                      <mat-icon>{{user.status === 'active' ? 'block' : 'check_circle'}}</mat-icon>
                      <span>{{user.status === 'active' ? 'Deactivate' : 'Activate'}}</span>
                    </button>
                    <button mat-menu-item (click)="deleteUser(user)" class="delete-action">
                      <mat-icon>delete</mat-icon>
                      <span>Delete User</span>
                    </button>
                  </mat-menu>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>

            <!-- Pagination -->
            <mat-paginator 
              [length]="totalUsers"
              [pageSize]="pageSize"
              [pageSizeOptions]="[5, 10, 25, 50]"
              (page)="onPageChange($event)"
              showFirstLastButtons>
            </mat-paginator>

            <!-- Loading State -->
            <div *ngIf="loading" class="loading-container">
              <mat-spinner diameter="40"></mat-spinner>
              <p>Loading users...</p>
            </div>

            <!-- Empty State -->
            <div *ngIf="!loading && users.length === 0" class="empty-state">
              <mat-icon>people</mat-icon>
              <h3>No Users Found</h3>
              <p>No users match your current filters. Try adjusting your search criteria.</p>
              <button mat-raised-button color="primary" (click)="clearFilters()">
                Clear Filters
              </button>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Statistics Cards -->
      <div class="stats-grid">
        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <mat-icon class="stat-icon">people</mat-icon>
              <div class="stat-details">
                <h3>{{totalUsers}}</h3>
                <p>Total Users</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <mat-icon class="stat-icon">check_circle</mat-icon>
              <div class="stat-details">
                <h3>{{activeUsers}}</h3>
                <p>Active Users</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <mat-icon class="stat-icon">admin_panel_settings</mat-icon>
              <div class="stat-details">
                <h3>{{adminUsers}}</h3>
                <p>Admin Users</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <mat-icon class="stat-icon">pending</mat-icon>
              <div class="stat-details">
                <h3>{{pendingUsers}}</h3>
                <p>Pending Users</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .manage-users-container {
      padding: 20px;
      max-width: 1400px;
      margin: 0 auto;
    }

    .header-section {
      text-align: center;
      margin-bottom: 30px;
    }

    .header-section h1 {
      color: #1976d2;
      margin-bottom: 8px;
      font-size: 2.5rem;
      font-weight: 300;
    }

    .header-section p {
      color: #666;
      font-size: 1.1rem;
      margin: 0;
    }

    .search-card {
      margin-bottom: 20px;
    }

    .search-filters {
      display: flex;
      gap: 16px;
      align-items: center;
      flex-wrap: wrap;
    }

    .search-field {
      flex: 1;
      min-width: 300px;
    }

    .filter-field {
      min-width: 150px;
    }

    .actions-section {
      display: flex;
      gap: 12px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }

    .table-card {
      margin-bottom: 20px;
    }

    .table-container {
      position: relative;
      min-height: 400px;
    }

    table {
      width: 100%;
    }

    .mat-column-select {
      width: 50px;
    }

    .mat-column-avatar {
      width: 80px;
    }

    .mat-column-actions {
      width: 80px;
      text-align: center;
    }

    .mat-column-status {
      width: 120px;
    }

    .mat-column-lastLogin {
      width: 150px;
    }

    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #e0e0e0;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .user-avatar mat-icon {
      color: #666;
    }

    .user-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .user-info {
      display: flex;
      flex-direction: column;
    }

    .user-name {
      font-weight: 500;
      color: #333;
    }

    .user-email {
      font-size: 0.8rem;
      color: #666;
    }

    .roles-container {
      display: flex;
      gap: 4px;
      flex-wrap: wrap;
    }

    .role-chip {
      font-size: 0.7rem;
      height: 24px;
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px;
      color: #666;
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px 20px;
      text-align: center;
      color: #666;
    }

    .empty-state mat-icon {
      font-size: 4rem;
      width: 4rem;
      height: 4rem;
      color: #ccc;
      margin-bottom: 16px;
    }

    .empty-state h3 {
      margin: 0 0 8px 0;
      color: #333;
    }

    .empty-state p {
      margin: 0 0 20px 0;
      max-width: 400px;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-top: 30px;
    }

    .stat-card {
      text-align: center;
    }

    .stat-content {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
    }

    .stat-icon {
      font-size: 2.5rem;
      width: 2.5rem;
      height: 2.5rem;
      color: #1976d2;
    }

    .stat-details h3 {
      margin: 0;
      font-size: 2rem;
      font-weight: 300;
      color: #1976d2;
    }

    .stat-details p {
      margin: 0;
      color: #666;
      font-size: 0.9rem;
    }

    .delete-action {
      color: #f44336;
    }

    .delete-action mat-icon {
      color: #f44336;
    }

    @media (max-width: 768px) {
      .search-filters {
        flex-direction: column;
        align-items: stretch;
      }

      .search-field,
      .filter-field {
        min-width: auto;
      }

      .actions-section {
        flex-direction: column;
      }

      .stats-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ManageUsersComponent implements OnInit, OnDestroy {
  users: User[] = [];
  displayedColumns: string[] = ['select', 'avatar', 'name', 'username', 'roles', 'status', 'lastLogin', 'actions'];
  
  // Selection
  selection = new SelectionModel<User>();
  
  // Pagination
  totalUsers = 0;
  pageSize = 10;
  currentPage = 0;
  
  // Search and filters
  searchTerm = '';
  roleFilter = '';
  statusFilter = '';
  
  // Sorting
  sortColumn = 'fullName';
  sortDirection = 'asc';
  
  // State
  loading = false;
  
  // Statistics
  activeUsers = 0;
  adminUsers = 0;
  pendingUsers = 0;
  
  private destroy$ = new Subject<void>();

  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadStatistics();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadUsers(): void {
    this.loading = true;
    
    // Build filter object, only including non-empty values
    const filter: any = {
      page: this.currentPage,
      limit: this.pageSize,
      sort: `${this.sortColumn},${this.sortDirection}`
    };

    // Only add search term if it's not empty
    if (this.searchTerm && this.searchTerm.trim()) {
      filter.search = this.searchTerm.trim();
    }

    // Only add role filter if it's not empty
    if (this.roleFilter && this.roleFilter.trim()) {
      filter.role = this.roleFilter;
    }

    // Only add status filter if it's not empty
    if (this.statusFilter && this.statusFilter.trim()) {
      filter.status = this.statusFilter;
    }

    this.userService.getUsers(filter)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.users = response.users || [];
          this.totalUsers = response.total || 0;
          this.loading = false;
          this.loadStatistics();
        },
        error: (error) => {
          console.error('Error loading users:', error);
          this.notificationService.showError('Failed to load users');
          this.loading = false;
        }
      });
  }

  loadStatistics(): void {
    // Calculate statistics from loaded users
    this.activeUsers = this.users.filter(u => u.isActive).length;
    this.adminUsers = this.users.filter(u => u.roles?.some(r => r.includes('admin'))).length;
    this.pendingUsers = this.users.filter(u => !u.isActive).length;
  }

  onSearchInput(): void {
    this.currentPage = 0;
    this.loadUsers();
  }

  applyFilters(): void {
    this.currentPage = 0;
    this.loadUsers();
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.roleFilter = '';
    this.statusFilter = '';
    this.currentPage = 0;
    this.loadUsers();
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadUsers();
  }

  sortData(sort: Sort): void {
    this.sortColumn = sort.active;
    this.sortDirection = sort.direction;
    this.loadUsers();
  }

  // Selection methods
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.users.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.users.forEach(row => this.selection.select(row));
  }

  // Action methods
  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '700px',
      data: { mode: 'add' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        this.createUser(result.data);
      }
    });
  }

  viewUser(user: User): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '700px',
      data: { user, mode: 'view' },
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(() => {
      // View mode - no action needed
    });
  }

  editUser(user: User): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '700px',
      data: { user, mode: 'edit' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        this.updateUser(user.id, result.data);
      }
    });
  }

  manageRoles(user: User): void {
    // TODO: Implement role management dialog
    this.notificationService.showInfo(`Managing roles for: ${user.firstName} ${user.lastName}`);
  }

  resetPassword(user: User): void {
    // TODO: Implement password reset
    this.notificationService.showInfo(`Resetting password for: ${user.firstName} ${user.lastName}`);
  }

  toggleUserStatus(user: User): void {
    const newStatus = !user.isActive;
    const action = user.isActive ? 'deactivate' : 'activate';
    
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: `${action.charAt(0).toUpperCase() + action.slice(1)} User`,
        message: `Are you sure you want to ${action} the user "${user.firstName} ${user.lastName}"?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateUserStatus(user.id, newStatus);
      }
    });
  }

  deleteUser(user: User): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete User',
        message: `Are you sure you want to delete the user "${user.firstName} ${user.lastName}"? This action cannot be undone.`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.performDeleteUser(user.id);
      }
    });
  }

  exportUsers(): void {
    const filter = {
      search: this.searchTerm,
      role: this.roleFilter,
      status: this.statusFilter
    };

    this.userService.exportUsers(filter).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `users_export_${new Date().toISOString().split('T')[0]}.xlsx`;
        link.click();
        window.URL.revokeObjectURL(url);
        this.notificationService.showSuccess('Users exported successfully');
      },
      error: (error: any) => {
        console.error('Error exporting users:', error);
        this.notificationService.showError('Failed to export users');
      }
    });
  }

  bulkActions(): void {
    if (this.selection.hasValue()) {
      // TODO: Implement bulk actions
      this.notificationService.showInfo(`Bulk actions for ${this.selection.selected.length} users`);
    } else {
      this.notificationService.showWarning('Please select users for bulk actions');
    }
  }

  refreshData(): void {
    this.loadUsers();
    this.notificationService.showSuccess('Data refreshed');
  }

  // CRUD Operations
  createUser(userData: any): void {
    this.loading = true;
    this.userService.createUser(userData).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response: User) => {
        this.notificationService.showSuccess('User created successfully');
        this.loadUsers();
        this.loadStatistics();
      },
      error: (error: any) => {
        console.error('Error creating user:', error);
        this.notificationService.showError('Failed to create user');
        this.loading = false;
      }
    });
  }

  updateUser(id: string, userData: any): void {
    this.loading = true;
    this.userService.updateUser(id, userData).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response: User) => {
        this.notificationService.showSuccess('User updated successfully');
        this.loadUsers();
        this.loadStatistics();
      },
      error: (error: any) => {
        console.error('Error updating user:', error);
        this.notificationService.showError('Failed to update user');
        this.loading = false;
      }
    });
  }

  updateUserStatus(id: string, isActive: boolean): void {
    this.loading = true;
    
    const updateObservable = isActive ? 
      this.userService.activateUser(id) : 
      this.userService.deactivateUser(id);

    updateObservable.pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response: User) => {
        this.notificationService.showSuccess(`User ${isActive ? 'activated' : 'deactivated'} successfully`);
        this.loadUsers();
        this.loadStatistics();
      },
      error: (error: any) => {
        console.error('Error updating user status:', error);
        this.notificationService.showError('Failed to update user status');
        this.loading = false;
      }
    });
  }

  performDeleteUser(id: string): void {
    this.loading = true;
    this.userService.deleteUser(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: () => {
        this.notificationService.showSuccess('User deleted successfully');
        this.loadUsers();
        this.loadStatistics();
      },
      error: (error: any) => {
        console.error('Error deleting user:', error);
        this.notificationService.showError('Failed to delete user');
        this.loading = false;
      }
    });
  }

  getRoleColor(role: string): string {
    switch (role?.toLowerCase()) {
      case 'admin':
      case 'role_admin':
        return 'primary';
      case 'super_admin':
      case 'role_super_admin':
        return 'warn';
      case 'examiner':
      case 'role_examiner':
        return 'accent';
      case 'candidate':
      case 'role_candidate':
        return 'primary';
      case 'centre_manager':
      case 'role_centre_manager':
        return 'accent';
      default:
        return 'primary';
    }
  }

  getStatusColor(status: string): string {
    switch (status?.toLowerCase()) {
      case 'active': return 'primary';
      case 'inactive': return 'warn';
      case 'pending': return 'accent';
      case 'suspended': return 'warn';
      default: return 'primary';
    }
  }
}

// Selection model for table selection
class SelectionModel<T> {
  private _selection = new Set<T>();

  get selected(): T[] {
    return Array.from(this._selection);
  }

  select(item: T): void {
    this._selection.add(item);
  }

  deselect(item: T): void {
    this._selection.delete(item);
  }

  toggle(item: T): void {
    if (this.isSelected(item)) {
      this.deselect(item);
    } else {
      this.select(item);
    }
  }

  clear(): void {
    this._selection.clear();
  }

  isSelected(item: T): boolean {
    return this._selection.has(item);
  }

  hasValue(): boolean {
    return this._selection.size > 0;
  }
}
