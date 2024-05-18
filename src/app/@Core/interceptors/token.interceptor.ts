import { HttpInterceptorFn } from '@angular/common/http';
import { throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const user = localStorage.getItem('user');

  if (!user && !isValidRequestForInterceptor()) {
    return throwError(() => 'No Token provided');
  }

  const clonedReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${user}`,
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
