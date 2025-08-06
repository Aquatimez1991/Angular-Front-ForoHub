import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export interface User {
    id: string;
    login: string;
    contrasena: string;
    activo: boolean;
}

@Injectable({ providedIn: 'root' })
export class UserService {
    private http = inject(HttpClient);
    private apiUrl = environment.apiUrl + '/usuarios';
    
    crearUsuario(usuario: User): Observable<any> {
        return this.http.post(`${this.apiUrl}/usuarios`, usuario);
    }

    obtenerUsuarios(): Observable<User[]> {
        return this.http.get<User[]>(`${this.apiUrl}/usuarios`);
    }

    obtenerUsuarioPorId(id: string): Observable<User> {
        return this.http.get<User>(`${this.apiUrl}/usuarios/${id}`);
    }

    actualizarUsuario(id: string, usuario: User): Observable<any> {
        return this.http.put(`${this.apiUrl}/usuarios/${id}`, usuario);
    }

    eliminarUsuario(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/usuarios/${id}`);
    }
}