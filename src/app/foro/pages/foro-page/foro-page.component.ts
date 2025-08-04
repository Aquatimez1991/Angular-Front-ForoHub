import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TopicoService, DatosListaTopico } from '../../services/topico.service';
import { HttpClientModule } from '@angular/common/http';
import { RespuestaService } from '../../services/respuesta.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-foro-page',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, FormsModule],
  templateUrl: './foro-page.component.html',
  styleUrls: ['./foro-page.component.css']
})
export class ForoPageComponent implements OnInit {
  topicos: DatosListaTopico[] = [];
  topicosFiltrados: DatosListaTopico[] = [];
  cantidadRespuestasPorTopico: { [id: number]: number } = {};
  textoBusqueda: string = '';
  cursosUnicos: string[] = [];
  filtro: string = '';
  misTopicos: DatosListaTopico[] = [];
  mostrarSoloMisTopicos: boolean = true;
  correoUsuarioLogueado: string = '';

  constructor(
    private topicoService: TopicoService,
    private router: Router,
    private respuestaService: RespuestaService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.cargarTopicos();
    const correo = localStorage.getItem('usuarioLogin');
    this.correoUsuarioLogueado = correo ?? '';
    this.cargarTopicos();

  }

  cargarTopicos(): void {
    this.topicoService.getTopicos().subscribe({
      next: (data) => {
        this.topicos = data.content;
        this.misTopicos = this.topicos.filter(t => t.usuario === this.correoUsuarioLogueado);
        this.aplicarFiltro();
        this.topicos.forEach(topico => this.cantidadDeRespuestasEnForo(topico.id));
      },
      error: (err) => console.error('Error al cargar tópicos', err)
    });
  }

  cargarMisTopicos(): void {
    const idUsuario = Number(localStorage.getItem('usuarioId'));
    if (!idUsuario) {
      console.warn('No se encontró el ID del usuario logueado.');
      return;
    }


    this.topicoService.getTopicosPorUsuario(idUsuario).subscribe({
      next: (data) => {
        this.misTopicos = data;
        this.aplicarFiltro();
      },
      error: (err) => console.error('Error al cargar mis tópicos', err)
    });
  }


  cantidadDeRespuestasEnForo(idTopico: number): void {
    this.respuestaService.obtenerRespuestasPorTopico(idTopico).subscribe({
      next: (data: any[]) => {
        this.cantidadRespuestasPorTopico[idTopico] = data.length;
      },
      error: () => {
        console.error(`No se pudieron contar las respuestas del tópico ${idTopico}.`);
        this.cantidadRespuestasPorTopico[idTopico] = 0;
      }
    });
  }

  irACrearTopico(): void {
    this.router.navigate(['/foro/crear']);
  }

  obtenerInicial(usuario: string): string {
    return usuario?.trim().charAt(0).toUpperCase() || '?';
  }

  mostrarTopicosAlInicio(topico: DatosListaTopico): void {
    this.router.navigate(['/foro/topico', topico.id]);
  }

  aplicarFiltroAlSeleccionar(): void {
    this.aplicarFiltro();
  }

  aplicarFiltroAlEscribir(): void {
    this.aplicarFiltro();
  }

  aplicarFiltro(): void {
    const conjunto = this.mostrarSoloMisTopicos ? this.misTopicos : this.topicos;

    if (!conjunto) {
      this.topicosFiltrados = [];
      return;
    }

    const texto = this.textoBusqueda.toLowerCase();
    this.topicosFiltrados = conjunto.filter(topico =>
      topico.titulo.toLowerCase().includes(texto)
    );
  }
  volverAlLogin(): void {
    this.authService.logout()
  }
    logout(): void {
    this.authService.logout();
  }
}
