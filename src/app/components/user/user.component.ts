import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared/shared.module';
import { ReportIssueComponent } from '../report-issue/report-issue.component';
import { MyIssuesComponent } from '../my-issues/my-issues.component';
import { UserDashboardComponent } from '../user-dashboard/user-dashboard.component';
import { ProfileService } from '../../services/profile.service';
import { Router } from '@angular/router';
import { ProfileDetailsComponent } from '../profile-details/profile-details.component';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [SharedModule,ReportIssueComponent,MyIssuesComponent,UserDashboardComponent,ProfileDetailsComponent],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit{
  profileData: any;
  notifications: any[] = [];

  constructor(private profileService: ProfileService, private router: Router) {}

  ngOnInit(): void {
    this.loadProfile();
    this.getNotifications();
  }

  loadProfile(): void {
    this.profileService.getUserProfile().subscribe(
      (data) => this.profileData = data,
      (error) => console.error('Error loading profile:', error)
    );
  }

  getInitials(name: string): string {
    return name ? name.charAt(0).toUpperCase() : '?';
  }

  viewProfile(): void {
    this.router.navigate(['/profile-details']);
  }

  getNotifications() {
    this.profileService.getNotifications().subscribe(
      (response) => {
        this.notifications = response.notifications || [];
      },
      (error) => console.error('Error fetching notifications:', error)
    );
  }
  
}
