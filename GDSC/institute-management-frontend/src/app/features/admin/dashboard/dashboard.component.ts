import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
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
import { MatGridListModule } from '@angular/material/grid-list';

import { Subject, Observable, combineLatest, interval, of } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged, switchMap, startWith, map } from 'rxjs/operators';

import { CourseService } from '../../../services/course.service';
import { StudentService } from '../../../services/student.service';
import { ExamService } from '../../../services/exam.service';
import { CentreService } from '../../../services/centre.service';
import { UserService } from '../../../services/user.service';
import { ReportService } from '../../../services/report.service';
import { NotificationService } from '../../../core/services/notification.service';
import { ApiService } from '../../../core/services/api.service';
import { LoadingSpinnerComponent } from '../../../shared/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
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
    MatGridListModule,
    LoadingSpinnerComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  // Forms
  filterForm!: FormGroup;

  // Data
  courses: any[] = [];
  students: any[] = [];
  exams: any[] = [];
  centres: any[] = [];
  users: any[] = [];
  recentActivities: any[] = [];
  notifications: any[] = [];

  // Statistics
  stats = {
    totalStudents: 0,
    totalCourses: 0,
    totalExams: 0,
    totalCentres: 0,
    totalUsers: 0,
    activeEnrollments: 0,
    completedExams: 0,
    totalRevenue: 0,
    monthlyGrowth: 0,
    averageGrade: 0,
    passRate: 0,
    attendanceRate: 0
  };

  // Charts data
  enrollmentTrends: any[] = [];
  revenueData: any[] = [];
  performanceData: any[] = [];
  courseDistribution: any[] = [];

  // Table data
  displayedColumns: string[] = ['name', 'type', 'status', 'date', 'actions'];
  recentActivitiesDataSource: any[] = [];

  // Loading states
  isLoading = false;
  isRefreshing = false;

  // Filter options
  timeRanges = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private studentService: StudentService,
    private examService: ExamService,
    private centreService: CentreService,
    private userService: UserService,
    private reportService: ReportService,
    private notificationService: NotificationService,
    private apiService: ApiService,
    private dialog: MatDialog
  ) {
    this.initializeForms();
  }

  ngOnInit(): void {
    this.loadDashboardData();
    this.setupRealTimeUpdates();
    this.setupFormSubscriptions();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForms(): void {
    this.filterForm = this.fb.group({
      timeRange: ['month'],
      centreId: [''],
      courseId: [''],
      startDate: [null],
      endDate: [null]
    });
  }

  private loadDashboardData(): void {
    this.isLoading = true;
    
    // Call real API endpoints
    combineLatest([
      this.courseService.getCourses(),
      this.studentService.getStudents(),
      this.examService.getExams(),
      this.centreService.getCentres(),
      this.userService.getUsers(),
      this.loadStatistics(),
      this.loadRecentActivities(),
      this.loadNotifications()
    ]).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: ([courses, students, exams, centres, users, stats, activities, notifications]) => {
        // console.log('API Response - Courses:', courses);
        // console.log('API Response - Students:', students);
        // console.log('API Response - Exams:', exams);
        // console.log('API Response - Centres:', centres);
        // console.log('API Response - Users:', users);
        
        this.courses = courses.courses || [];
        this.students = students.students || [];
        this.exams = exams.exams || [];
        this.centres = centres.centres || [];
        this.users = users.users || [];
        this.stats = stats;
        this.recentActivities = activities;
        this.notifications = notifications;
        this.recentActivitiesDataSource = activities;
        this.generateChartData();
        this.isLoading = false;
        
        this.notificationService.showSuccess('Dashboard data loaded successfully');
      },
      error: (error) => {
        console.error('Error loading dashboard data:', error);
        this.notificationService.showError('Failed to load dashboard data. Using mock data instead.');
        // Fallback to mock data if API fails
        this.loadMockData();
      }
    });
  }

  private loadMockData(): void {
    // Mock data for development
    console.log('Loading mock data for admin dashboard');
    this.notificationService.showInfo('Using mock data - Backend API not available');
    
    this.courses = [
      { id: '1', name: 'Advanced Mathematics', code: 'MATH101', description: 'Advanced mathematics course', status: 'active' },
      { id: '2', name: 'Physics Fundamentals', code: 'PHYS101', description: 'Basic physics course', status: 'active' },
      { id: '3', name: 'Computer Science', code: 'CS101', description: 'Introduction to computer science', status: 'active' }
    ];

    this.students = [
      { id: '1', firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', status: 'active' },
      { id: '2', firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', status: 'active' },
      { id: '3', firstName: 'Bob', lastName: 'Johnson', email: 'bob.johnson@example.com', status: 'active' }
    ];

    this.exams = [
      { id: '1', name: 'Mathematics Final', courseId: '1', date: new Date(), status: 'scheduled' },
      { id: '2', name: 'Physics Midterm', courseId: '2', date: new Date(), status: 'completed' },
      { id: '3', name: 'CS Programming Test', courseId: '3', date: new Date(), status: 'scheduled' }
    ];

    this.centres = [
      { id: '1', name: 'Main Campus', code: 'MC001', status: 'active', capacity: 500, currentEnrollment: 350 },
      { id: '2', name: 'North Branch', code: 'NB002', status: 'active', capacity: 300, currentEnrollment: 200 },
      { id: '3', name: 'South Campus', code: 'SC003', status: 'active', capacity: 400, currentEnrollment: 280 }
    ];

    this.users = [
      { id: '1', firstName: 'Admin', lastName: 'User', email: 'admin@example.com', roles: ['admin'], status: 'active' },
      { id: '2', firstName: 'Teacher', lastName: 'One', email: 'teacher1@example.com', roles: ['instructor'], status: 'active' },
      { id: '3', firstName: 'Coordinator', lastName: 'Manager', email: 'coordinator@example.com', roles: ['coordinator'], status: 'active' }
    ];

    this.stats = {
      totalStudents: 1250,
      totalCourses: 45,
      totalExams: 180,
      totalCentres: 8,
      totalUsers: 156,
      activeEnrollments: 890,
      completedExams: 156,
      totalRevenue: 125000,
      monthlyGrowth: 12.5,
      averageGrade: 78.5,
      passRate: 85.2,
      attendanceRate: 92.1
    };

    this.recentActivities = [
      {
        id: '1',
        name: 'New Student Registration',
        type: 'student',
        status: 'completed',
        date: new Date(),
        description: 'John Doe registered for Advanced Mathematics course'
      },
      {
        id: '2',
        name: 'Exam Completed',
        type: 'exam',
        status: 'completed',
        date: new Date(Date.now() - 3600000),
        description: 'Final exam completed for Physics 101'
      },
      {
        id: '3',
        name: 'Course Enrollment',
        type: 'course',
        status: 'active',
        date: new Date(Date.now() - 7200000),
        description: '15 students enrolled in Chemistry 201'
      },
      {
        id: '4',
        name: 'Certificate Generated',
        type: 'certificate',
        status: 'completed',
        date: new Date(Date.now() - 10800000),
        description: 'Certificate generated for Computer Science graduates'
      }
    ];

    this.notifications = [
      {
        id: '1',
        title: 'System Maintenance',
        message: 'Scheduled maintenance on Sunday at 2 AM',
        type: 'warning',
        date: new Date(),
        isRead: false
      },
      {
        id: '2',
        title: 'New Course Available',
        message: 'Advanced Data Science course is now available',
        type: 'info',
        date: new Date(Date.now() - 3600000),
        isRead: true
      },
      {
        id: '3',
        title: 'Exam Results Ready',
        message: 'Results for Mathematics 101 are now available',
        type: 'success',
        date: new Date(Date.now() - 7200000),
        isRead: false
      }
    ];

    this.recentActivitiesDataSource = this.recentActivities;
    this.generateChartData();
    this.isLoading = false;
  }

  private loadStatistics(): Observable<any> {
    // This would typically come from a dedicated statistics service
    return of({
      totalStudents: 1250,
      totalCourses: 45,
      totalExams: 180,
      totalCentres: 8,
      totalUsers: 156,
      activeEnrollments: 890,
      completedExams: 156,
      totalRevenue: 125000,
      monthlyGrowth: 12.5,
      averageGrade: 78.5,
      passRate: 85.2,
      attendanceRate: 92.1
    });
  }

  private loadRecentActivities(): Observable<any[]> {
    // This would typically come from an activity service
    return of([
      {
        id: '1',
        name: 'New Student Registration',
        type: 'student',
        status: 'completed',
        date: new Date(),
        description: 'John Doe registered for Advanced Mathematics course'
      },
      {
        id: '2',
        name: 'Exam Completed',
        type: 'exam',
        status: 'completed',
        date: new Date(Date.now() - 3600000),
        description: 'Final exam completed for Physics 101'
      },
      {
        id: '3',
        name: 'Course Enrollment',
        type: 'course',
        status: 'active',
        date: new Date(Date.now() - 7200000),
        description: '15 students enrolled in Chemistry 201'
      },
      {
        id: '4',
        name: 'Certificate Generated',
        type: 'certificate',
        status: 'completed',
        date: new Date(Date.now() - 10800000),
        description: 'Certificate generated for Computer Science graduates'
      }
    ]);
  }

  private loadNotifications(): Observable<any[]> {
    // This would typically come from a notification service
    return of([
      {
        id: '1',
        title: 'System Maintenance',
        message: 'Scheduled maintenance on Sunday at 2 AM',
        type: 'warning',
        date: new Date(),
        isRead: false
      },
      {
        id: '2',
        title: 'New Course Available',
        message: 'Advanced Data Science course is now available',
        type: 'info',
        date: new Date(Date.now() - 3600000),
        isRead: true
      },
      {
        id: '3',
        title: 'Exam Results Ready',
        message: 'Results for Mathematics 101 are now available',
        type: 'success',
        date: new Date(Date.now() - 7200000),
        isRead: false
      }
    ]);
  }

  private setupRealTimeUpdates(): void {
    // Set up real-time updates every 30 seconds
    interval(30000).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.refreshData();
    });
  }

  private setupFormSubscriptions(): void {
    this.filterForm.valueChanges.pipe(
      takeUntil(this.destroy$),
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(filters => {
      this.applyFilters(filters);
    });
  }

  private applyFilters(filters: any): void {
    // Apply filters to dashboard data
    this.isRefreshing = true;
    
    // This would typically filter the data based on the selected criteria
    setTimeout(() => {
      this.isRefreshing = false;
    }, 1000);
  }

  private generateChartData(): void {
    // Generate sample chart data
    this.enrollmentTrends = [
      { month: 'Jan', enrollments: 120 },
      { month: 'Feb', enrollments: 150 },
      { month: 'Mar', enrollments: 180 },
      { month: 'Apr', enrollments: 200 },
      { month: 'May', enrollments: 220 },
      { month: 'Jun', enrollments: 250 }
    ];

    this.revenueData = [
      { month: 'Jan', revenue: 15000 },
      { month: 'Feb', revenue: 18000 },
      { month: 'Mar', revenue: 22000 },
      { month: 'Apr', revenue: 25000 },
      { month: 'May', revenue: 28000 },
      { month: 'Jun', revenue: 32000 }
    ];

    this.performanceData = [
      { course: 'Mathematics', average: 85 },
      { course: 'Physics', average: 78 },
      { course: 'Chemistry', average: 82 },
      { course: 'Biology', average: 88 },
      { course: 'Computer Science', average: 90 }
    ];

    this.courseDistribution = [
      { course: 'Mathematics', students: 150 },
      { course: 'Physics', students: 120 },
      { course: 'Chemistry', students: 100 },
      { course: 'Biology', students: 80 },
      { course: 'Computer Science', students: 200 }
    ];
  }

  // Public methods
  refreshData(): void {
    this.isRefreshing = true;
    this.loadDashboardData();
  }

  exportDashboardReport(): void {
    const filters = this.filterForm.value;
    this.reportService.generateDashboardReport('executive-summary', filters).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (blob) => {
        this.downloadReport(blob, `dashboard_report_${new Date().toISOString().split('T')[0]}.pdf`);
        this.notificationService.showSuccess('Dashboard report exported successfully');
      },
      error: (error) => {
        this.notificationService.showError('Failed to export dashboard report');
      }
    });
  }

  private downloadReport(blob: Blob, filename: string): void {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  viewActivityDetails(activity: any): void {
    // Implementation for viewing activity details
    console.log('Viewing activity details:', activity);
  }

  markNotificationAsRead(notification: any): void {
    notification.isRead = true;
    // This would typically call a service to update the notification status
  }

  getActivityIcon(type: string): string {
    switch (type) {
      case 'student': return 'person_add';
      case 'exam': return 'quiz';
      case 'course': return 'school';
      case 'certificate': return 'card_membership';
      default: return 'info';
    }
  }

  getActivityColor(type: string): string {
    switch (type) {
      case 'student': return 'primary';
      case 'exam': return 'accent';
      case 'course': return 'warn';
      case 'certificate': return 'success';
      default: return 'primary';
    }
  }

  getNotificationIcon(type: string): string {
    switch (type) {
      case 'warning': return 'warning';
      case 'info': return 'info';
      case 'success': return 'check_circle';
      case 'error': return 'error';
      default: return 'notifications';
    }
  }

  getNotificationColor(type: string): string {
    switch (type) {
      case 'warning': return 'warn';
      case 'info': return 'primary';
      case 'success': return 'accent';
      case 'error': return 'warn';
      default: return 'primary';
    }
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  formatPercentage(value: number): string {
    return `${value.toFixed(1)}%`;
  }

  getGrowthIcon(growth: number): string {
    return growth >= 0 ? 'trending_up' : 'trending_down';
  }

  getGrowthColor(growth: number): string {
    return growth >= 0 ? 'success' : 'warn';
  }

  // Quick actions
  addNewStudent(): void {
    // Implementation for adding new student
    console.log('Adding new student');
  }

  createNewCourse(): void {
    // Implementation for creating new course
    console.log('Creating new course');
  }

  scheduleExam(): void {
    // Implementation for scheduling exam
    console.log('Scheduling exam');
  }

  generateReport(): void {
    // Implementation for generating report
    console.log('Generating report');
  }

  // Test API calls method
  testApiCalls(): void {
    console.log('=== Testing API Calls ===');
    
    // Test centres API
    this.centreService.getCentres().subscribe({
      next: (response) => {
        console.log('✅ Centres API call successful:', response);
        this.notificationService.showSuccess('Centres API call successful');
      },
      error: (error) => {
        console.error('❌ Centres API call failed:', error);
        this.notificationService.showError('Centres API call failed: ' + error.message);
      }
    });

    // Test users API
    this.userService.getUsers().subscribe({
      next: (response) => {
        console.log('✅ Users API call successful:', response);
        this.notificationService.showSuccess('Users API call successful');
      },
      error: (error) => {
        console.error('❌ Users API call failed:', error);
        this.notificationService.showError('Users API call failed: ' + error.message);
      }
    });

    // Test API health check
    this.apiService.healthCheck().subscribe({
      next: (response) => {
        console.log('✅ API Health check successful:', response);
        this.notificationService.showSuccess('API Health check successful');
      },
      error: (error) => {
        console.error('❌ API Health check failed:', error);
        this.notificationService.showError('API Health check failed: ' + error.message);
      }
    });
  }

  // Add missing methods for template
  get Math() {
    return Math;
  }

  getColorForItem(item: any): string {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'];
    // Use a hash of the item name to get a consistent color
    const hash = this.hashCode(item.course || item.name || item.id || 'default');
    return colors[Math.abs(hash) % colors.length];
  }

  private hashCode(str: string): number {
    let hash = 0;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  }
}
