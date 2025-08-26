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
import { Subject, Observable, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs';
import { CentreService } from '../../../services/centre.service';
import { Centre } from '../../../shared/models/centre.model';
import { NotificationService } from '../../../core/services/notification.service';
import { CentreDialogComponent } from './centre-dialog.component';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-manage-centres',
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
    MatProgressSpinnerModule
  ],
  template: `
    <div class="manage-centres-container">
      <!-- Header Section -->
      <div class="header-section">
        <h1>Manage Centres</h1>
        <p>Create, edit, and manage examination centres</p>
      </div>

      <!-- Search and Filter Section -->
      <mat-card class="search-card">
        <mat-card-content>
          <div class="search-filters">
            <mat-form-field appearance="outline" class="search-field">
              <mat-label>Search Centres</mat-label>
              <input matInput 
                     [(ngModel)]="searchTerm" 
                     placeholder="Search by name, location, or code..."
                     (input)="onSearchInput()">
              <mat-icon matSuffix>search</mat-icon>
            </mat-form-field>

            <mat-form-field appearance="outline" class="filter-field">
              <mat-label>Status</mat-label>
              <mat-select [(ngModel)]="statusFilter">
                <mat-option value="">All Statuses</mat-option>
                <mat-option value="active">Active</mat-option>
                <mat-option value="inactive">Inactive</mat-option>
                <mat-option value="maintenance">Maintenance</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline" class="filter-field">
              <mat-label>Type</mat-label>
              <mat-select [(ngModel)]="typeFilter">
                <mat-option value="">All Types</mat-option>
                <mat-option value="examination">Examination</mat-option>
                <mat-option value="training">Training</mat-option>
                <mat-option value="both">Both</mat-option>
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
        <button mat-raised-button color="primary" (click)="openAddCentreDialog()">
          <mat-icon>add</mat-icon>
          Add New Centre
        </button>
        <button mat-stroked-button (click)="exportCentres()">
          <mat-icon>download</mat-icon>
          Export
        </button>
        <button mat-stroked-button (click)="refreshData()">
          <mat-icon>refresh</mat-icon>
          Refresh
        </button>
      </div>

      <!-- Centres Table -->
      <mat-card class="table-card">
        <mat-card-content>
          <div class="table-container">
            <table mat-table [dataSource]="centres" matSort (matSortChange)="sortData($event)">
              <!-- Centre Code Column -->
              <ng-container matColumnDef="code">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Centre Code </th>
                <td mat-cell *matCellDef="let centre"> {{centre.code}} </td>
              </ng-container>

              <!-- Name Column -->
              <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Name </th>
                <td mat-cell *matCellDef="let centre"> {{centre.name}} </td>
              </ng-container>

              <!-- Location Column -->
              <ng-container matColumnDef="location">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Location </th>
                <td mat-cell *matCellDef="let centre"> {{centre.location}} </td>
              </ng-container>

              <!-- Type Column -->
              <ng-container matColumnDef="type">
                <th mat-header-cell *matHeaderCellDef> Type </th>
                <td mat-cell *matCellDef="let centre">
                  <mat-chip [color]="getTypeColor(centre.type)" selected>
                    {{centre.type}}
                  </mat-chip>
                </td>
              </ng-container>

              <!-- Status Column -->
              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Status </th>
                <td mat-cell *matCellDef="let centre">
                  <mat-chip [color]="getStatusColor(centre.status)" selected>
                    {{centre.status}}
                  </mat-chip>
                </td>
              </ng-container>

              <!-- Capacity Column -->
              <ng-container matColumnDef="capacity">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Capacity </th>
                <td mat-cell *matCellDef="let centre"> {{centre.capacity}} </td>
              </ng-container>

              <!-- Actions Column -->
              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef> Actions </th>
                <td mat-cell *matCellDef="let centre">
                  <button mat-icon-button [matMenuTriggerFor]="menu" [matTooltip]="'More actions'">
                    <mat-icon>more_vert</mat-icon>
                  </button>
                  <mat-menu #menu="matMenu">
                    <button mat-menu-item (click)="viewCentre(centre)">
                      <mat-icon>visibility</mat-icon>
                      <span>View Details</span>
                    </button>
                    <button mat-menu-item (click)="editCentre(centre)">
                      <mat-icon>edit</mat-icon>
                      <span>Edit</span>
                    </button>
                    <button mat-menu-item (click)="toggleCentreStatus(centre)">
                      <mat-icon>{{centre.status === 'active' ? 'block' : 'check_circle'}}</mat-icon>
                      <span>{{centre.status === 'active' ? 'Deactivate' : 'Activate'}}</span>
                    </button>
                    <button mat-menu-item (click)="deleteCentre(centre)" class="delete-action">
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
              [length]="totalCentres"
              [pageSize]="pageSize"
              [pageSizeOptions]="[5, 10, 25, 50]"
              (page)="onPageChange($event)"
              showFirstLastButtons>
            </mat-paginator>

            <!-- Loading State -->
            <div *ngIf="loading" class="loading-container">
              <mat-spinner diameter="40"></mat-spinner>
              <p>Loading centres...</p>
            </div>

            <!-- Empty State -->
            <div *ngIf="!loading && centres.length === 0" class="empty-state">
              <mat-icon>business</mat-icon>
              <h3>No Centres Found</h3>
              <p>No centres match your current filters. Try adjusting your search criteria.</p>
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
              <mat-icon class="stat-icon">business</mat-icon>
              <div class="stat-details">
                <h3>{{totalCentres}}</h3>
                <p>Total Centres</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <mat-icon class="stat-icon">check_circle</mat-icon>
              <div class="stat-details">
                <h3>{{activeCentres}}</h3>
                <p>Active Centres</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <mat-icon class="stat-icon">pending</mat-icon>
              <div class="stat-details">
                <h3>{{pendingCentres}}</h3>
                <p>Pending Centres</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <mat-icon class="stat-icon">capacity</mat-icon>
              <div class="stat-details">
                <h3>{{totalCapacity}}</h3>
                <p>Total Capacity</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .manage-centres-container {
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

    .mat-column-actions {
      width: 80px;
      text-align: center;
    }

    .mat-column-code {
      width: 120px;
    }

    .mat-column-type,
    .mat-column-status {
      width: 120px;
    }

    .mat-column-capacity {
      width: 100px;
      text-align: center;
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
export class ManageCentresComponent implements OnInit, OnDestroy {
  centres: Centre[] = [];
  displayedColumns: string[] = ['code', 'name', 'location', 'type', 'status', 'capacity', 'actions'];
  
  // Pagination
  totalCentres = 0;
  pageSize = 10;
  currentPage = 0;
  
  // Search and filters
  searchTerm = '';
  statusFilter = '';
  typeFilter = '';
  
  // Sorting
  sortColumn = 'name';
  sortDirection = 'asc';
  
  // State
  loading = false;
  
  // Statistics
  activeCentres = 0;
  pendingCentres = 0;
  totalCapacity = 0;
  
  private destroy$ = new Subject<void>();

  constructor(
    private centreService: CentreService,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCentres();
    this.loadStatistics();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadCentres(): void {
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

    // Only add type filter if it's not empty
    if (this.typeFilter && this.typeFilter.trim()) {
      filter.type = this.typeFilter;
    }

    this.centreService.getCentres(filter)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.centres = response.centres || [];
          this.totalCentres = response.total || 0;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading centres:', error);
          this.notificationService.showError('Failed to load centres');
          this.loading = false;
        }
      });
  }

  loadStatistics(): void {
    // Calculate statistics from loaded centres
    this.activeCentres = this.centres.filter(c => c.status === 'active').length;
    this.pendingCentres = this.centres.filter(c => c.status === 'maintenance').length;
    this.totalCapacity = this.centres.reduce((sum, c) => sum + (c.capacity || 0), 0);
  }

  onSearchInput(): void {
    // Debounce search input
    this.currentPage = 0;
    this.loadCentres();
  }

  applyFilters(): void {
    this.currentPage = 0;
    this.loadCentres();
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.statusFilter = '';
    this.typeFilter = '';
    this.currentPage = 0;
    this.loadCentres();
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadCentres();
  }

  sortData(sort: Sort): void {
    this.sortColumn = sort.active;
    this.sortDirection = sort.direction;
    this.loadCentres();
  }

  openAddCentreDialog(): void {
    const dialogRef = this.dialog.open(CentreDialogComponent, {
      width: '600px',
      data: { mode: 'add' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        this.createCentre(result.data);
      }
    });
  }

  viewCentre(centre: Centre): void {
    const dialogRef = this.dialog.open(CentreDialogComponent, {
      width: '600px',
      data: { centre, mode: 'view' },
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(() => {
      // View mode - no action needed
    });
  }

  editCentre(centre: Centre): void {
    const dialogRef = this.dialog.open(CentreDialogComponent, {
      width: '600px',
      data: { centre, mode: 'edit' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        this.updateCentre(centre.id, result.data);
      }
    });
  }

  toggleCentreStatus(centre: Centre): void {
    const newStatus = centre.status === 'active' ? 'inactive' : 'active';
    const action = centre.status === 'active' ? 'deactivate' : 'activate';
    
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: `${action.charAt(0).toUpperCase() + action.slice(1)} Centre`,
        message: `Are you sure you want to ${action} the centre "${centre.name}"?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateCentreStatus(centre.id, newStatus);
      }
    });
  }

  deleteCentre(centre: Centre): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Centre',
        message: `Are you sure you want to delete the centre "${centre.name}"? This action cannot be undone.`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.performDeleteCentre(centre.id);
      }
    });
  }

  exportCentres(): void {
    const filter = {
      search: this.searchTerm,
      status: this.statusFilter,
      type: this.typeFilter
    };

    this.centreService.exportCentres(filter).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `centres_export_${new Date().toISOString().split('T')[0]}.xlsx`;
        link.click();
        window.URL.revokeObjectURL(url);
        this.notificationService.showSuccess('Centres exported successfully');
      },
      error: (error: any) => {
        console.error('Error exporting centres:', error);
        this.notificationService.showError('Failed to export centres');
      }
    });
  }

  refreshData(): void {
    this.loadCentres();
    this.loadStatistics();
    this.notificationService.showSuccess('Data refreshed');
  }

  // CRUD Operations
  createCentre(centreData: Partial<Centre>): void {
    this.loading = true;
    this.centreService.createCentre(centreData).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response: Centre) => {
        this.notificationService.showSuccess('Centre created successfully');
        this.loadCentres();
        this.loadStatistics();
      },
      error: (error: any) => {
        console.error('Error creating centre:', error);
        this.notificationService.showError('Failed to create centre');
        this.loading = false;
      }
    });
  }

  updateCentre(id: string, centreData: Partial<Centre>): void {
    this.loading = true;
    this.centreService.updateCentre(id, centreData).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response: Centre) => {
        this.notificationService.showSuccess('Centre updated successfully');
        this.loadCentres();
        this.loadStatistics();
      },
      error: (error: any) => {
        console.error('Error updating centre:', error);
        this.notificationService.showError('Failed to update centre');
        this.loading = false;
      }
    });
  }

  updateCentreStatus(id: string, status: 'active' | 'inactive' | 'maintenance'): void {
    this.loading = true;
    
    let updateObservable: Observable<Centre>;
    if (status === 'active') {
      updateObservable = this.centreService.activateCentre(id);
    } else if (status === 'inactive') {
      updateObservable = this.centreService.deactivateCentre(id);
    } else if (status === 'maintenance') {
      updateObservable = this.centreService.putCentreInMaintenance(id, 'Maintenance mode');
    } else {
      updateObservable = this.centreService.updateCentre(id, { status });
    }

    updateObservable.pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response: Centre) => {
        this.notificationService.showSuccess(`Centre status updated to ${status}`);
        this.loadCentres();
        this.loadStatistics();
      },
      error: (error: any) => {
        console.error('Error updating centre status:', error);
        this.notificationService.showError('Failed to update centre status');
        this.loading = false;
      }
    });
  }

  performDeleteCentre(id: string): void {
    this.loading = true;
    this.centreService.deleteCentre(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: () => {
        this.notificationService.showSuccess('Centre deleted successfully');
        this.loadCentres();
        this.loadStatistics();
      },
      error: (error: any) => {
        console.error('Error deleting centre:', error);
        this.notificationService.showError('Failed to delete centre');
        this.loading = false;
      }
    });
  }

  getTypeColor(type: string): string {
    switch (type?.toLowerCase()) {
      case 'examination': return 'primary';
      case 'training': return 'accent';
      case 'both': return 'warn';
      default: return 'primary';
    }
  }

  getStatusColor(status: string): string {
    switch (status?.toLowerCase()) {
      case 'active': return 'primary';
      case 'inactive': return 'warn';
      case 'pending': return 'accent';
      default: return 'primary';
    }
  }
}
