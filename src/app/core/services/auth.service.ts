// import { Injectable, signal, computed } from '@angular/core';
// import { Router } from '@angular/router';
// import { User, UserRole, AuthResponse } from '../models/user.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private isAuthenticated = signal<boolean>(false);
//   private currentUser = signal<any>(null);
//   private currentRole = signal<UserRole>(UserRole.CUSTOMER);

//   // Use computed() to create reactive values
//   isLoggedIn = computed(() => this.isAuthenticated());
//   currentUser$ = computed(() => this.currentUser());
//   currentRole$ = computed(() => this.currentRole());

//    private initializeAuthState(): void {
//     const savedAuth = localStorage.getItem('rental-auth');
//     if (savedAuth) {
//       const authData: AuthResponse = JSON.parse(savedAuth);
//       this.isAuthenticated.set(true);
//       this.currentUser.set(authData.user);
//       this.currentRole.set(authData.user.role);
//     }
//   }

//   // Simulate login (replace with actual API call)
//   login(email: string, password: string): boolean {
//     // Mock authentication - replace with real API call
//     if (email && password) {
//       const user: User = {
//         id: Date.now(),
//         name: this.generateUserName(email, role),
//         email: email,
//         role: role,
//         avatar: role === UserRole.OWNER ? '👑' : '👤',
//         phone: '+1 (555) 123-4567',
//         createdAt: new Date()
//       };
//        this.setAuthState(user, role);
//       return true;
//     }
//     return false;
//   }

//   switchRole(newRole: UserRole): void {
//     if (!this.isAuthenticated()) return;
    
//     const user = this.currentUser();
//     if (user && user.role === UserRole.OWNER) {
//       // Only owners can switch roles
//       this.currentRole.set(newRole);
//       this.updateLocalStorage(newRole);
//     }
//   }

//   logout(): void {
//     this.isAuthenticated.set(false);
//     this.currentUser.set(null);
//     this.currentRole.set(UserRole.CUSTOMER);
//     localStorage.removeItem('rental-auth');
//     this.router.navigate(['/']);
//   }

//   // Helper methods
//   getUserName(): string {
//     return this.currentUser()?.name || '';
//   }

//   getCurrentUser(): any {
//     return this.currentUser();
//   }

//   // Check if token exists (for route guards)
//   hasValidToken(): boolean {
//     const savedAuth = localStorage.getItem('rental-auth');
//     if (savedAuth) {
//       const authData = JSON.parse(savedAuth);
//       return !!authData.token;
//     }
//     return false;
//   }
// }



import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserRole, AuthResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = signal<boolean>(false);
  private currentUser = signal<User | null>(null);
  private currentRole = signal<UserRole>(UserRole.CUSTOMER);

  // Reactive signals
  isLoggedIn = computed(() => this.isAuthenticated());
  currentUser$ = computed(() => this.currentUser());
  currentRole$ = computed(() => this.currentRole());

  constructor(private router: Router) {
    this.initializeAuthState();
  }

  private initializeAuthState(): void {
    const savedAuth = localStorage.getItem('rental-auth');
    if (savedAuth) {
      const authData: AuthResponse = JSON.parse(savedAuth);
      this.isAuthenticated.set(true);
      this.currentUser.set(authData.user);
      this.currentRole.set(authData.user.role);
    }
  }

  // Enhanced login with role support
  login(email: string, password: string, role: UserRole): boolean {
    if (email && password) {
      const user: User = {
        id: Date.now(),
        name: this.generateUserName(email, role),
        email: email,
        role: role,
        avatar: role === UserRole.OWNER ? '👑' : '👤',
        phone: '+1 (555) 123-4567',
        createdAt: new Date()
      };
      
      this.setAuthState(user, role);
      return true;
    }
    return false;
  }

  // Switch between roles (for owners)
  switchRole(newRole: UserRole): void {
    if (!this.isAuthenticated()) return;
    
    const user = this.currentUser();
    if (user && user.role === UserRole.OWNER) {
      // Only owners can switch roles
      this.currentRole.set(newRole);
      this.updateLocalStorage(newRole);
    }
  }

  logout(): void {
    this.isAuthenticated.set(false);
    this.currentUser.set(null);
    this.currentRole.set(UserRole.CUSTOMER);
    localStorage.removeItem('rental-auth');
    this.router.navigate(['/']);
  }

  // Helper methods
  private setAuthState(user: User, role: UserRole): void {
    this.isAuthenticated.set(true);
    this.currentUser.set(user);
    this.currentRole.set(role);
    
    this.updateLocalStorage(role);
  }

  private updateLocalStorage(role: UserRole): void {
    const user = this.currentUser();
    if (user) {
      const authData: AuthResponse = {
        user: { ...user, role: role },
        token: 'mock-jwt-token',
        expiresIn: 3600
      };
      localStorage.setItem('rental-auth', JSON.stringify(authData));
    }
  }

  private generateUserName(email: string, role: UserRole): string {
    const baseName = email.split('@')[0];
    const capitalized = baseName.charAt(0).toUpperCase() + baseName.slice(1);
    return role === UserRole.OWNER 
      ? `${capitalized} (Owner)`
      : capitalized;
  }

  // Role checking methods
  isOwner(): boolean {
    return this.currentUser()?.role === UserRole.OWNER;
  }

  isCustomer(): boolean {
    return this.currentRole() === UserRole.CUSTOMER;
  }

  getCurrentRole(): UserRole {
    return this.currentRole();
  }

  getUserName(): string {
    return this.currentUser()?.name || '';
  }

  getCurrentUser(): User | null {
    return this.currentUser();
  }
}