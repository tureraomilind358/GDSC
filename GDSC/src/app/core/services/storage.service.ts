import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly PREFIX = 'ims_';

  setItem(key: string, value: any): void {
    const prefixedKey = this.PREFIX + key;
    try {
      if (typeof value === 'string') {
        localStorage.setItem(prefixedKey, value);
      } else {
        localStorage.setItem(prefixedKey, JSON.stringify(value));
      }
    } catch (error) {
      console.error('Error saving to localStorage', error);
    }
  }

  getItem(key: string): any {
    const prefixedKey = this.PREFIX + key;
    try {
      const item = localStorage.getItem(prefixedKey);
      if (item === null) return null;
      
      try {
        return JSON.parse(item);
      } catch {
        return item;
      }
    } catch (error) {
      console.error('Error reading from localStorage', error);
      return null;
    }
  }

  removeItem(key: string): void {
    const prefixedKey = this.PREFIX + key;
    try {
      localStorage.removeItem(prefixedKey);
    } catch (error) {
      console.error('Error removing from localStorage', error);
    }
  }

  clear(): void {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.PREFIX)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Error clearing localStorage', error);
    }
  }

  // Session Storage methods
  setSessionItem(key: string, value: any): void {
    const prefixedKey = this.PREFIX + key;
    try {
      if (typeof value === 'string') {
        sessionStorage.setItem(prefixedKey, value);
      } else {
        sessionStorage.setItem(prefixedKey, JSON.stringify(value));
      }
    } catch (error) {
      console.error('Error saving to sessionStorage', error);
    }
  }

  getSessionItem(key: string): any {
    const prefixedKey = this.PREFIX + key;
    try {
      const item = sessionStorage.getItem(prefixedKey);
      if (item === null) return null;
      
      try {
        return JSON.parse(item);
      } catch {
        return item;
      }
    } catch (error) {
      console.error('Error reading from sessionStorage', error);
      return null;
    }
  }

  removeSessionItem(key: string): void {
    const prefixedKey = this.PREFIX + key;
    try {
      sessionStorage.removeItem(prefixedKey);
    } catch (error) {
      console.error('Error removing from sessionStorage', error);
    }
  }

  clearSession(): void {
    try {
      const keys = Object.keys(sessionStorage);
      keys.forEach(key => {
        if (key.startsWith(this.PREFIX)) {
          sessionStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Error clearing sessionStorage', error);
    }
  }
}
