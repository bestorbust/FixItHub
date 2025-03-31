import { Component, OnInit } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './components/auth/login.component';
import { RegisterComponent } from './components/auth/register.component';
import { SharedModule } from './shared/shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { LocationService } from './services/location.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterModule,HomeComponent,LoginComponent, RegisterComponent, SharedModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentView: string = 'login';
  menuOpen: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      const role = localStorage.getItem('role') || 'User'; // Default role if null
      this.currentView = role === 'Admin' ? 'admin' : 'user';
    }
  }

  navigate(view: string) {
    this.currentView = view;
    this.closeMenu();
    // this.menuOpen = false; // Close menu on navigation
  }

  logout() {
    this.authService.logout();
    this.currentView = 'login';
    this.closeMenu();
    // this.menuOpen = false; // Close menu after logout
    this.router.navigate(['/login']); // Redirect to login
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }
  isAdmin(): boolean {
    return this.currentView === 'admin';
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen; // Toggle menu state
  }
  closeMenu() {
    this.menuOpen = false; // Close menu when a link is clicked
  }
}
