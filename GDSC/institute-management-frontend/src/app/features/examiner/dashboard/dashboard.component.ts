import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-examiner-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="examiner-dashboard">
      <h1>Examiner Dashboard</h1>
      
      <div class="stats-grid">
        <div class="stat-card">
          <h3>Scheduled Exams</h3>
          <p class="stat-number">5</p>
          <a routerLink="/examiner/schedule" class="stat-link">Schedule New</a>
        </div>
        
        <div class="stat-card">
          <h3>Active Exams</h3>
          <p class="stat-number">2</p>
          <a routerLink="/examiner/invigilate" class="stat-link">Invigilate</a>
        </div>
        
        <div class="stat-card">
          <h3>Pending Evaluations</h3>
          <p class="stat-number">12</p>
          <a routerLink="/examiner/evaluate" class="stat-link">Evaluate</a>
        </div>
        
        <div class="stat-card">
          <h3>Completed Today</h3>
          <p class="stat-number">8</p>
          <span class="stat-note">Exams completed</span>
        </div>
      </div>
      
      <div class="upcoming-exams">
        <h2>Upcoming Exams</h2>
        <div class="exam-list">
          <div class="exam-item" *ngFor="let exam of upcomingExams">
            <div class="exam-info">
              <h4>{{ exam.title }}</h4>
              <p>{{ exam.date }} at {{ exam.time }}</p>
              <p>{{ exam.candidates }} candidates</p>
            </div>
            <div class="exam-actions">
              <button class="btn-primary" routerLink="/examiner/invigilate">Start</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .examiner-dashboard {
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
      color: #e67e22;
      margin: 10px 0;
    }
    
    .stat-link {
      color: #e67e22;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
    }
    
    .stat-link:hover {
      color: #d35400;
    }
    
    .stat-note {
      color: #7f8c8d;
      font-size: 0.9rem;
    }
    
    .upcoming-exams {
      background: white;
      padding: 24px;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .upcoming-exams h2 {
      color: #2c3e50;
      margin-bottom: 20px;
      font-size: 1.8rem;
    }
    
    .exam-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .exam-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      border: 1px solid #eee;
      border-radius: 8px;
      transition: border-color 0.3s ease;
    }
    
    .exam-item:hover {
      border-color: #e67e22;
    }
    
    .exam-info h4 {
      color: #2c3e50;
      margin: 0 0 8px 0;
      font-size: 1.2rem;
    }
    
    .exam-info p {
      color: #7f8c8d;
      margin: 4px 0;
      font-size: 0.9rem;
    }
    
    .btn-primary {
      background: #e67e22;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.3s ease;
    }
    
    .btn-primary:hover {
      background: #d35400;
    }
    
    @media (max-width: 768px) {
      .stats-grid {
        grid-template-columns: 1fr;
      }
      
      .exam-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
      }
    }
  `]
})
export class DashboardComponent {
  upcomingExams = [
    {
      title: 'Mathematics Final Exam',
      date: '2024-01-15',
      time: '10:00 AM',
      candidates: 25
    },
    {
      title: 'Physics Midterm',
      date: '2024-01-16',
      time: '2:00 PM',
      candidates: 18
    },
    {
      title: 'Chemistry Lab Test',
      date: '2024-01-17',
      time: '9:00 AM',
      candidates: 12
    }
  ];
}
