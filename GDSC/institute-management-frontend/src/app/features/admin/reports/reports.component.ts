import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { Subject, Observable, combineLatest, of } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged, switchMap, startWith, map } from 'rxjs/operators';

import { ReportService, ReportFilter, ReportConfig, ReportSchedule } from '../../../services/report.service';
import { CourseService } from '../../../services/course.service';
import { StudentService } from '../../../services/student.service';
import { CentreService } from '../../../services/centre.service';
import { UserService } from '../../../services/user.service';
import { NotificationService } from '../../../core/services/notification.service';
import { LoadingSpinnerComponent } from '../../../shared/loading-spinner/loading-spinner.component';
// ConfirmDialogComponent is used dynamically via MatDialog service in deleteScheduledReport() and deleteReportConfig() methods
// eslint-disable-next-line @angular-eslint/no-unused-imports, @typescript-eslint/no-unused-vars
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatChipsModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTabsModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatMenuModule,
    MatDividerModule,
    MatListModule,
    MatBadgeModule,
    MatAutocompleteModule,
    LoadingSpinnerComponent
  ],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  // Forms
  reportFilterForm!: FormGroup;
  scheduledReportForm!: FormGroup;

  // Data
  reportConfigs: ReportConfig[] = [];
  scheduledReports: any[] = [];
  reportHistory: any[] = [];
  courses: any[] = [];
  centres: any[] = [];
  users: any[] = [];

  // Table data
  displayedColumns: string[] = ['name', 'type', 'lastGenerated', 'status', 'actions'];
  dataSource: any[] = [];

  // Pagination
  totalItems = 0;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 50];
  currentPage = 0;

  // Loading states
  isLoading = false;
  isGeneratingReport = false;
  isSavingSchedule = false;

  // Filter options
  reportTypes = [
    { value: 'student', label: 'Student Reports' },
    { value: 'course', label: 'Course Reports' },
    { value: 'exam', label: 'Exam Reports' },
    { value: 'centre', label: 'Centre Reports' },
    { value: 'financial', label: 'Financial Reports' },
    { value: 'analytics', label: 'Analytics Reports' },
    { value: 'certificate', label: 'Certificate Reports' },
    { value: 'user', label: 'User Reports' },
    { value: 'dashboard', label: 'Dashboard Reports' }
  ];

  exportFormats = [
    { value: 'pdf', label: 'PDF', icon: 'picture_as_pdf' },
    { value: 'excel', label: 'Excel', icon: 'table_chart' },
    { value: 'csv', label: 'CSV', icon: 'grid_on' }
  ];

  scheduleFrequencies = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'yearly', label: 'Yearly' }
  ];

  constructor(
    private fb: FormBuilder,
    private reportService: ReportService,
    private courseService: CourseService,
    private studentService: StudentService,
    private centreService: CentreService,
    private userService: UserService,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {
    this.initializeForms();
  }

  ngOnInit(): void {
    this.loadInitialData();
    this.setupFormSubscriptions();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForms(): void {
    this.reportFilterForm = this.fb.group({
      reportType: [''],
      startDate: [null],
      endDate: [null],
      centreId: [''],
      courseId: [''],
      instructorId: [''],
      studentId: [''],
      format: ['pdf'],
      includeCharts: [true],
      includeTables: [true],
      includeSummary: [true]
    });

    this.scheduledReportForm = this.fb.group({
      name: [''],
      description: [''],
      reportType: [''],
      frequency: ['weekly'],
      time: ['09:00'],
      dayOfWeek: [1],
      dayOfMonth: [1],
      recipients: [[]],
      isActive: [true],
      parameters: this.fb.group({
        startDate: [null],
        endDate: [null],
        centreId: [''],
        courseId: [''],
        format: ['pdf']
      })
    });
  }

  private loadInitialData(): void {
    this.isLoading = true;
    
    combineLatest([
      this.reportService.getReportConfigs(),
      this.reportService.getScheduledReports(),
      this.reportService.getReportHistory(),
      this.courseService.getCourses(),
      this.centreService.getCentres(),
      this.userService.getUsers()
    ]).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: ([configs, scheduled, history, courses, centres, users]) => {
        this.reportConfigs = configs;
        this.scheduledReports = scheduled;
        this.reportHistory = history;
        this.courses = courses.courses || [];
        this.centres = centres.centres || [];
        this.users = users.users || [];
        this.dataSource = this.reportConfigs;
        this.totalItems = this.reportConfigs.length;
        this.isLoading = false;
      },
      error: (error) => {
        this.notificationService.showError('Failed to load report data');
        this.isLoading = false;
      }
    });
  }

  private setupFormSubscriptions(): void {
    // Auto-generate report when filter changes
    this.reportFilterForm.valueChanges.pipe(
      takeUntil(this.destroy$),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(filters => {
        if (filters.reportType) {
          return this.generateReportPreview(filters);
        }
        return of([]);
      })
    ).subscribe();

    // Update form based on report type selection
    this.reportFilterForm.get('reportType')?.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(reportType => {
      this.updateFormFields(reportType);
    });
  }

  private updateFormFields(reportType: string): void {
    const form = this.reportFilterForm;
    
    // Reset optional fields
    form.patchValue({
      centreId: '',
      courseId: '',
      instructorId: '',
      studentId: ''
    });

    // Enable/disable fields based on report type
    switch (reportType) {
      case 'student':
        form.get('studentId')?.enable();
        form.get('courseId')?.enable();
        break;
      case 'course':
        form.get('courseId')?.enable();
        form.get('instructorId')?.enable();
        break;
      case 'centre':
        form.get('centreId')?.enable();
        break;
      case 'exam':
        form.get('courseId')?.enable();
        break;
      default:
        // Enable all fields for other report types
        break;
    }
  }

  private generateReportPreview(filters: ReportFilter): Observable<any> {
    // This would generate a preview of the report
    return of([]);
  }

  // Report Generation
  generateReport(): void {
    if (this.reportFilterForm.invalid) {
      this.notificationService.showError('Please fill in all required fields');
      return;
    }

    const filters = this.reportFilterForm.value;
    this.isGeneratingReport = true;

    this.reportService.generateReport(filters.reportType, filters).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (blob) => {
        this.downloadReport(blob, `report_${filters.reportType}_${new Date().toISOString().split('T')[0]}.${filters.format}`);
        this.isGeneratingReport = false;
        this.notificationService.showSuccess('Report generated successfully');
      },
      error: (error) => {
        this.isGeneratingReport = false;
        this.notificationService.showError('Failed to generate report');
      }
    });
  }

  downloadReport(blob: Blob, filename: string): void {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  // Scheduled Reports
  createScheduledReport(): void {
    if (this.scheduledReportForm.invalid) {
      this.notificationService.showError('Please fill in all required fields');
      return;
    }

    const scheduleData = this.scheduledReportForm.value;
    this.isSavingSchedule = true;

    this.reportService.createScheduledReport(scheduleData, scheduleData.parameters).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (result) => {
        this.scheduledReports.push(result);
        this.isSavingSchedule = false;
        this.notificationService.showSuccess('Scheduled report created successfully');
        this.scheduledReportForm.reset();
      },
      error: (error) => {
        this.isSavingSchedule = false;
        this.notificationService.showError('Failed to create scheduled report');
      }
    });
  }

  deleteScheduledReport(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Scheduled Report',
        message: 'Are you sure you want to delete this scheduled report?'
      }
    });

    dialogRef.afterClosed().pipe(
      takeUntil(this.destroy$)
    ).subscribe(result => {
      if (result) {
        this.reportService.deleteScheduledReport(id).pipe(
          takeUntil(this.destroy$)
        ).subscribe({
          next: () => {
            this.scheduledReports = this.scheduledReports.filter(r => r.id !== id);
            this.notificationService.showSuccess('Scheduled report deleted successfully');
          },
          error: (error) => {
            this.notificationService.showError('Failed to delete scheduled report');
          }
        });
      }
    });
  }

  // Report Configurations
  createReportConfig(): void {
    // Implementation for creating new report configuration
  }

  editReportConfig(config: ReportConfig): void {
    // Implementation for editing report configuration
  }

  deleteReportConfig(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Report Configuration',
        message: 'Are you sure you want to delete this report configuration?'
      }
    });

    dialogRef.afterClosed().pipe(
      takeUntil(this.destroy$)
    ).subscribe(result => {
      if (result) {
        this.reportService.deleteReportConfig(id).pipe(
          takeUntil(this.destroy$)
        ).subscribe({
          next: () => {
            this.reportConfigs = this.reportConfigs.filter(c => c.id !== id);
            this.dataSource = this.reportConfigs;
            this.notificationService.showSuccess('Report configuration deleted successfully');
          },
          error: (error) => {
            this.notificationService.showError('Failed to delete report configuration');
          }
        });
      }
    });
  }

  // Table pagination and sorting
  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    // Implement pagination logic
  }

  onSortChange(sort: Sort): void {
    // Implement sorting logic
  }

  // Utility methods
  getReportTypeLabel(type: string): string {
    const reportType = this.reportTypes.find(rt => rt.value === type);
    return reportType ? reportType.label : type;
  }

  getFormatIcon(format: string): string {
    const formatInfo = this.exportFormats.find(f => f.value === format);
    return formatInfo ? formatInfo.icon : 'description';
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'active': return 'accent';
      case 'inactive': return 'warn';
      case 'error': return 'warn';
      default: return 'primary';
    }
  }

  // Quick report generation methods
  generateStudentReport(): void {
    this.reportFilterForm.patchValue({ reportType: 'student' });
    this.generateReport();
  }

  generateCourseReport(): void {
    this.reportFilterForm.patchValue({ reportType: 'course' });
    this.generateReport();
  }

  generateFinancialReport(): void {
    this.reportFilterForm.patchValue({ reportType: 'financial' });
    this.generateReport();
  }

  generateAnalyticsReport(): void {
    this.reportFilterForm.patchValue({ reportType: 'analytics' });
    this.generateReport();
  }
}
