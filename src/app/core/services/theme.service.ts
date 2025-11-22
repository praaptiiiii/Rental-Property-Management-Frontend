import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'rental-theme';
  isDarkTheme = signal<boolean>(false);

  constructor() {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    this.isDarkTheme.set(savedTheme ? savedTheme === 'dark' : prefersDark);
    this.applyTheme(this.isDarkTheme());

    // Watch for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(this.THEME_KEY)) {
        this.isDarkTheme.set(e.matches);
        this.applyTheme(e.matches);
      }
    });

    // Apply theme when signal changes
    effect(() => {
      this.applyTheme(this.isDarkTheme());
    });
  }

  toggleTheme() {
    this.isDarkTheme.set(!this.isDarkTheme());
    localStorage.setItem(this.THEME_KEY, this.isDarkTheme() ? 'dark' : 'light');
  }

  private applyTheme(isDark: boolean) {
    if (isDark) {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
  }
}