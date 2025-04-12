import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared/shared.module';
import { MyIssuesComponent } from '../my-issues/my-issues.component';
import { UserDashboardComponent } from '../user-dashboard/user-dashboard.component';
import { ProfileService } from '../../services/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [SharedModule, MyIssuesComponent, UserDashboardComponent],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  profileData: any;
  notifications: any[] = [];

  constructor(
    private profileService: ProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProfile();
    this.getNotifications();
  }

  loadProfile(): void {
    this.profileService.getUserProfile().subscribe({
      next: (data) => (this.profileData = data),
      error: (err) => console.error('Error loading profile:', err),
    });
  }

  getNotifications(): void {
    this.profileService.getNotifications().subscribe({
      next: (res) => (this.notifications = res.notifications || []),
      error: (err) => console.error('Error fetching notifications:', err),
    });
  }

  viewProfile(): void {
    this.router.navigate(['/profile-details']);
  }

  getInitials(name: string): string {
    return name ? name.charAt(0).toUpperCase() : '?';
  }
}
