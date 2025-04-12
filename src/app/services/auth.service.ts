// import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';
// import { isPlatformBrowser } from '@angular/common';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   // private apiUrl='https://cirpbackend.onrender.com';
//   private apiUrl = 'http://127.0.0.1:5000'; // Flask Backend URL
//   private authState = new BehaviorSubject<boolean>(this.isAuthenticated());

//   constructor(
//     private http: HttpClient,
//     private router: Router,
//     @Inject(PLATFORM_ID) private platformId: object
//   ) {}

//   private isBrowser(): boolean {
//     return isPlatformBrowser(this.platformId);
//   }

//   register(user: any): Observable<any> {
//     return this.http.post(`${this.apiUrl}/register`, user);
//   }
//   isAdmin(): boolean {
//     const user = JSON.parse(localStorage.getItem('user') || '{}');
//     return user?.role === 'admin';
//   }
  
  
//   login(credentials: any): Observable<any> {
//     return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
//       tap((response: any) => {
//         console.log('Login response:', response); // Debugging log
  
//         if (response.status === 'Deactivated') {
//           alert('Your account has been deactivated. Contact support.');
//           return;
//         }
  
//         if (response.token) {
//           if (this.isBrowser()) {
//             localStorage.setItem('token', response.token);
//             localStorage.setItem('role', response.role);
//             localStorage.setItem('user_email', response.user_email); // Store user email
//           }
//           this.authState.next(true);
//           this.router.navigate(response.role === 'Admin' ? ['/admin'] : ['/user']);
//         }
//       })
//     );
//   }
  
  

//   logout(): void {
//     if (this.isBrowser()) {
//       localStorage.removeItem('token');
//       localStorage.removeItem('role');
//     }
//     this.authState.next(false); // Update auth state
//     this.router.navigate(['/login']);
//   }

//   isAuthenticated(): boolean {
//     if (this.isBrowser()) {
//       return !!localStorage.getItem('token');
//     }
//     return false;
//   }

//   getAuthState(): Observable<boolean> {
//     return this.authState.asObservable();
//   }
// }
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Backend URL
  private apiUrl = 'http://127.0.0.1:5000'; // or use your deployed URL
  private authState = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        console.log('Login response:', response); // Debugging log

        if (response.status === 'Deactivated') {
          alert('Your account has been deactivated. Contact support.');
          return;
        }

        if (response.token) {
          if (this.isBrowser()) {
            // Store individual values
            localStorage.setItem('token', response.token);
            localStorage.setItem('role', response.role);
            localStorage.setItem('user_email', response.user_email);
          }

          this.authState.next(true);

          // Redirect based on role
          this.router.navigate(response.role.toLowerCase() === 'admin' ? ['/admin'] : ['/user']);
        }
      })
    );
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('user_email');
    }
    this.authState.next(false);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    if (this.isBrowser()) {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  isAdmin(): boolean {
    const role = localStorage.getItem('role');
    return role?.toLowerCase() === 'admin';
  }

  getAuthState(): Observable<boolean> {
    return this.authState.asObservable();
  }
}
