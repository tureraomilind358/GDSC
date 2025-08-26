import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSubject = new Subject<Notification>();
  public notifications$ = this.notificationsSubject.asObservable();

  private notificationCount = 0;

  success(title: string, message: string, duration: number = 5000): void {
    this.showNotification({
      id: this.generateId(),
      type: 'success',
      title,
      message,
      duration,
      timestamp: new Date()
    });
  }

  error(title: string, message: string, duration: number = 8000): void {
    this.showNotification({
      id: this.generateId(),
      type: 'error',
      title,
      message,
      duration,
      timestamp: new Date()
    });
  }

  warning(title: string, message: string, duration: number = 6000): void {
    this.showNotification({
      id: this.generateId(),
      type: 'warning',
      title,
      message,
      duration,
      timestamp: new Date()
    });
  }

  info(title: string, message: string, duration: number = 4000): void {
    this.showNotification({
      id: this.generateId(),
      type: 'info',
      title,
      message,
      duration,
      timestamp: new Date()
    });
  }

  private showNotification(notification: Notification): void {
    this.notificationsSubject.next(notification);
    
    // Auto-remove notification after duration
    if (notification.duration) {
      setTimeout(() => {
        this.removeNotification(notification.id);
      }, notification.duration);
    }
  }

  removeNotification(id: string): void {
    // Implementation for removing specific notification
    // This would typically emit a removal event
  }

  private generateId(): string {
    return `notification_${++this.notificationCount}_${Date.now()}`;
  }

  // Toast methods for quick notifications
  showToast(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info'): void {
    this[type]('', message, 3000);
  }

  // Alert methods for user confirmation
  confirm(message: string, title: string = 'Confirm'): Promise<boolean> {
    return new Promise((resolve) => {
      const result = window.confirm(`${title}: ${message}`);
      resolve(result);
    });
  }

  alert(message: string, title: string = 'Alert'): void {
    window.alert(`${title}: ${message}`);
  }
}
