import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  login(email: string, password: string) {
    return this.httpClient.post<{token: string}>(`${environment.laravelBaseUrl}/login`, {email, password}).pipe(tap(res => {
      localStorage.setItem('access_token', res.token);
    }));
  }

  register(email: string, password: string) {
    return this.httpClient.post<{token: string}>(`${environment.laravelBaseUrl}/register`, {email, password}).pipe(tap(res => {
      localStorage.setItem('access_token', res.token);
    }));
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }
}