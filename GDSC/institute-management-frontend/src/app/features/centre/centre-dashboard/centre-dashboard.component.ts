import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-centre-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="centre-dashboard">
      <h1>Centre Management Dashboard</h1>
      
      <div class="stats-grid">
        <div class="stat-card">
          <h3>Total Centres</h3>
          <p class="stat-number">12</p>
          <a routerLink="/centre/list" class="stat-link">View All Centres</a>
        </div>
        
        <div class="stat-card">
          <h3>Active Centres</h3>
          <p class="stat-number">10</p>
          <span class="stat-note">Currently operational</span>
        </div>
        
        <div class="stat-card">
          <h3>Total Capacity</h3>
          <p class="stat-number">1,250</p>
          <span class="stat-note">Students across all centres</span>
        </div>
        
        <div class="stat-card">
          <h3>Exams Today</h3>
          <p class="stat-number">8</p>
          <a routerLink="/centre/list" class="stat-link">View Schedule</a>
        </div>
      </div>
      
      <div class="centre-overview">
        <h2>Centre Overview</h2>
        <div class="centre-list">
          <div class="centre-item" *ngFor="let centre of centres">
            <div class="centre-info">
              <h4>{{ centre.name }}</h4>
              <p>{{ centre.location }}</p>
              <p>Capacity: {{ centre.capacity }} students</p>
              <p>Status: <span class="status" [class]="'status-' + centre.status">{{ centre.status }}</span></p>
            </div>
            <div class="centre-actions">
              <button class="btn-view" routerLink="/centre/detail/{{ centre.id }}">View Details</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .centre-dashboard {
      padding: 20px;
    }
    
    h1 {
      color: #2c3e50;
      margin-bottom: 30px;
      font-size: 2.5rem;
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 40px;
    }
    
    .stat-card {
      background: white;
      padding: 24px;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
    
    .stat-card h3 {
      color: #7f8c8d;
      margin-bottom: 10px;
      font-size: 1.1rem;
    }
    
    .stat-number {
      font-size: 3rem;
      font-weight: bold;
      color: #9b59b6;
      margin: 10px 0;
    }
    
    .stat-link {
      color: #9b59b6;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
    }
    
    .stat-link:hover {
      color: #8e44ad;
    }
    
    .stat-note {
      color: #7f8c8d;
      font-size: 0.9rem;
    }
    
    .centre-overview {
      background: white;
      padding: 24px;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    h2 {
      color: #2c3e50;
      margin-bottom: 20px;
      font-size: 1.8rem;
    }
    
    .centre-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .centre-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      border: 1px solid #eee;
      border-radius: 8px;
      transition: border-color 0.3s ease;
    }
    
    .centre-item:hover {
      border-color: #9b59b6;
    }
    
    .centre-info h4 {
      color: #2c3e50;
      margin: 0 0 8px 0;
      font-size: 1.2rem;
    }
    
    .centre-info p {
      color: #7f8c8d;
      margin: 4px 0;
      font-size: 0.9rem;
    }
    
    .status {
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: 500;
      text-transform: uppercase;
    }
    
    .status-active {
      background: #d5f4e6;
      color: #27ae60;
    }
    
    .status-inactive {
      background: #fadbd8;
      color: #e74c3c;
    }
    
    .btn-view {
      background: #9b59b6;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.3s ease;
    }
    
    .btn-view:hover {
      background: #8e44ad;
    }
    
    @media (max-width: 768px) {
      .stats-grid {
        grid-template-columns: 1fr;
      }
      
      .centre-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
      }
    }
  `]
})
export class CentreDashboardComponent {
  centres = [
    {
      id: 1,
      name: 'Main Campus',
      location: 'Downtown Area',
      capacity: 300,
      status: 'active'
    },
    {
      id: 2,
      name: 'North Branch',
      location: 'North District',
      capacity: 200,
      status: 'active'
    },
    {
      id: 3,
      name: 'South Campus',
      location: 'South Suburb',
      capacity: 250,
      status: 'active'
    },
    {
      id: 4,
      name: 'East Wing',
      location: 'East Quarter',
      capacity: 150,
      status: 'inactive'
    }
  ];
}
