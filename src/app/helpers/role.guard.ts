import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const expectedRole = route.data?.['expectedRole'];

  const userRole = authService.getUserRole();

  if (userRole !== expectedRole) {
    router.navigate(['/availability']);
    return false;
  }

  return true;
};
