import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.css'
})
export class PropertiesComponent {
  properties = [
    { name: 'Apartment A', location: 'Downtown', rent: 1200 },
    { name: 'House B', location: 'Suburb', rent: 2000 }
  ];
}