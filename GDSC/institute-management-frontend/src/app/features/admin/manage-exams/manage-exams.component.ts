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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Subject, takeUntil } from 'rxjs';
import { ExamService } from '../../../services/exam.service';
import { Exam } from '../../../shared/models/exam.model';
import { NotificationService } from '../../../core/services/notification.service';
import { ExamDialogComponent } from './exam-dialog.component';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-manage-exams',
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
    MatDatepickerModule,
    MatNativeDateModule
  ],
  template: `
    <div class="manage-exams-container">
      <!-- Header Section -->
      <div class="header-section">
        <h1>Manage Exams</h1>
        <p>Create, schedule, and manage examinations</p>
      </div>

      <!-- Search and Filter Section -->
      <mat-card class="search-card">
        <mat-card-content>
          <div class="search-filters">
            <mat-form-field appearance="outline" class="search-field">
              <mat-label>Search Exams</mat-label>
              <input matInput 
                     [(ngModel)]="searchTerm" 
                     placeholder="Search by title, course, or code..."
                     (input)="onSearchInput()">
              <mat-icon matSuffix>search</mat-icon>
            </mat-form-field>

            <mat-form-field appearance="outline" class="filter-field">
              <mat-label>Status</mat-label>
              <mat-select [(ngModel)]="statusFilter">
                <mat-option value="">All Statuses</mat-option>
                <mat-option value="draft">Draft</mat-option>
                <mat-option value="scheduled">Scheduled</mat-option>
                <mat-option value="active">Active</mat-option>
                <mat-option value="completed">Completed</mat-option>
                <mat-option value="cancelled">Cancelled</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline" class="filter-field">
              <mat-label>Course</mat-label>
              <mat-select [(ngModel)]="courseFilter">
                <mat-option value="">All Courses</mat-option>
                <mat-option *ngFor="let course of courses" [value]="course.id">
                  {{course.name}}
                </mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline" class="filter-field">
              <mat-label>Start Date</mat-label>
              <input matInput [matDatepicker]="startPicker" formControlName="startDate">
              <mat-datepicker-toggle matSuffix [for]="startPicker"></mat-datepicker-toggle>
              <mat-datepicker #startPicker></mat-datepicker>
            </mat-form-field>

            <mat-form-field appearance="outline" class="filter-field">
              <mat-label>End Date</mat-label>
              <input matInput [matDatepicker]="endPicker" formControlName="endDate">
              <mat-datepicker-toggle matSuffix [for]="endPicker"></mat-datepicker-toggle>
              <mat-datepicker #endPicker></mat-datepicker>
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
        <button mat-raised-button color="primary" (click)="openCreateExamDialog()">
          <mat-icon>add</mat-icon>
          Create New Exam
        </button>
        <button mat-stroked-button (click)="openQuestionBankDialog()">
          <mat-icon>quiz</mat-icon>
          Question Bank
        </button>
        <button mat-stroked-button (click)="exportExams()">
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

      <!-- Exams Table -->
      <mat-card class="table-card">
        <mat-card-content>
          <div class="table-container">
            <table mat-table [dataSource]="exams" matSort (matSortChange)="sortData($event)">
              <!-- Exam Code Column -->
              <ng-container matColumnDef="code">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Exam Code </th>
                <td mat-cell *matCellDef="let exam"> {{exam.code}} </td>
              </ng-container>

              <!-- Title Column -->
              <ng-container matColumnDef="title">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Title </th>
                <td mat-cell *matCellDef="let exam">
                  <div class="exam-info">
                    <div class="exam-title">{{exam.title}}</div>
                    <div class="exam-course">{{exam.course?.name || 'No Course'}}</div>
                  </div>
                </td>
              </ng-container>

              <!-- Duration Column -->
              <ng-container matColumnDef="duration">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Duration </th>
                <td mat-cell *matCellDef="let exam"> {{exam.duration}} min </td>
              </ng-container>

              <!-- Total Questions Column -->
              <ng-container matColumnDef="totalQuestions">
                <th mat-header-cell *matHeaderCellDef> Questions </th>
                <td mat-cell *matCellDef="let exam"> {{exam.totalQuestions || 0}} </td>
              </ng-container>

              <!-- Status Column -->
              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Status </th>
                <td mat-cell *matCellDef="let exam">
                  <mat-chip [color]="getStatusColor(exam.status)" selected>
                    {{exam.status}}
                  </mat-chip>
                </td>
              </ng-container>

              <!-- Scheduled Date Column -->
              <ng-container matColumnDef="scheduledDate">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Scheduled Date </th>
                <td mat-cell *matCellDef="let exam">
                  {{exam.scheduledDate ? (exam.scheduledDate | date:'medium') : 'Not Scheduled'}}
                </td>
              </ng-container>

              <!-- Actions Column -->
              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef> Actions </th>
                <td mat-cell *matCellDef="let exam">
                  <button mat-icon-button [matMenuTriggerFor]="menu" [matTooltip]="'More actions'">
                    <mat-icon>more_vert</mat-icon>
                  </button>
                  <mat-menu #menu="matMenu">
                    <button mat-menu-item (click)="viewExam(exam)">
                      <mat-icon>visibility</mat-icon>
                      <span>View Details</span>
                    </button>
                    <button mat-menu-item (click)="editExam(exam)">
                      <mat-icon>edit</mat-icon>
                      <span>Edit Exam</span>
                    </button>
                    <button mat-menu-item (click)="scheduleExam(exam)">
                      <mat-icon>schedule</mat-icon>
                      <span>Schedule</span>
                    </button>
                    <button mat-menu-item (click)="manageQuestions(exam)">
                      <mat-icon>quiz</mat-icon>
                      <span>Manage Questions</span>
                    </button>
                    <button mat-menu-item (click)="viewResults(exam)">
                      <mat-icon>analytics</mat-icon>
                      <span>View Results</span>
                    </button>
                    <button mat-menu-item (click)="duplicateExam(exam)">
                      <mat-icon>content_copy</mat-icon>
                      <span>Duplicate</span>
                    </button>
                    <button mat-menu-item (click)="deleteExam(exam)" class="delete-action">
                      <mat-icon>delete</mat-icon>
                      <span>Delete</span>
                    </button>
                  </mat-menu>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>

            <!-- Pagination -->
            <mat-paginator 
              [length]="totalExams"
              [pageSize]="pageSize"
              [pageSizeOptions]="[5, 10, 25, 50]"
              (page)="onPageChange($event)"
              showFirstLastButtons>
            </mat-paginator>

            <!-- Loading State -->
            <div *ngIf="loading" class="loading-container">
              <mat-spinner diameter="40"></mat-spinner>
              <p>Loading exams...</p>
            </div>

            <!-- Empty State -->
            <div *ngIf="!loading && exams.length === 0" class="empty-state">
              <mat-icon>quiz</mat-icon>
              <h3>No Exams Found</h3>
              <p>No exams match your current filters. Try adjusting your search criteria or create a new exam.</p>
              <button mat-raised-button color="primary" (click)="openCreateExamDialog()">
                Create First Exam
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
              <mat-icon class="stat-icon">quiz</mat-icon>
              <div class="stat-details">
                <h3>{{totalExams}}</h3>
                <p>Total Exams</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <mat-icon class="stat-icon">schedule</mat-icon>
              <div class="stat-details">
                <h3>{{scheduledExams}}</h3>
                <p>Scheduled Exams</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <mat-icon class="stat-icon">check_circle</mat-icon>
              <div class="stat-details">
                <h3>{{completedExams}}</h3>
                <p>Completed Exams</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <mat-icon class="stat-icon">pending</mat-icon>
              <div class="stat-details">
                <h3>{{draftExams}}</h3>
                <p>Draft Exams</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .manage-exams-container {
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

    .mat-column-code {
      width: 120px;
    }

    .mat-column-duration {
      width: 100px;
      text-align: center;
    }

    .mat-column-totalQuestions {
      width: 100px;
      text-align: center;
    }

    .mat-column-status {
      width: 120px;
    }

    .mat-column-scheduledDate {
      width: 180px;
    }

    .mat-column-actions {
      width: 80px;
      text-align: center;
    }

    .exam-info {
      display: flex;
      flex-direction: column;
    }

    .exam-title {
      font-weight: 500;
      color: #333;
    }

    .exam-course {
      font-size: 0.8rem;
      color: #666;
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
export class ManageExamsComponent implements OnInit, OnDestroy {
  exams: Exam[] = [];
  courses: any[] = [];
  displayedColumns: string[] = ['code', 'title', 'duration', 'totalQuestions', 'status', 'scheduledDate', 'actions'];
  
  // Pagination
  totalExams = 0;
  pageSize = 10;
  currentPage = 0;
  
  // Search and filters
  searchTerm = '';
  statusFilter = '';
  courseFilter = '';
  startDate: Date | null = null;
  endDate: Date | null = null;
  
  // Sorting
  sortColumn = 'title';
  sortDirection = 'asc';
  
  // State
  loading = false;
  
  // Statistics
  scheduledExams = 0;
  completedExams = 0;
  draftExams = 0;
  
  private destroy$ = new Subject<void>();

  constructor(
    private examService: ExamService,
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadExams();
    this.loadCourses();
    this.loadStatistics();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadExams(): void {
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

    // Only add status filter if it's not empty
    if (this.statusFilter && this.statusFilter.trim()) {
      filter.status = this.statusFilter;
    }

    // Only add course filter if it's not empty
    if (this.courseFilter && this.courseFilter.trim()) {
      filter.courseId = this.courseFilter;
    }

    // Only add date filters if they exist
    if (this.startDate) {
      filter.startDate = this.startDate;
    }

    if (this.endDate) {
      filter.endDate = this.endDate;
    }

    this.examService.getExams(filter)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.exams = response.exams || [];
          this.totalExams = response.total || 0;
          this.loading = false;
          this.loadStatistics();
        },
        error: (error) => {
          console.error('Error loading exams:', error);
          this.notificationService.showError('Failed to load exams');
          this.loading = false;
        }
      });
  }

  loadCourses(): void {
    // TODO: Load courses from course service
    this.courses = [
      { id: '1', name: 'Mathematics' },
      { id: '2', name: 'Physics' },
      { id: '3', name: 'Chemistry' }
    ];
  }

  loadStatistics(): void {
    // Calculate statistics from loaded exams
    this.scheduledExams = this.exams.filter(e => e.status === 'scheduled').length;
    this.completedExams = this.exams.filter(e => e.status === 'completed').length;
    this.draftExams = this.exams.filter(e => e.status === 'draft').length;
  }

  onSearchInput(): void {
    this.currentPage = 0;
    this.loadExams();
  }

  applyFilters(): void {
    this.currentPage = 0;
    this.loadExams();
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.statusFilter = '';
    this.courseFilter = '';
    this.startDate = null;
    this.endDate = null;
    this.currentPage = 0;
    this.loadExams();
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadExams();
  }

  sortData(sort: Sort): void {
    this.sortColumn = sort.active;
    this.sortDirection = sort.direction;
    this.loadExams();
  }

  // Action methods
  openCreateExamDialog(): void {
    const dialogRef = this.dialog.open(ExamDialogComponent, {
      width: '700px',
      data: { mode: 'add' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        this.createExam(result.data);
      }
    });
  }

  openQuestionBankDialog(): void {
    // TODO: Implement question bank dialog
    this.notificationService.showInfo('Question Bank functionality coming soon');
  }

  viewExam(exam: Exam): void {
    const dialogRef = this.dialog.open(ExamDialogComponent, {
      width: '700px',
      data: { exam, mode: 'view' },
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(() => {
      // View mode - no action needed
    });
  }

  editExam(exam: Exam): void {
    const dialogRef = this.dialog.open(ExamDialogComponent, {
      width: '700px',
      data: { exam, mode: 'edit' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        this.updateExam(exam.id, result.data);
      }
    });
  }

  scheduleExam(exam: Exam): void {
    // TODO: Implement schedule exam dialog
    this.notificationService.showInfo(`Scheduling exam: ${exam.title}`);
  }

  manageQuestions(exam: Exam): void {
    // TODO: Implement manage questions dialog
    this.notificationService.showInfo(`Managing questions for: ${exam.title}`);
  }

  viewResults(exam: Exam): void {
    // TODO: Implement view results dialog
    this.notificationService.showInfo(`Viewing results for: ${exam.title}`);
  }

  duplicateExam(exam: Exam): void {
    // TODO: Implement duplicate exam functionality
    this.notificationService.showInfo(`Duplicating exam: ${exam.title}`);
  }

  deleteExam(exam: Exam): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Exam',
        message: `Are you sure you want to delete the exam "${exam.title}"? This action cannot be undone.`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.performDeleteExam(exam.id);
      }
    });
  }

  exportExams(): void {
    const filter = {
      search: this.searchTerm,
      status: this.statusFilter,
      courseId: this.courseFilter,
      startDate: this.startDate,
      endDate: this.endDate
    };

    this.examService.exportExams(filter).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `exams_export_${new Date().toISOString().split('T')[0]}.xlsx`;
        link.click();
        window.URL.revokeObjectURL(url);
        this.notificationService.showSuccess('Exams exported successfully');
      },
      error: (error: any) => {
        console.error('Error exporting exams:', error);
        this.notificationService.showError('Failed to export exams');
      }
    });
  }

  bulkActions(): void {
    // TODO: Implement bulk actions
    this.notificationService.showInfo('Bulk actions functionality coming soon');
  }

  refreshData(): void {
    this.loadExams();
    this.notificationService.showSuccess('Data refreshed');
  }

  // CRUD Operations
  createExam(examData: any): void {
    this.loading = true;
    this.examService.createExam(examData).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response: Exam) => {
        this.notificationService.showSuccess('Exam created successfully');
        this.loadExams();
        this.loadStatistics();
      },
      error: (error: any) => {
        console.error('Error creating exam:', error);
        this.notificationService.showError('Failed to create exam');
        this.loading = false;
      }
    });
  }

  updateExam(id: string, examData: any): void {
    this.loading = true;
    this.examService.updateExam(id, examData).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response: Exam) => {
        this.notificationService.showSuccess('Exam updated successfully');
        this.loadExams();
        this.loadStatistics();
      },
      error: (error: any) => {
        console.error('Error updating exam:', error);
        this.notificationService.showError('Failed to update exam');
        this.loading = false;
      }
    });
  }

  performDeleteExam(id: string): void {
    this.loading = true;
    this.examService.deleteExam(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: () => {
        this.notificationService.showSuccess('Exam deleted successfully');
        this.loadExams();
        this.loadStatistics();
      },
      error: (error: any) => {
        console.error('Error deleting exam:', error);
        this.notificationService.showError('Failed to delete exam');
        this.loading = false;
      }
    });
  }

  getStatusColor(status: string): string {
    switch (status?.toLowerCase()) {
      case 'draft': return 'accent';
      case 'scheduled': return 'primary';
      case 'active': return 'primary';
      case 'completed': return 'primary';
      case 'cancelled': return 'warn';
      default: return 'primary';
    }
  }
}
