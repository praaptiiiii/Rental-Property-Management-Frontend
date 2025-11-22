import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = signal<boolean>(false);
  private currentUser = signal<any>(null);

  // Use computed() to create reactive values
  isLoggedIn = computed(() => this.isAuthenticated());
  currentUser$ = computed(() => this.currentUser());

  constructor(private router: Router) {
    // Check if user is logged in from localStorage on service initialization
    const savedAuth = localStorage.getItem('rental-auth');
    if (savedAuth) {
      const authData = JSON.parse(savedAuth);
      this.isAuthenticated.set(true);
      this.currentUser.set(authData.user);
    }
  }

  // Simulate login (replace with actual API call)
  login(email: string, password: string): boolean {
    // Mock authentication - replace with real API call
    if (email && password) {
      const user = {
        id: 1,
        name: 'John Doe',
        email: email,
        avatar: '👤'
      };
      
      this.isAuthenticated.set(true);
      this.currentUser.set(user);
      
      // Save to localStorage
      localStorage.setItem('rental-auth', JSON.stringify({
        user: user,
        token: 'mock-jwt-token'
      }));
      
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated.set(false);
    this.currentUser.set(null);
    localStorage.removeItem('rental-auth');
    this.router.navigate(['/']);
  }

  // Helper methods
  getUserName(): string {
    return this.currentUser()?.name || '';
  }

  getCurrentUser(): any {
    return this.currentUser();
  }

  // Check if token exists (for route guards)
  hasValidToken(): boolean {
    const savedAuth = localStorage.getItem('rental-auth');
    if (savedAuth) {
      const authData = JSON.parse(savedAuth);
      return !!authData.token;
    }
    return false;
  }
}