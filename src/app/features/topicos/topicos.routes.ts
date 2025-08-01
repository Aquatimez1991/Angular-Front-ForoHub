// topicos.routes.ts
import { Routes } from '@angular/router';
import { ForoPageComponent } from '../../foro/pages/foro-page.component';
import { CrearTopicoComponent } from './pages/crear-topico.component';
import { DetalleTopicoComponent } from './detalle-topico/detalle-topico.component';

export const topicosRoutes: Routes = [
  {
    path: '',
    component: ForoPageComponent
  },
    {
    path: 'crear',
    component: CrearTopicoComponent,
  },
    {
    path: 'topico/:id',
    component: DetalleTopicoComponent
  }
];
