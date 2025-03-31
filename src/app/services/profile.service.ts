import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = 'https://cirpbackend.onrender.com';
  // private apiUrl = 'http://127.0.0.1:5000'; // Use this for local testing

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: object) {}

  private getHeaders() {
    let token = '';
    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('token') || '';
    }
    return { headers: new HttpHeaders().set('Authorization', `Bearer ${token}`) };
  }

  getUserProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/profile`, this.getHeaders());
  }

  updateUserProfile(formData: FormData): Observable<{ message: string; profile_pic?: string }> {
    return this.http.put<{ message: string; profile_pic?: string }>(
      `${this.apiUrl}/user/profile`,
      formData,
      this.getHeaders()
    );
  }

  getNotifications(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/notifications`, this.getHeaders());
  }

  getAdminProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/profile`, this.getHeaders());
  }

  updateAdminProfile(adminForm: any): Observable<any> {
    const formData = new FormData();
    
    Object.keys(adminForm).forEach((key) => {
      if (adminForm[key]) {
        formData.append(key, adminForm[key]);
      }
    });

    if (adminForm.profile_pic instanceof File) {
      formData.append('profile_pic', adminForm.profile_pic);
    }

    return this.http.put(`${this.apiUrl}/admin/profile`, formData, this.getHeaders());
  }
}
