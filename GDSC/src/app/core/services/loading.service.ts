import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$: Observable<boolean> = this.loadingSubject.asObservable();

  private loadingTextSubject = new BehaviorSubject<string>('Loading...');
  public loadingText$: Observable<string> = this.loadingTextSubject.asObservable();

  setLoading(loading: boolean): void {
    this.loadingSubject.next(loading);
  }

  setLoadingText(text: string): void {
    this.loadingTextSubject.next(text);
  }

  show(text: string = 'Loading...'): void {
    this.setLoadingText(text);
    this.setLoading(true);
  }

  hide(): void {
    this.setLoading(false);
  }

  getLoadingState(): boolean {
    return this.loadingSubject.value;
  }

  getLoadingText(): string {
    return this.loadingTextSubject.value;
  }
}
