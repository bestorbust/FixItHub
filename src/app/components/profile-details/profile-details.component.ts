// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { ProfileService } from '../../services/profile.service';
// import { SharedModule } from '../../shared/shared/shared.module';
// import { Router } from '@angular/router';
// @Component({
//   selector: 'app-profile-details',
//   imports:[SharedModule],
  // templateUrl: './profile-details.component.html',
  // styleUrls: ['./profile-details.component.css']
// })
// export class ProfileDetailsComponent implements OnInit {
//   profileForm: FormGroup;
//   profileData: any;
//   isEditing = false;
//   profilePicPreview: string | ArrayBuffer | null = '';

//   constructor(private profileService: ProfileService, private fb: FormBuilder, private router:Router) {
//     this.profileForm = this.fb.group({
//       full_name: [''],
//       username: [''],
//       email: [''],
//       phone: [''],
//       address: [''],
//       bio: [''],
//       gender: [''],
//       dob: [''],
//       occupation: [''],
//       social_links: [''],
//       profile_pic: [null]
//     });
//   }

//   ngOnInit(): void {
//     this.loadProfile();
//   }

//   loadProfile(): void {
//     this.profileService.getUserProfile().subscribe(
//       (data) => {
//         this.profileData = data;
//         this.profileForm.patchValue(data);
//       },
//       (error) => console.error('Error loading profile:', error)
//     );
//   }

//   enableEditing(): void {
//     this.isEditing = true;
//   }

//   onFileChange(event: any): void {
//     const file = event.target.files[0];
//     if (file) {
//       this.profileForm.patchValue({ profile_pic: file });

//       // Preview image
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => {
//         this.profilePicPreview = reader.result;
//       };
//     }
//   }

//   // updateProfile(): void {
//   //   const formData = new FormData();
//   //   Object.keys(this.profileForm.value).forEach((key) => {
//   //     if (this.profileForm.value[key]) {
//   //       formData.append(key, this.profileForm.value[key]);
//   //     }
//   //   });

//   //   this.profileService.updateUserProfile(formData).subscribe(
//   //     (response) => {
//   //       alert('Profile updated successfully!');
//   //       this.isEditing = false;
//   //       this.loadProfile();
//   //     },
//   //     (error) => console.error('Error updating profile:', error)
//   //   );
//   // }
//   // updateProfile(): void {
//   //   const formData = new FormData();
    
//   //   // Append form fields
//   //   Object.keys(this.profileForm.value).forEach((key) => {
//   //     if (key !== 'profile_pic') {
//   //       formData.append(key, this.profileForm.value[key]);
//   //     }
//   //   });
  
//   //   // Append profile picture if changed
//   //   const fileInput = this.profileForm.get('profile_pic')?.value;
//   //   if (fileInput instanceof File) {
//   //     formData.append('profile_pic', fileInput);
//   //   }
  
//   //   this.profileService.updateUserProfile(formData).subscribe(
//   //     (response) => {
//   //       alert('Profile updated successfully!');
//   //       this.isEditing = false;
//   //       this.loadProfile(); // Reload updated data
//   //     },
//   //     (error) => console.error('Error updating profile:', error)
//   //   );
//   // }
  

//   updateProfile(): void {
//     const formData = new FormData();
    
//     // Append other form fields
//     Object.keys(this.profileForm.value).forEach((key) => {
//       if (key !== 'profile_pic') {
//         formData.append(key, this.profileForm.value[key]);
//       }
//     });
  
//     // Append profile picture if changed
//     const fileInput = this.profileForm.get('profile_pic')?.value;
//     if (fileInput instanceof File) {
//       formData.append('profile_pic', fileInput);
//     }
  
//     this.profileService.updateUserProfile(formData).subscribe(
//       (response) => {
//         alert('Profile updated successfully!');
//         this.isEditing = false;
  
//         // Update profile picture URL if changed
//         if (response.profile_pic) {
//           this.profileData.profile_pic = response.profile_pic;
//         }
        
//         this.loadProfile();
//       },
//       (error) => console.error('Error updating profile:', error)
//     );
//   }
  
  // goToDashboard(): void {
  //   this.router.navigate(['/user']);
  // }

//   getInitials(): string {
//     if (!this.profileData?.full_name) return '?';
//     const words = this.profileData.full_name.split(' ');
//     return words.length > 1
//       ? words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase()
//       : words[0].charAt(0).toUpperCase();
//   }
// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { SharedModule } from '../../shared/shared/shared.module';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile-details',
  imports:[SharedModule],
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {
  userForm: FormGroup;
  isEditing = false;
  profilePicPreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private profileService: ProfileService, private router:Router) {
    this.userForm = this.fb.group({
      full_name: [''],
      username: [''],
      email: [{ value: '', disabled: true }],
      phone: [''],
      address: [''],
      bio: [''],
      profile_pic: ['']
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
  
      // Preview the image
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.profilePicPreview = reader.result as string;  // Ensure it's a string for binding
      };
    }
  }
  goToDashboard(): void {
    this.router.navigate(['/user']);
  }
  
  updateUserProfile() {
    const formData = new FormData();
  
    // Append all form values
    Object.keys(this.userForm.value).forEach((key) => {
      if (this.userForm.value[key]) {
        formData.append(key, this.userForm.value[key]);
      }
    });
  
    // Append the profile picture only if a new file is selected
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
  
  // updateUserProfile() {
  //   const formData = new FormData();
  //   Object.keys(this.userForm.value).forEach((key) => {
  //     formData.append(key, this.userForm.value[key]);
  //   });

  //   if (this.selectedFile) {
  //     formData.append('profile_pic', this.selectedFile);
  //   }

  //   this.profileService.updateUserProfile(formData).subscribe((res: any) => {
  //     alert(res.message);
  //     this.loadUserProfile();
  //     this.isEditing = false;
  //   });
  // }
}
