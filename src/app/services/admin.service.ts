// import { Injectable } from '@angular/core';
// import { HttpClient ,HttpHeaders} from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AdminService {
//   private Url='https://cirpbackend.onrender.com';
//   // private Url='http://localhost:5000/admin';
//   private baseUrl = 'https://cirpbackend.onrender.com/admin';
//   // private baseUrl = 'http://localhost:5000/admin';

//   constructor(private http: HttpClient) {}

//   getDashboardStats(): Observable<any> {
//     return this.http.get<any>(`${this.baseUrl}/dashboard`);
//   }

//   getIssues(): Observable<any> {
//     return this.http.get<any>(`${this.Url}/issues`);
//     // return this.http.get<any>('http://localhost:5000/issues');
// }

//   updateIssueStatus(issueId:string, status: string):Observable<any>{
//     return this.http.put<any>(`${this.baseUrl}/issues/${issueId}`, {status});
//   }

//   deleteIssue(issueId: string): Observable<any> {
//     const headers = new HttpHeaders({
//       'Authorization': `Bearer ${localStorage.getItem('token')}`
//     });
//     return this.http.delete<any>(`${this.Url}/${issueId}`, { headers });

//     // return this.http.delete<any>(`http://localhost:5000/delete_issue/${issueId}`, { headers });
//   }

// // Fetch all users
// getUsers(): Observable<any> {
//   const headers = new HttpHeaders({
//     Authorization: `Bearer ${localStorage.getItem('token')}`,
//   });
//   return this.http.get<any>(`${this.baseUrl}/users`, { headers });
// }

// // Warn a user
// warnUser(email: string): Observable<any> {
//   const headers = new HttpHeaders({
//     Authorization: `Bearer ${localStorage.getItem('token')}`,
//   });
//   return this.http.post<any>(`${this.baseUrl}/warn_user/${email}`, {}, { headers });
// }

// // Deactivate a user
// deactivateUser(email: string): Observable<any> {
//   const headers = new HttpHeaders({
//     Authorization: `Bearer ${localStorage.getItem('token')}`,
//   });
//   return this.http.post<any>(`${this.baseUrl}/deactivate_user/${email}`, {}, { headers });
// }


// activateUser(email: string): Observable<any> {
//   const headers = new HttpHeaders({
//     Authorization: `Bearer ${localStorage.getItem('token')}`,
//   });
//   return this.http.post<any>(`${this.baseUrl}/activate_user/${email}`, {}, { headers });
// }





// }
import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  // private Url='https://cirpbackend.onrender.com';
  private Url='http://localhost:5000/admin';
  // private baseUrl = 'https://cirpbackend.onrender.com/admin';
  private baseUrl = 'http://localhost:5000/admin';

  constructor(private http: HttpClient) {}

  getDashboardStats(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/dashboard`);
  }

  getIssues(): Observable<any> {
    // return this.http.get<any>(`${this.Url}/issues`);
    return this.http.get<any>('http://localhost:5000/issues');
}

  updateIssueStatus(issueId:string, status: string):Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/issues/${issueId}`, {status});
  }

  deleteIssue(issueId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    // return this.http.delete<any>(`${this.Url}/${issueId}`, { headers });

    return this.http.delete<any>(`http://localhost:5000/delete_issue/${issueId}`, { headers });
  }

// Fetch all users
getUsers(): Observable<any> {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  });
  return this.http.get<any>(`${this.baseUrl}/users`, { headers });
}

// Warn a user
warnUser(email: string): Observable<any> {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  });
  return this.http.post<any>(`${this.baseUrl}/warn_user/${email}`, {}, { headers });
}

// Deactivate a user
deactivateUser(email: string): Observable<any> {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  });
  return this.http.post<any>(`${this.baseUrl}/deactivate_user/${email}`, {}, { headers });
}


activateUser(email: string): Observable<any> {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  });
  return this.http.post<any>(`${this.baseUrl}/activate_user/${email}`, {}, { headers });
}

}
