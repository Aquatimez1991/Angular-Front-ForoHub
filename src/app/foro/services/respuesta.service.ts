import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export interface DatosListaRespuesta {
  id: number;
  mensaje: string;
  autor: string;
  idTopico: number;
  fechaCreacion: string;

}

@Injectable({
  providedIn: 'root'
})

export class RespuestaService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/respuesta';

  obtenerRespuestasPorTopico(idTopico: number): Observable<DatosListaRespuesta[]> {
    return this.http.get<DatosListaRespuesta[]>(`${this.apiUrl}/topico/${idTopico}`);
  }

  agregarRespuesta(idTopico: number, respuesta: any): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.post(url, respuesta);
  }
  editarRespuesta(id: number, r: DatosListaRespuesta): Observable<any> {
    return this.http.put(`${this.apiUrl}`, r);
  }

  //eliminarRespuesta(id: number): Observable<any> {
  // return this.http.delete(`${this.apiUrl}/${id}`);
  //}

}
