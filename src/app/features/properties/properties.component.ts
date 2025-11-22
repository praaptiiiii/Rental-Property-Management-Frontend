import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.css'
})
export class PropertiesComponent implements OnInit {
  properties: any[] = [];
  isLoading = true;

  ngOnInit() {
    // Simulate API call delay
    setTimeout(() => {
      this.properties = [
        {
          id: 1,
          name: 'Luxury Apartment Downtown',
          location: 'New York, NY',
          rent: 2500,
          bedrooms: 2,
          bathrooms: 2,
          area: 1200,
          image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400',
          status: 'Available'
        },
        {
          id: 2,
          name: 'Modern Family House',
          location: 'Brooklyn, NY',
          rent: 3200,
          bedrooms: 3,
          bathrooms: 2,
          area: 1800,
          image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400',
          status: 'Rented'
        },
        {
          id: 3,
          name: 'Studio Apartment',
          location: 'Manhattan, NY',
          rent: 1800,
          bedrooms: 1,
          bathrooms: 1,
          area: 600,
          image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400',
          status: 'Available'
        },
        {
          id: 4,
          name: 'Penthouse Suite',
          location: 'Queens, NY',
          rent: 4500,
          bedrooms: 3,
          bathrooms: 3,
          area: 2200,
          image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400',
          status: 'Available'
        },
        {
          id: 5,
          name: 'Suburban Villa',
          location: 'Long Island, NY',
          rent: 3800,
          bedrooms: 4,
          bathrooms: 3,
          area: 2400,
          image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400',
          status: 'Under Maintenance'
        },
        {
          id: 6,
          name: 'Garden Apartment',
          location: 'Bronx, NY',
          rent: 1600,
          bedrooms: 2,
          bathrooms: 1,
          area: 900,
          image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400',
          status: 'Available'
        }
      ];
      this.isLoading = false;
    }, 1500);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Available': return 'status-available';
      case 'Rented': return 'status-rented';
      case 'Under Maintenance': return 'status-maintenance';
      default: return 'status-available';
    }
  }
}