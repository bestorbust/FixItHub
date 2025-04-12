import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/shared/shared.module';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  credentials = { username: '', password: '' };

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId) && this.authService.isAuthenticated()) {
      const role = localStorage.getItem('role');
      this.router.navigateByUrl(role === 'Admin' ? '/admin' : '/user');
    }
  }

  login() {
    this.authService.login(this.credentials).subscribe(
      (response: any) => {
        if (response.status === 'Deactivated') {
          alert('Your account has been deactivated. Contact support.');
          return;
        }

        if (response.token && response.role) {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('role', response.role);
          }

          this.router.navigateByUrl(response.role === 'Admin' ? '/admin' : '/user');
        } else {
          alert(response.message || 'Login Failed');
        }
      },
      (error) => {
        if (error.status === 403 && error.error?.status === 'Deactivated') {
          alert('Your account is deactivated. Please contact support.');
        } else {
          alert(error.error?.message || 'Invalid credentials');
        }
      }
    );
  }
}
