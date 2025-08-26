import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="faq-container">
      <h1>Frequently Asked Questions</h1>
      <p>Find answers to common questions about our Institute Management System.</p>
      
      <div class="faq-list">
        <div class="faq-item" *ngFor="let item of faqItems; let i = index">
          <div class="faq-question" (click)="toggleFaq(i)">
            <h3>{{ item.question }}</h3>
            <span class="toggle-icon">{{ item.isOpen ? '−' : '+' }}</span>
          </div>
          <div class="faq-answer" [class.open]="item.isOpen">
            <p>{{ item.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .faq-container {
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
    
    .faq-container > p {
      font-size: 1.2rem;
      color: #7f8c8d;
      text-align: center;
      margin-bottom: 40px;
    }
    
    .faq-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    
    .faq-item {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    
    .faq-question {
      padding: 20px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: background-color 0.3s ease;
    }
    
    .faq-question:hover {
      background-color: #f8f9fa;
    }
    
    .faq-question h3 {
      margin: 0;
      color: #2c3e50;
      font-size: 1.2rem;
      font-weight: 500;
    }
    
    .toggle-icon {
      font-size: 1.5rem;
      color: #3498db;
      font-weight: bold;
    }
    
    .faq-answer {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease;
      background-color: #f8f9fa;
    }
    
    .faq-answer.open {
      max-height: 200px;
    }
    
    .faq-answer p {
      margin: 0;
      padding: 20px;
      color: #555;
      line-height: 1.6;
      font-size: 1rem;
    }
  `]
})
export class FaqComponent {
  faqItems = [
    {
      question: 'How do I register for an account?',
      answer: 'You can register for an account by clicking the "Register" button in the navigation bar and filling out the registration form with your details.',
      isOpen: false
    },
    {
      question: 'What roles are available in the system?',
      answer: 'The system supports three main roles: Admin (manages centres, exams, and users), Examiner (schedules and conducts exams), and Candidate (takes exams and views results).',
      isOpen: false
    },
    {
      question: 'How do I schedule an exam?',
      answer: 'Examiners can schedule exams through their dashboard by navigating to the "Schedule Exam" section and filling out the exam details form.',
      isOpen: false
    },
    {
      question: 'Can I take exams from any device?',
      answer: 'Yes, the system is responsive and works on desktop, tablet, and mobile devices. However, we recommend using a desktop for the best exam experience.',
      isOpen: false
    },
    {
      question: 'How do I access my certificates?',
      answer: 'Candidates can access their certificates through the "Certificates" section in their dashboard after successfully completing exams.',
      isOpen: false
    }
  ];

  toggleFaq(index: number) {
    this.faqItems[index].isOpen = !this.faqItems[index].isOpen;
  }
}
