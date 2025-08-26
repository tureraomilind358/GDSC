import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="unauthorized-container">
      <div class="error-content">
        <h1>403</h1>
        <h2>Access Denied</h2>
        <p>You don't have permission to access this resource.</p>
        <a routerLink="/home" class="btn-home">Go to Home</a>
      </div>
    </div>
  `,
  styles: [`
    .unauthorized-container {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 60vh;
      text-align: center;
    }
    
    .error-content h1 {
      font-size: 6rem;
      color: #e74c3c;
      margin: 0;
      font-weight: bold;
    }
    
    .error-content h2 {
      font-size: 2rem;
      color: #2c3e50;
      margin: 20px 0;
    }
    
    .error-content p {
      font-size: 1.2rem;
      color: #7f8c8d;
      margin-bottom: 30px;
    }
    
    .btn-home {
      display: inline-block;
      background: #3498db;
      color: white;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 6px;
      transition: background 0.3s ease;
    }
    
    .btn-home:hover {
      background: #2980b9;
    }
  `]
})
export class UnauthorizedComponent {}
