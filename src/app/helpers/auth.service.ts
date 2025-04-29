import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'authToken';
  private role: string = 'guide';

  constructor(private router: Router) {}

  login(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.router.navigate(['/bookings']);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  setUserRole(_role: string): void {
     this.role = _role;
  }

  getUserRole(): string {
    return this.role;
 }
}
