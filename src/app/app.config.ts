import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { loaderInterceptorInterceptor } from './@Core/interceptors/loader-interceptor.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { tokenInterceptor } from './@Core/interceptors/token.interceptor';
import { cachingInterceptor } from './@Core/interceptors/caching.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
    provideClientHydration(),
    provideHttpClient(
      withFetch(),
      withInterceptors([loaderInterceptorInterceptor, tokenInterceptor, cachingInterceptor]),
    ),
    provideHttpClient(),
    provideAnimations(),
  ],
};
