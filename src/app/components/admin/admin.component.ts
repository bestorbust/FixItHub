import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared/shared.module';
import { AdminProfileComponent } from '../admin-profile/admin-profile.component';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
import { ManageIssuesComponent } from '../manage-issues/manage-issues.component';
import { AdminUsersComponent } from '../admin-users/admin-users.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [SharedModule, AdminProfileComponent, AdminDashboardComponent, ManageIssuesComponent, AdminUsersComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  selectedComponent: string = 'dashboard'; // Default view

  selectComponent(component: string) {
    this.selectedComponent = component;
  }
}
