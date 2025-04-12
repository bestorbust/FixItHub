import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { SharedModule } from '../../shared/shared/shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-details',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css'],
})
export class ProfileDetailsComponent implements OnInit {
  userForm: FormGroup;
  isEditing = false;
  profilePicPreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      full_name: [''],
      username: [''],
      email: [{ value: '', disabled: true }],
      phone: [''],
      address: [''],
      bio: [''],
      profile_pic: [''],
    });
  }

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.profileService.getUserProfile().subscribe((user: any) => {
      this.userForm.patchValue(user);
      if (user.profile_pic) {
        this.profilePicPreview = user.profile_pic;
      }
    });
  }

  enableEditing() {
    this.isEditing = true;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.profilePicPreview = reader.result as string;
      };
    }
  }

  goToDashboard(): void {
    this.router.navigate(['/user']);
  }

  updateUserProfile() {
    const formData = new FormData();

    Object.keys(this.userForm.value).forEach((key) => {
      if (this.userForm.value[key]) {
        formData.append(key, this.userForm.value[key]);
      }
    });

    if (this.selectedFile instanceof File) {
      formData.append('profile_pic', this.selectedFile);
    }

    this.profileService.updateUserProfile(formData).subscribe(
      (res: any) => {
        alert(res.message);
        this.loadUserProfile();
        this.isEditing = false;
      },
      (error) => {
        console.error('Error updating profile:', error);
      }
    );
  }
}
