import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() loading = false;
  @Input() elevation: 1 | 2 | 3 | 4 | 5 = 1;
  @Input() showHeader = true;
  @Input() showFooter = false;
  @Input() footerText?: string;
}
