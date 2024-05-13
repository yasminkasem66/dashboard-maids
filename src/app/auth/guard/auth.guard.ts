import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';

export const AuthGuard: CanActivateFn = (): Observable<boolean | UrlTree> | boolean | UrlTree => {
  const router: Router = inject(Router);
  const user = localStorage.getItem('user');
  if (user) return true;
  return of(router.createUrlTree(['/login']));
};
