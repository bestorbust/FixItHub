import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private baseUrl = 'https://fixithubbackend.onrender.com/admin';
  private apiUrl = 'https://fixithubbackend.onrender.com/';

  constructor(private http: HttpClient) {}

  // Get dashboard statistics
  getDashboardStats(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/dashboard`);
  }

  // Get all issues
  getIssues(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/issues`);
  }

  // Update issue status
  updateIssueStatus(issueId: string, status: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/issues/${issueId}`, { status });
  }

  // Delete an issue
  deleteIssue(issueId: string): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.delete<any>(`${this.apiUrl}/issues/${issueId}`, { headers });
  }

  // Fetch all users
  getUsers(): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.get<any>(`${this.baseUrl}/users`, { headers });
  }

  // Warn a user
  warnUser(email: string): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.post<any>(`${this.baseUrl}/warn_user/${email}`, {}, { headers });
  }

  // Deactivate a user
  deactivateUser(email: string): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.post<any>(`${this.baseUrl}/deactivate_user/${email}`, {}, { headers });
  }

  // Activate a user
  activateUser(email: string): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.post<any>(`${this.baseUrl}/activate_user/${email}`, {}, { headers });
  }

  // Create authorization headers
  private createAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
  }
}
