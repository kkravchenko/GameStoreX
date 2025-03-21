import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly localStorageKey = 'gamestore';

  isAvailable(): boolean {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  saveState(state: any): void {
    if (this.isAvailable()) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(state));
    }
  }

  loadState(): any {
    if (this.isAvailable()) {
      const savedState = localStorage.getItem(this.localStorageKey);
      return savedState ? JSON.parse(savedState) : undefined;
    }
  }
}
