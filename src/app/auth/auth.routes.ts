import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then(c => c.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./create-user/create-user.component').then(c => c.CreateUserComponent)
  }
];
