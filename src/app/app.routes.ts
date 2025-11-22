import { Routes } from '@angular/router';
import { PropertiesComponent } from './features/properties/properties.component';
import { OwnersComponent } from './features/owners/owners.component';
import { TenantsComponent } from './features/tenants/tenants.component';
import { PaymentsComponent } from './features/payments/payments.component';
import { InquiriesComponent } from './features/inquiries/inquiries.component';
import { LoginComponent } from './shared/components/login/login.component';

export const routes: Routes = [
  { path: '', component: PropertiesComponent },
  { path: 'properties', component: PropertiesComponent },
  { path: 'owners', component: OwnersComponent },
  { path: 'tenants', component: TenantsComponent },
  { path: 'payments', component: PaymentsComponent },
  { path: 'inquiries', component: InquiriesComponent },
  { path: 'login', component: LoginComponent},
  { path: '**', redirectTo: '/properties' }
];