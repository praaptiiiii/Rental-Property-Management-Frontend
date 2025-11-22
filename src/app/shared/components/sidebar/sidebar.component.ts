import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  menuItems = [
    { path: '/properties', label: 'Properties', icon: '🏠' },
    { path: '/owners', label: 'Owners', icon: '👑' },
    { path: '/tenants', label: 'Tenants', icon: '👥' },
    { path: '/payments', label: 'Payments', icon: '💰' },
    { path: '/inquiries', label: 'Inquiries', icon: '📧' }
  ];
}