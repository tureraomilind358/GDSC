import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-certification-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="certification-list">
      <h1>Certification Management</h1>
      
      <div class="actions-bar">
        <button class="btn-generate" routerLink="/certification/generate">Generate New Certificate</button>
        <button class="btn-verify" routerLink="/certification/verify">Verify Certificate</button>
      </div>
      
      <div class="stats-grid">
        <div class="stat-card">
          <h3>Total Certificates</h3>
          <p class="stat-number">156</p>
          <span class="stat-note">Issued this year</span>
        </div>
        
        <div class="stat-card">
          <h3>Pending Verification</h3>
          <p class="stat-number">12</p>
          <span class="stat-note">Awaiting approval</span>
        </div>
        
        <div class="stat-card">
          <h3>Verified Today</h3>
          <p class="stat-number">8</p>
          <span class="stat-note">Successfully verified</span>
        </div>
        
        <div class="stat-card">
          <h3>Success Rate</h3>
          <p class="stat-number">98.5%</p>
          <span class="stat-note">Verification accuracy</span>
        </div>
      </div>
      
      <div class="certificate-overview">
        <h2>Recent Certificates</h2>
        <div class="certificate-list">
          <div class="certificate-item" *ngFor="let cert of certificates">
            <div class="certificate-info">
              <h4>{{ cert.title }}</h4>
              <p>Issued to: {{ cert.recipient }}</p>
              <p>Issue Date: {{ cert.issueDate }}</p>
              <p>Status: <span class="status" [class]="'status-' + cert.status">{{ cert.status }}</span></p>
            </div>
            <div class="certificate-actions">
              <button class="btn-view">View</button>
              <button class="btn-download">Download</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .certification-list {
      padding: 20px;
    }
    
    h1 {
      color: #2c3e50;
      margin-bottom: 30px;
      font-size: 2.5rem;
    }
    
    .actions-bar {
      display: flex;
      gap: 16px;
      margin-bottom: 30px;
    }
    
    .btn-generate, .btn-verify {
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .btn-generate {
      background: #27ae60;
      color: white;
    }
    
    .btn-generate:hover {
      background: #229954;
    }
    
    .btn-verify {
      background: #3498db;
      color: white;
    }
    
    .btn-verify:hover {
      background: #2980b9;
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
      color: #f39c12;
      margin: 10px 0;
    }
    
    .stat-note {
      color: #7f8c8d;
      font-size: 0.9rem;
    }
    
    .certificate-overview {
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
    
    .certificate-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .certificate-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      border: 1px solid #eee;
      border-radius: 8px;
      transition: border-color 0.3s ease;
    }
    
    .certificate-item:hover {
      border-color: #f39c12;
    }
    
    .certificate-info h4 {
      color: #2c3e50;
      margin: 0 0 8px 0;
      font-size: 1.2rem;
    }
    
    .certificate-info p {
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
    
    .status-verified {
      background: #d5f4e6;
      color: #27ae60;
    }
    
    .status-pending {
      background: #fef9e7;
      color: #f39c12;
    }
    
    .status-expired {
      background: #fadbd8;
      color: #e74c3c;
    }
    
    .certificate-actions {
      display: flex;
      gap: 12px;
    }
    
    .btn-view, .btn-download {
      padding: 8px 16px;
      border: none;
      border-radius: 6px;
      font-size: 0.9rem;
      cursor: pointer;
      transition: background 0.3s ease;
    }
    
    .btn-view {
      background: #3498db;
      color: white;
    }
    
    .btn-view:hover {
      background: #2980b9;
    }
    
    .btn-download {
      background: #27ae60;
      color: white;
    }
    
    .btn-download:hover {
      background: #229954;
    }
    
    @media (max-width: 768px) {
      .actions-bar {
        flex-direction: column;
      }
      
      .stats-grid {
        grid-template-columns: 1fr;
      }
      
      .certificate-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
      }
      
      .certificate-actions {
        width: 100%;
        justify-content: space-between;
      }
    }
  `]
})
export class CertificationListComponent {
  certificates = [
    {
      title: 'Advanced Mathematics Certificate',
      recipient: 'John Doe',
      issueDate: '2024-01-10',
      status: 'verified'
    },
    {
      title: 'Physics Laboratory Certification',
      recipient: 'Jane Smith',
      issueDate: '2024-01-12',
      status: 'pending'
    },
    {
      title: 'Chemistry Safety Training',
      recipient: 'Mike Johnson',
      issueDate: '2024-01-08',
      status: 'verified'
    },
    {
      title: 'Computer Science Fundamentals',
      recipient: 'Sarah Wilson',
      issueDate: '2023-12-15',
      status: 'expired'
    }
  ];
}
