import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="home-container">
      <h1>Welcome to Institute Management System</h1>
      <p>Your comprehensive solution for managing educational institutions, exams, and certifications.</p>
      
      <div class="features-grid">
        <div class="feature-card">
          <h3>Admin Dashboard</h3>
          <p>Manage centres, exams, users, and generate comprehensive reports.</p>
          <a routerLink="/admin/dashboard" class="btn-primary">Go to Admin</a>
        </div>
        
        <div class="feature-card">
          <h3>Examiner Portal</h3>
          <p>Schedule exams, invigilate, and evaluate student answers.</p>
          <a routerLink="/examiner/dashboard" class="btn-primary">Go to Examiner</a>
        </div>
        
        <div class="feature-card">
          <h3>Candidate Portal</h3>
          <p>Take exams, view results, and access your certificates.</p>
          <a routerLink="/candidate/dashboard" class="btn-primary">Go to Candidate</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
      text-align: center;
    }
    
    h1 {
      font-size: 2.5rem;
      color: #2c3e50;
      margin-bottom: 20px;
    }
    
    p {
      font-size: 1.2rem;
      color: #7f8c8d;
      margin-bottom: 40px;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }
    
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
      margin-top: 40px;
    }
    
    .feature-card {
      background: white;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
    }
    
    .feature-card:hover {
      transform: translateY(-5px);
    }
    
    .feature-card h3 {
      color: #2c3e50;
      margin-bottom: 15px;
      font-size: 1.5rem;
    }
    
    .feature-card p {
      color: #7f8c8d;
      margin-bottom: 20px;
      font-size: 1rem;
    }
    
    .btn-primary {
      display: inline-block;
      background: #3498db;
      color: white;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 6px;
      transition: background 0.3s ease;
    }
    
    .btn-primary:hover {
      background: #2980b9;
    }
    
    @media (max-width: 768px) {
      .home-container {
        padding: 20px;
      }
      
      h1 {
        font-size: 2rem;
      }
      
      .features-grid {
        grid-template-columns: 1fr;
        gap: 20px;
      }
    }
  `]
})
export class HomeComponent {}
