import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProfileService } from '../../services/profile.service';
import { SharedModule } from '../../shared/shared/shared.module';
@Component({
  selector: 'app-admin-profile',
  imports:[SharedModule],
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css'],
})
export class AdminProfileComponent implements OnInit {
  adminForm: FormGroup;
  adminData: any;
  isEditing = false;
  profilePicPreview: string | ArrayBuffer | null = '';

  constructor(private http: HttpClient, private fb: FormBuilder, private profileService: ProfileService) {
    this.adminForm = this.fb.group({
      full_name: [''],
      username: [''],
      email: [''],
      phone: [''],
      address: [''],
      bio: [''],
      profile_pic: [null],
    });
  }

  ngOnInit(): void {
    this.loadAdminProfile();
  }

  loadAdminProfile(): void {
    this.profileService.getAdminProfile().subscribe(
      (response: any) => {
        this.adminData = response;
        this.adminForm.patchValue(response);

        // Load profile picture preview
        this.profilePicPreview = response.profile_pic || 'assets/default-profile.png';
      },
      (error) => console.error('Error loading admin profile:', error)
    );
  }

  enableEditing(): void {
    this.isEditing = true;
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.adminForm.patchValue({ profile_pic: file });

      // Preview image
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.profilePicPreview = reader.result;
      };
    }
  }

  updateAdminProfile(): void {
    this.profileService.updateAdminProfile(this.adminForm.value).subscribe(
      () => {
        alert('Admin Profile updated successfully!');
        this.isEditing = false;
        this.loadAdminProfile();
      },
      (error) => console.error('Error updating admin profile:', error)
    );
  }
}
