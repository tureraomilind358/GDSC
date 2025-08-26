import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="contact-container">
      <h1>Contact Us</h1>
      <p>Get in touch with us for any questions or support.</p>
      
      <div class="contact-content">
        <div class="contact-info">
          <h2>Contact Information</h2>
          <div class="info-item">
            <strong>Email:</strong> info&#64;institute.com
          </div>
          <div class="info-item">
            <strong>Phone:</strong> +1 234 567 890
          </div>
          <div class="info-item">
            <strong>Address:</strong> 123 Education Street, Learning City, LC 12345
          </div>
        </div>
        
        <div class="contact-form">
          <h2>Send us a Message</h2>
          <form (ngSubmit)="onSubmit()">
            <div class="form-group">
              <label for="name">Name</label>
              <input type="text" id="name" name="name" [(ngModel)]="contactForm.name" required>
            </div>
            
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" name="email" [(ngModel)]="contactForm.email" required>
            </div>
            
            <div class="form-group">
              <label for="message">Message</label>
              <textarea id="message" name="message" [(ngModel)]="contactForm.message" rows="5" required></textarea>
            </div>
            
            <button type="submit" class="btn-submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .contact-container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    
    h1 {
      font-size: 2.5rem;
      color: #2c3e50;
      text-align: center;
      margin-bottom: 20px;
    }
    
    .contact-container > p {
      font-size: 1.2rem;
      color: #7f8c8d;
      text-align: center;
      margin-bottom: 40px;
    }
    
    .contact-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
    }
    
    .contact-info, .contact-form {
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
    
    .info-item {
      padding: 15px 0;
      border-bottom: 1px solid #eee;
      color: #555;
      font-size: 1.1rem;
    }
    
    .info-item:last-child {
      border-bottom: none;
    }
    
    .form-group {
      margin-bottom: 20px;
    }
    
    label {
      display: block;
      margin-bottom: 5px;
      color: #2c3e50;
      font-weight: 500;
    }
    
    input, textarea {
      width: 100%;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 1rem;
      transition: border-color 0.3s ease;
    }
    
    input:focus, textarea:focus {
      outline: none;
      border-color: #3498db;
    }
    
    .btn-submit {
      background: #3498db;
      color: white;
      padding: 12px 24px;
      border: none;
      border-radius: 6px;
      font-size: 1rem;
      cursor: pointer;
      transition: background 0.3s ease;
    }
    
    .btn-submit:hover {
      background: #2980b9;
    }
    
    @media (max-width: 768px) {
      .contact-content {
        grid-template-columns: 1fr;
        gap: 20px;
      }
    }
  `]
})
export class ContactComponent {
  contactForm = {
    name: '',
    email: '',
    message: ''
  };

  onSubmit() {
    console.log('Contact form submitted:', this.contactForm);
    // Here you would typically send the form data to your backend
    alert('Thank you for your message! We will get back to you soon.');
    this.contactForm = { name: '', email: '', message: '' };
  }
}
