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
        path: 'employee',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./pages/employees/components/employee-list/employee-list.component').then(
            (c) => c.EmployeeListComponent,
          ),
      },
      {
        path: 'employee-details/:id',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./pages/employees/components/employee-details/employee-details.component').then(
            (c) => c.EmployeeDetailsComponent,
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
