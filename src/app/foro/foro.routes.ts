import { Routes } from '@angular/router';

export const FORO_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/foro-page/foro-page.component').then(c => c.ForoPageComponent)
  },
  {
    path: 'crear',
    loadComponent: () =>
      import('./pages/crear-topico/crear-topico.component').then(c => c.CrearTopicoComponent)
  },
  {
    path: 'topico/:id',
    loadComponent: () =>
      import('./pages/detalle-topico/detalle-topico.component').then(c => c.DetalleTopicoComponent)
  }
];

