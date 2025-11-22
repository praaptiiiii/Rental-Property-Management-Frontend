// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { AuthService } from 'src/app/core/services/auth.service';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css'
// })
// export class LoginComponent {
//   email = '';
//   password = '';
//   errorMessage = '';
//   isLoading = false;

//   constructor(
//     private authService: AuthService,
//     private router: Router
//   ) {}

//   login() {
//     if (!this.email || !this.password) {
//       this.errorMessage = 'Please enter both email and password';
//       return;
//     }

//     this.isLoading = true;
//     this.errorMessage = '';

//     // Simulate API call delay
//     setTimeout(() => {
//       if (this.authService.login(this.email, this.password)) {
//         this.router.navigate(['/']);
//       } else {
//         this.errorMessage = 'Invalid email or password';
//       }
//       this.isLoading = false;
//     }, 1000);
//   }
// }



import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { UserRole } from '../../../core/models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  selectedRole: UserRole = UserRole.CUSTOMER;
  errorMessage = '';
  isLoading = false;

  // Available roles for login
  roles = [
    { value: UserRole.CUSTOMER, label: 'Customer', description: 'Looking to rent properties' },
    { value: UserRole.OWNER, label: 'Property Owner', description: 'Managing rental properties' }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter both email and password';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // Simulate API call delay
    setTimeout(() => {
      if (this.authService.login(this.email, this.password, this.selectedRole)) {
        this.router.navigate(['/']);
      } else {
        this.errorMessage = 'Invalid email or password';
      }
      this.isLoading = false;
    }, 1000);
  }

  onRoleChange(role: UserRole): void {
    this.selectedRole = role;
  }
}