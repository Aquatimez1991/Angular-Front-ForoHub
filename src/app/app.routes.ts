import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full' 
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'foro',
    loadChildren: () =>
      import('./features/topicos/topicos.routes').then(m => m.topicosRoutes)
  },
  {
    path: '**',
    redirectTo: 'login'
  },

];
