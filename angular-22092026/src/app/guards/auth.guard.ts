import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {

  const router = inject(Router);

  const authToken = localStorage.getItem('authToken');

  if (authToken === 'true') {
    return true;
  }

  return router.createUrlTree(['/']);
};