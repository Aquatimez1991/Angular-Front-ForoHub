import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export interface DatosListaTopico {
  id: number;
  titulo: string;
  mensaje: string;
  nombreCurso: string;
  fechaCreacion: string;
  usuario: string;
  idUsuario: number;
}


@Injectable({ providedIn: 'root' })
export class TopicoService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/topico';

  crearTopico(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getTopicos(): Observable<{ content: DatosListaTopico[] }> {
    return this.http.get<{ content: DatosListaTopico[] }>(this.apiUrl);
  }

  getTopicoPorId(id: number): Observable<DatosListaTopico> {
    return this.http.get<DatosListaTopico>(`${this.apiUrl}/${id}`);
  }
  actualizarTopico(data: any): Observable<any> {
    return this.http.put(this.apiUrl, data);
  }

  eliminarTopico(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getTopicosPorUsuario(idUsuario: number): Observable<DatosListaTopico[]> {
    return this.http.get<DatosListaTopico[]>(`${this.apiUrl}/usuario/${idUsuario}`);
  }

}
