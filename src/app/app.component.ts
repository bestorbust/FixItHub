import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { SharedModule } from './shared/shared/shared.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, SharedModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  currentView: string = 'login';
  menuOpen: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.updateViewBasedOnRole();
    }
  }

  updateViewBasedOnRole() {
    const role = localStorage.getItem('role') || 'User'; // Default to 'User' if no role is found
    this.currentView = role === 'Admin' ? 'admin' : 'user';
  }

  navigate(view: string) {
    this.currentView = view;
    this.closeMenu();
  }

  logout() {
    this.authService.logout();
    this.currentView = 'login';  // Reset to login view after logout
    this.closeMenu();
    this.router.navigate(['/login']); // Redirect to login page
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  isAdmin(): boolean {
    // Check role directly from localStorage
    return localStorage.getItem('role') === 'Admin';
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen; // Toggle the mobile menu
  }

  closeMenu() {
    this.menuOpen = false; // Close the menu after navigation
  }
}
