import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../../services/auth.service';
// import { ProfileService } from '../../services/profile.service';
// import { LocationService } from '../../services/location.service';
// import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SharedModule } from '../../shared/shared/shared.module';
import { AdminProfileComponent } from '../admin-profile/admin-profile.component';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
import { ManageIssuesComponent } from '../manage-issues/manage-issues.component';
import { AdminUsersComponent } from '../admin-users/admin-users.component';

@Component({
  selector: 'app-admin',
  standalone:true,
  imports: [SharedModule,AdminProfileComponent,AdminDashboardComponent,ManageIssuesComponent,AdminUsersComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  selectedComponent: string = 'dashboard'; // Default view

  selectComponent(component: string) {
    this.selectedComponent = component;
  }
  // admin: any = {};
  // position: { latitude: number; longitude: number } | null = null;
  // mapUrl: SafeResourceUrl | null = null;

  // constructor(
  //   private authService: AuthService,
  //   private profileService: ProfileService,
  //   private locationService: LocationService,
  //   private sanitizer: DomSanitizer
  // ) {}

  // async ngOnInit() {
  //   this.getAdminProfile();
  //   try {
  //     this.position = await this.locationService.getCurrentLocation();
  //     if (this.position) {
  //       const url = `https://maps.google.com/maps?q=${this.position.latitude},${this.position.longitude}&hl=en&z=14&output=embed`;
  //       this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  //     }
  //   } catch (error) {
  //     console.error('Error getting location:', error);
  //   }
  // }

  // getAdminProfile() {
  //   this.profileService.getAdminProfile().subscribe((response: any) => {

  //   // this.profileService.getProfile().subscribe((response: any) => {
  //     this.admin = response.admin;
  //   });
  // }

  // updateProfile() {
  //   this.profileService.updateAdminProfile(this.admin).subscribe(() => {
  //     alert('Profile updated successfully');
  //   });
  // }

  // logout() {
  //   this.authService.logout();
  // }
}
