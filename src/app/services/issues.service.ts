// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class IssuesService {
//   private apiUrl='https://cirpbackend.onrender.com';
//   // private apiUrl = 'http://localhost:5000';

//   constructor(private http: HttpClient) {}

//   private getHeaders(): HttpHeaders {
//     let token = '';

//     if (typeof window !== 'undefined' && localStorage) {
//       token = localStorage.getItem('token') || '';
//     }

//     return new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`
//     });
//   }

//   getIssues(): Observable<any> {
//     return this.http.get(`${this.apiUrl}/issues`, { headers: this.getHeaders() });
//   }
//   voteIssue(issueId: string, voteType: 'upvote' | 'downvote'): Observable<any> {
//     return this.http.post(`${this.apiUrl}/issues/${issueId}/vote`, 
//     // return this.http.post(`http://localhost:5000/issues/${issueId}/vote`, 
//       { voteType },
//       { headers: { 'Content-Type': 'application/json' } }
//     );
//   }
  
//   addComment(issueId: string, comment: string): Observable<any> {
//     return this.http.post(`${this.apiUrl}/comment`, { issue_id: issueId, comment }, { headers: this.getHeaders() });
//   }

//   getComments(issueId: string): Observable<any> {
//     return this.http.get(`${this.apiUrl}/comments/${issueId}`, { headers: this.getHeaders() });
//   }

//   deleteComment(commentId: string): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/delete_comment/${commentId}`, { headers: this.getHeaders() });
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IssuesService {
  // private apiUrl='https://cirpbackend.onrender.com';
  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    let token = '';

    if (typeof window !== 'undefined' && localStorage) {
      token = localStorage.getItem('token') || '';
    }

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getIssues(): Observable<any> {
    return this.http.get(`${this.apiUrl}/issues`, { headers: this.getHeaders() });
  }
  voteIssue(issueId: string, voteType: 'upvote' | 'downvote'): Observable<any> {
    return this.http.post(`${this.apiUrl}/issues/${issueId}/vote`, 
    // return this.http.post(`http://localhost:5000/issues/${issueId}/vote`, 
      { voteType },
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
  
  addComment(issueId: string, comment: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/comment`, { issue_id: issueId, comment }, { headers: this.getHeaders() });
  }

  getComments(issueId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/comments/${issueId}`, { headers: this.getHeaders() });
  }

  deleteComment(commentId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete_comment/${commentId}`, { headers: this.getHeaders() });
  }
}
