import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./auth/components/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'signup',
    loadComponent: () => import('./auth/components/sign-up/sign-up.component').then((c) => c.SignUpComponent),
  },
  {
    path: '',
    loadComponent: () => import('./pages/main.component').then((c) => c.MainComponent),
    // canActivate: [AuthGuard],
    // children: [
    //   {
    //   },
    // ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
