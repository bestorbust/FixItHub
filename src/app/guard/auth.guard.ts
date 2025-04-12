import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // Ensure localStorage is accessed only in the browser
    if (typeof window === 'undefined') {
      return false;
    }

    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    const expectedRole = route.data['role'];
    if (expectedRole && role !== expectedRole) {
      this.router.navigate(['/home']); // Redirect if role mismatch
      return false;
    }

    return true;
  }
}
