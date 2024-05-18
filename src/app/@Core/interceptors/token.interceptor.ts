import { HttpInterceptorFn } from '@angular/common/http';
import { throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('user');

  if (!token && !isValidRequestForInterceptor()) {
    return throwError(() => 'No Token provided');
  }

  const clonedReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(clonedReq);
};

function isValidRequestForInterceptor(): boolean {
  const currentLocation = location.pathname;
  const urls = ['/login'];
  if (urls.includes(currentLocation.replace('/', ''))) {
    return false;
  }
  return true;
}
