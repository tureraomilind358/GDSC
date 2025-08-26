import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="about-container">
      <h1>About Institute Management System</h1>
      <p>We are dedicated to revolutionizing educational management through innovative technology solutions.</p>
      
      <div class="about-content">
        <div class="mission-section">
          <h2>Our Mission</h2>
          <p>To provide comprehensive, secure, and user-friendly solutions for educational institutions to manage their operations efficiently.</p>
        </div>
        
        <div class="features-section">
          <h2>Key Features</h2>
          <ul>
            <li>Multi-centre management</li>
            <li>Advanced exam scheduling</li>
            <li>Secure authentication</li>
            <li>Real-time reporting</li>
            <li>Certificate generation</li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .about-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    
    h1 {
      font-size: 2.5rem;
      color: #2c3e50;
      text-align: center;
      margin-bottom: 20px;
    }
    
    .about-container > p {
      font-size: 1.2rem;
      color: #7f8c8d;
      text-align: center;
      margin-bottom: 40px;
    }
    
    .about-content {
      display: grid;
      gap: 40px;
    }
    
    .mission-section, .features-section {
      background: white;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    h2 {
      color: #2c3e50;
      margin-bottom: 20px;
      font-size: 1.8rem;
    }
    
    p {
      color: #555;
      line-height: 1.6;
      font-size: 1.1rem;
    }
    
    ul {
      list-style: none;
      padding: 0;
    }
    
    li {
      padding: 10px 0;
      border-bottom: 1px solid #eee;
      color: #555;
      font-size: 1.1rem;
    }
    
    li:last-child {
      border-bottom: none;
    }
    
    li:before {
      content: "✓";
      color: #27ae60;
      font-weight: bold;
      margin-right: 10px;
    }
  `]
})
export class AboutComponent {}
