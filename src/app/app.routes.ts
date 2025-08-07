import { Routes } from '@angular/router';
import { AUTH_ROUTES } from './auth/auth.routes';
import { AuthGuard } from './core/guards/auth.guard'; 

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login', 
    pathMatch: 'full'
  },
  {
    path: 'auth', // 
    children: AUTH_ROUTES
  },
  {
    path: 'foro',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../app/foro/foro.routes').then(m => m.FORO_ROUTES)
  },
  {
    path: '**',
    redirectTo: 'auth/login' 
  }
  
];