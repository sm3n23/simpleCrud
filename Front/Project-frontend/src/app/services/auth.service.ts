import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../models/user';


interface LoginResponse {
  id: number;
  email: string;
  nom: string;
  role: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api';
  private currentUserSubject: BehaviorSubject<LoginResponse | null>;
  public currentUser: Observable<LoginResponse | null>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<LoginResponse | null>(
      JSON.parse(localStorage.getItem('currentUser') || 'null')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): LoginResponse | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, { email, password })
      .pipe(map(response => {
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.currentUserSubject.next(response);
        return response;
      }));
  }

  isAdmin(): boolean {
    return this.currentUserValue?.role === 'ADMIN';
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }
}