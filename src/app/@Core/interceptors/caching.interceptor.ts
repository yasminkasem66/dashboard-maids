import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of, tap } from 'rxjs';
const cache = new Map<string, HttpResponse<any>>();

export const cachingInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.method !== 'GET') {
    cache.clear();
    return next(req);
  }

  if (cache.has(req.urlWithParams.toString())) {
    const cachedResponse = cache.get(req.urlWithParams.toString());
    if (!cachedResponse) return of();
    return of(cachedResponse);
  }

  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        cache.set(req.urlWithParams.toString(), event.clone());
      }
    }),
  );
};
