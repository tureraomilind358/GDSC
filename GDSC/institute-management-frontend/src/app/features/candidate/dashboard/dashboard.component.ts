import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-candidate-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="candidate-dashboard">
      <h1>Candidate Dashboard</h1>
      
      <div class="stats-grid">
        <div class="stat-card">
          <h3>Available Exams</h3>
          <p class="stat-number">3</p>
          <a routerLink="/candidate/exams" class="stat-link">View Exams</a>
        </div>
        
        <div class="stat-card">
          <h3>Completed Exams</h3>
          <p class="stat-number">8</p>
          <a routerLink="/candidate/results" class="stat-link">View Results</a>
        </div>
        
        <div class="stat-card">
          <h3>Certificates</h3>
          <p class="stat-number">5</p>
          <a routerLink="/candidate/certificates" class="stat-link">View Certificates</a>
        </div>
        
        <div class="stat-card">
          <h3>Average Score</h3>
          <p class="stat-number">85%</p>
          <span class="stat-note">Overall performance</span>
        </div>
      </div>
      
      <div class="upcoming-exams">
        <h2>Upcoming Exams</h2>
        <div class="exam-list">
          <div class="exam-item" *ngFor="let exam of upcomingExams">
            <div class="exam-info">
              <h4>{{ exam.title }}</h4>
              <p>{{ exam.date }} at {{ exam.time }}</p>
              <p>Duration: {{ exam.duration }} minutes</p>
            </div>
            <div class="exam-actions">
              <button class="btn-primary" routerLink="/candidate/take-exam">Start Exam</button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="recent-results">
        <h2>Recent Results</h2>
        <div class="result-list">
          <div class="result-item" *ngFor="let result of recentResults">
            <div class="result-info">
              <h4>{{ result.examTitle }}</h4>
              <p>Score: {{ result.score }}%</p>
              <p>Date: {{ result.date }}</p>
            </div>
            <div class="result-status" [class]="'status-' + result.status">
              {{ result.status }}
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .candidate-dashboard {
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
      color: #27ae60;
      margin: 10px 0;
    }
    
    .stat-link {
      color: #27ae60;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
    }
    
    .stat-link:hover {
      color: #229954;
    }
    
    .stat-note {
      color: #7f8c8d;
      font-size: 0.9rem;
    }
    
    .upcoming-exams, .recent-results {
      background: white;
      padding: 24px;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      margin-bottom: 30px;
    }
    
    h2 {
      color: #2c3e50;
      margin-bottom: 20px;
      font-size: 1.8rem;
    }
    
    .exam-list, .result-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .exam-item, .result-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      border: 1px solid #eee;
      border-radius: 8px;
      transition: border-color 0.3s ease;
    }
    
    .exam-item:hover, .result-item:hover {
      border-color: #27ae60;
    }
    
    .exam-info h4, .result-info h4 {
      color: #2c3e50;
      margin: 0 0 8px 0;
      font-size: 1.2rem;
    }
    
    .exam-info p, .result-info p {
      color: #7f8c8d;
      margin: 4px 0;
      font-size: 0.9rem;
    }
    
    .btn-primary {
      background: #27ae60;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.3s ease;
    }
    
    .btn-primary:hover {
      background: #229954;
    }
    
    .result-status {
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 500;
      text-transform: uppercase;
    }
    
    .status-passed {
      background: #d5f4e6;
      color: #27ae60;
    }
    
    .status-failed {
      background: #fadbd8;
      color: #e74c3c;
    }
    
    @media (max-width: 768px) {
      .stats-grid {
        grid-template-columns: 1fr;
      }
      
      .exam-item, .result-item {
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
      duration: 120
    },
    {
      title: 'Physics Midterm',
      date: '2024-01-16',
      time: '2:00 PM',
      duration: 90
    }
  ];

  recentResults = [
    {
      examTitle: 'Chemistry Lab Test',
      score: 92,
      date: '2024-01-10',
      status: 'passed'
    },
    {
      examTitle: 'English Literature',
      score: 78,
      date: '2024-01-08',
      status: 'passed'
    },
    {
      examTitle: 'Advanced Calculus',
      score: 65,
      date: '2024-01-05',
      status: 'failed'
    }
  ];
}
