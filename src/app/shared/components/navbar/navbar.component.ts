// // navbar.component.ts
// import { Component } from '@angular/core';
// import { RouterLink } from '@angular/router';
// import { ThemeService } from 'src/app/core/services/theme.service';

// @Component({
//   selector: 'app-navbar',
//   standalone: true,
//   imports: [RouterLink],
//   templateUrl: './navbar.component.html',
//   styleUrl: './navbar.component.css'
// })
// export class NavbarComponent {
//   constructor(public themeService: ThemeService) {}

//   toggleTheme() {
//     this.themeService.toggleTheme();
//   }
// }


import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../../core/services/theme.service';
import { AuthService } from '../../../core/services/auth.service';
import { UserRole } from '../../../core/models/user.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  private authService = inject(AuthService);
  
  isLoggedIn = this.authService.isLoggedIn;
  currentRole = this.authService.currentRole$;
  userName = this.authService.getUserName();
  isOwner = this.authService.isOwner;

  constructor(public themeService: ThemeService) {}

  ngOnInit() {
    // User name will be set from auth service
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  logout() {
    this.authService.logout();
  }

  // Role switching (for owners) - to be implemented in next step
  switchRole(newRole: UserRole): void {
    this.authService.switchRole(newRole);
  }
}