import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { GlobalLoaderService } from '../../shared/ui-services/global-loader.service';
import { finalize } from 'rxjs';

export const loaderInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(GlobalLoaderService);
  loaderService.showLoader();

  return next(req).pipe(finalize(() => loaderService.hideLoader()));
};
