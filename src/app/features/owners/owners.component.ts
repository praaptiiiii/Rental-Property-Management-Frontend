import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-owners',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './owners.component.html',
  styleUrl: './owners.component.css'
})
export class OwnersComponent {
  owners = [
    { name: 'John Smith', email: 'john@email.com', phone: '555-0101', properties: 3 },
    { name: 'Sarah Johnson', email: 'sarah@email.com', phone: '555-0102', properties: 2 }
  ];
}