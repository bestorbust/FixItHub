// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root',
// })
// export class IssueService {
//   private apiUrl='https://cirpbackend.onrender.com';
//   // private apiUrl = 'http://localhost:5000';

//   constructor(private http: HttpClient) {}

//   private getHeaders(): HttpHeaders {
//     const token = localStorage.getItem('token');
//     return new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`
//     });
//   }

  
//   reportIssue(issueData: FormData): Observable<any> {
//     const token = localStorage.getItem('token');
//     return this.http.post(`${this.apiUrl}/report_issue`, issueData, {
//         headers: new HttpHeaders({
//             'Authorization': `Bearer ${token}`
//         })
//     });
// }

// // // Reopen a completed issue
// // reopenIssue(issueId: string): Observable<any> {
// //   return this.http.put(`${this.apiUrl}/reopen_issue/${issueId}`, {}, {
// //     headers: this.getHeaders()
// //   });
// // }

//   // Get all issues reported by the logged-in user
//   getMyIssues(): Observable<any> {
//     return this.http.get(`${this.apiUrl}/my-issues`, { headers: this.getHeaders() });
//   }

//   // Edit an issue
//   editIssue(issueId: string, issueData: any): Observable<any> {
//     console.log("Updating issue with ID:", issueId);
//     console.log("Sending data to backend:", JSON.stringify(issueData));

//     return this.http.put(`${this.apiUrl}/edit_issue/${issueId}`, issueData, { headers: this.getHeaders() });
//   }
  
//   // Delete an issue
//   deleteIssue(issueId: string): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/delete_issue/${issueId}`, { headers: this.getHeaders() });
//   }
//   getIssues(): Observable<any> {
//     return this.http.get(`${this.apiUrl}/issues`);
//   }

//   voteIssue(issueId: string, voteType: string): Observable<any> {
//     return this.http.post(`${this.apiUrl}/vote`, { issue_id: issueId, vote: voteType });
//   }

//   addComment(issueId: string, comment: string): Observable<any> {
//     return this.http.post(`${this.apiUrl}/comment`, { issue_id: issueId, comment });
//   }

//   getComments(issueId: string): Observable<any> {
//     return this.http.get(`${this.apiUrl}/comments/${issueId}`);
//   }

//   deleteComment(commentId: string): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/delete_comment/${commentId}`);
//   }
//   getLatestIssues(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.apiUrl}/api/latest-issues`).pipe(
//     // return this.http.get<any[]>(`http://127.0.0.1:5000/api/latest-issues`).pipe(
//       map((issues) =>
//         issues.map((issue) => ({
//           ...issue,
//           address: this.extractAddress(issue.location)
//         }))
//       )
//     );
//   }
  
//   private extractAddress(location: any): string {
//     if (!location) return 'Location not available';
  
//     if (typeof location === 'string') {
//       return location; // Direct address string
//     } else if (typeof location === 'object') {
//       if (location.address) {
//         return location.address; // Object containing an address field
//       } else if (location.latitude && location.longitude) {
//         return `Lat: ${location.latitude}, Lng: ${location.longitude}`; // Fallback if lat/lng is present
//       }
//     }
//     return 'Location not available';
//   }
  
  
// }
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  // private apiUrl='https://cirpbackend.onrender.com';
  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  
  reportIssue(issueData: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(`${this.apiUrl}/report_issue`, issueData, {
        headers: new HttpHeaders({
            'Authorization': `Bearer ${token}`
        })
    });
}
reopenIssue(issueId: string): Observable<any> {
  return this.http.patch(`${this.apiUrl}/reopen_issue/${issueId}`, {}, {
    headers: this.getHeaders()
  });
}



  // Get all issues reported by the logged-in user
  getMyIssues(): Observable<any> {
    return this.http.get(`${this.apiUrl}/my-issues`, { headers: this.getHeaders() });
  }

  // Edit an issue
  editIssue(issueId: string, issueData: any): Observable<any> {
    console.log("Updating issue with ID:", issueId);
    console.log("Sending data to backend:", JSON.stringify(issueData));

    return this.http.put(`${this.apiUrl}/edit_issue/${issueId}`, issueData, { headers: this.getHeaders() });
  }
  
  // Delete an issue
  deleteIssue(issueId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete_issue/${issueId}`, { headers: this.getHeaders() });
  }
  getIssues(): Observable<any> {
    return this.http.get(`${this.apiUrl}/issues`);
  }

  voteIssue(issueId: string, voteType: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/vote`, { issue_id: issueId, vote: voteType });
  }

  addComment(issueId: string, comment: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/comment`, { issue_id: issueId, comment });
  }

  getComments(issueId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/comments/${issueId}`);
  }

  deleteComment(commentId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete_comment/${commentId}`);
  }
  getLatestIssues(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/latest-issues`).pipe(
    // return this.http.get<any[]>(`http://127.0.0.1:5000/api/latest-issues`).pipe(
      map((issues) =>
        issues.map((issue) => ({
          ...issue,
          address: this.extractAddress(issue.location)
        }))
      )
    );
  }
  
  private extractAddress(location: any): string {
    if (!location) return 'Location not available';
  
    if (typeof location === 'string') {
      return location; // Direct address string
    } else if (typeof location === 'object') {
      if (location.address) {
        return location.address; // Object containing an address field
      } else if (location.latitude && location.longitude) {
        return `Lat: ${location.latitude}, Lng: ${location.longitude}`; // Fallback if lat/lng is present
      }
    }
    return 'Location not available';
  }
  
  
}
