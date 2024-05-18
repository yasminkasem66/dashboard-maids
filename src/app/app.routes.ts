import { Routes } from '@angular/router';
import { AuthGuard } from './auth/guard/auth.guard';

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
    canActivate: [AuthGuard],
    children: [
      {
        path: 'users',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./pages/users/components/list-of-users/list-of-users.component').then((c) => c.ListOfUsersComponent),
      },
      {
        path: 'user-details/:id',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./pages/users/components/user-details/user-details.component').then((c) => c.UserDetailsComponent),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
