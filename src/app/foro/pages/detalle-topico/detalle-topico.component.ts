import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TopicoService, DatosListaTopico } from '../../services/topico.service';        
import { DatePipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { RespuestaService, DatosListaRespuesta } from '../../services/respuesta.service';    

@Component({
  selector: 'app-detalle-topico',
  standalone: true,
  imports: [CommonModule, DatePipe, FormsModule],
  templateUrl: './detalle-topico.component.html',
  styleUrls: ['./detalle-topico.component.css']
})
export class DetalleTopicoComponent implements OnInit {
  topico: any;
  respuestas: DatosListaRespuesta[] = [];
  nuevaRespuesta: string = '';
  cargando = true;
  error: string = '';
  nombreUsuario: string = 'Usuario';
  idTopico: number = 0;
  modoEdicion: boolean = false;
  topicoEditado: Partial<DatosListaTopico> = {};
  cursos = ['JAVA', 'PHYTON', 'ANGULAR', 'LOGICA'];
usuarioLogin: string = '';
modoEdicionRespuesta: boolean = false;
respuestaEditada: DatosListaRespuesta = {} as DatosListaRespuesta;
mostrarModalEliminacion: boolean = false;

  constructor(private route: ActivatedRoute, private topicoService: TopicoService, private respuestaService: RespuestaService) {
    const login = localStorage.getItem('usuarioLogin');
    if (login) {
      this.nombreUsuario = this.formatearNombreDesdeLogin(login);
      this.usuarioLogin = login;
    }
  }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const idNumerico = +id;
      this.idTopico = idNumerico;
      this.topicoService.getTopicoPorId(idNumerico).subscribe({
        next: (data) => {
          this.topico = data;
          this.cantidadDeRespuestasEnTopico(idNumerico);
          this.cargando = false;
        },
        error: () => {
          this.error = 'No se pudo cargar el tópico.';
          this.cargando = false;
        }
      });
    } else {
      this.error = 'ID no válido.';
      this.cargando = false;
    }
  }

  cantidadDeRespuestasEnTopico(idTopico: number): void {
    this.respuestaService.obtenerRespuestasPorTopico(idTopico).subscribe({
      next: (data) => {
        this.respuestas = data;
      },
      error: () => {
        console.error('No se pudieron cargar las respuestas.');
      }
    });
  }


  responderTopico(): void {
    if (this.nuevaRespuesta.trim()) {
      const payload = {
        idTopico: this.idTopico,
        mensaje: this.nuevaRespuesta.trim()
      };
      this.respuestaService.agregarRespuesta(this.idTopico, payload).subscribe({
        next: (nuevaRespuesta) => {
          this.respuestas.unshift(nuevaRespuesta);
          this.nuevaRespuesta = '';
        },
        error: (err) => {
          console.error('Error al publicar la respuesta:', err);
          alert('Ya has respondido a este tópico. Por favor, revisa tus respuestas anteriores.');
        }
      });
    }
  }
  volverAlForo(): void {
    window.history.back();
  }

  obtenerInicial(autor: string | undefined | null): string {
    return autor?.trim().charAt(0).toUpperCase() || '?';
  }

  private formatearNombreDesdeLogin(autor: string): string {
    const nombreEmail = autor.split('@')[0]; 
    const partes = nombreEmail.split('.');   
    return partes.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' '); 
  }

  editarTopico(): void {
    this.modoEdicion = true;
    this.topicoEditado = {
      titulo: this.topico.titulo,
      mensaje: this.topico.mensaje,
      nombreCurso: this.topico.nombreCurso
    };
  }

  cancelarEdicion(): void {
    this.modoEdicion = false;
    this.topicoEditado = {};
  }

  confirmarActualizacion(): void {
    if (this.topico.id) {
      const login = localStorage.getItem('usuarioLogin');
      const idUsuario = localStorage.getItem('idUsuario');

      const payload = {
        ...this.topicoEditado,
        id: this.topico.id ? +this.topico.id : null
      };

      this.topicoService.actualizarTopico(payload).subscribe({
        next: (res) => {
          console.log('Tópico actualizado:', res);
          this.topico = { ...this.topico, ...this.topicoEditado };
          this.modoEdicion = false;
        },
        error: (err) => {
          console.error('Error al actualizar el tópico', err);
          alert('No tienes permiso para actualizar este tópico.');
        }
      });
    }
  }

  eliminarTopico(): void {
    if (confirm('¿Estás seguro de que deseas eliminar este tópico?')) {
      this.topicoService.eliminarTopico(this.idTopico).subscribe({
        next: () => {
          alert('Tópico eliminado correctamente.');
          this.volverAlForo();
        },
        error: (err) => {
          console.error('Error al eliminar el tópico:', err);
          alert('No tienes permiso para modificar este tópico.');
        }
      });
    }
  }

  mostrarConfirmacionEliminacion(): void {
  this.mostrarModalEliminacion = true;
}

cancelarEliminacion(): void {
  this.mostrarModalEliminacion = false;
}

confirmarEliminacion(): void {
  this.topicoService.eliminarTopico(this.idTopico).subscribe({
    next: () => {
      this.mostrarModalEliminacion = false;
      this.volverAlForo();
    },
    error: (err) => {
      console.error('Error al eliminar el tópico:', err);

      this.error = 'No tienes permiso para eliminar este tópico.';
      this.mostrarModalEliminacion = false;
    }
  });
}


  editarRespuesta(respuesta: DatosListaRespuesta): void {
    const nuevoMensaje = prompt('Editar respuesta:', respuesta.mensaje);
    if (nuevoMensaje !== null && nuevoMensaje.trim() !== '') {
      const actualizada: DatosListaRespuesta = { ...respuesta, mensaje: nuevoMensaje.trim() };

      this.respuestaService.editarRespuesta(respuesta.id, actualizada).subscribe({
        next: () => {
          respuesta.mensaje = nuevoMensaje.trim(); 
        },
        error: (err) => {
          console.error('Error al editar la respuesta:', err);
          alert('No tienes permiso para editar esta respuesta.');
        }
      });
    }
  }

  activarEdicionRespuesta(respuesta: DatosListaRespuesta): void {
  this.modoEdicionRespuesta = true;
  this.respuestaEditada = { ...respuesta };
}

confirmarEdicionRespuesta(): void {
  this.respuestaService.editarRespuesta(this.respuestaEditada.id, this.respuestaEditada).subscribe({
    next: () => {
      // Actualiza la lista local sin recargar
      const index = this.respuestas.findIndex(r => r.id === this.respuestaEditada.id);
      if (index !== -1) {
        this.respuestas[index].mensaje = this.respuestaEditada.mensaje;
      }
      this.modoEdicionRespuesta = false;
    },
    error: (err) => {
      console.error('Error al editar la respuesta:', err);
      alert('No tienes permiso para editar esta respuesta.');
    }
  });
}

cancelarEdicionRespuesta(): void {
  this.modoEdicionRespuesta = false;
  this.respuestaEditada = {} as DatosListaRespuesta;
}

  //eliminarRespuesta(respuesta: DatosListaRespuesta): void {
  // if (confirm('¿Estás seguro de que deseas eliminar esta respuesta?')) {
  //   this.respuestaService.eliminarRespuesta(respuesta.id).subscribe({
  //    next: () => {
  //     this.respuestas = this.respuestas.filter(res => res.id !== respuesta.id);
  //    },
  //   error: (err) => {
  //    console.error('Error al eliminar la respuesta:', err);
  //     alert('No tienes permiso para eliminar esta respuesta.');
  //   }
  // });
  // }
  //}
}