import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface Restaurante {
  id?: number;
  nombre: string;
  direccion: string;
  descripcion?: string;
  menu: Record<string, number>;
  // otros campos según tu API
}

@Injectable({ providedIn: 'root' })
export class RestauranteService {
  private baseUrl = `${environment.apiBase}/restaurantes`;

  constructor(private http: HttpClient) {}

  listar(): Observable<Restaurante[]> {
    return this.http.get<Restaurante[]>(this.baseUrl);
  }

  obtener(id: number): Observable<Restaurante> {
    return this.http.get<Restaurante>(`${this.baseUrl}/${id}`);
  }

  crear(restaurante: Restaurante): Observable<Restaurante> {
    return this.http.post<Restaurante>(this.baseUrl, restaurante);
  }

  actualizar(id: number, restaurante: Partial<Restaurante>): Observable<Restaurante> {
    return this.http.put<Restaurante>(`${this.baseUrl}/${id}`, restaurante);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}