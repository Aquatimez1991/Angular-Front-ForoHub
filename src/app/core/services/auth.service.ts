import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private router: Router, private http: HttpClient) {
    this.checkAuthStatus();
  }

  private checkAuthStatus(): void {
    const token = localStorage.getItem('token');
    const usuarioLogin = localStorage.getItem('usuarioLogin');
    
    if (token && usuarioLogin) {
      this.isAuthenticatedSubject.next(true);
    } else {
      this.isAuthenticatedSubject.next(false);
    }
  }

login(credentials: any): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  return this.http.post<any>(`${environment.apiUrl}/login`, credentials, { headers })
    .pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('usuarioLogin', credentials.login);
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
}

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioLogin');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/auth/login']); 
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}