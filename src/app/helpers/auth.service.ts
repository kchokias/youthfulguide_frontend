import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'authToken';
  public role: string = '';
  private roleKey = 'userRole';

  constructor(private router: Router) {}

  login(token: string, role: string): void {
    localStorage.setItem(this.tokenKey, token);
    console.log(`role #1`, role);
    if (role === 'visitor') {
      this.router.navigate(['/find-a-guide']);
    } else {
      this.router.navigate(['/bookings']);
    }
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

  setUserRole(role: string): void {
    this.role = role;
    localStorage.setItem(this.roleKey, role);
  }

  getUserRole(): string {
    if (!this.role) {
      const saved = localStorage.getItem(this.roleKey);
      this.role = saved || 'visitor';
    }
    return this.role;
  }
}
