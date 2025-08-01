import { Routes } from '@angular/router';

export const FORO_ROUTES: Routes = [
 
  {
    path: 'crear',
    loadComponent: () => import('../features/topicos/pages/crear-topico.component').then(c => c.CrearTopicoComponent)
  },
];
