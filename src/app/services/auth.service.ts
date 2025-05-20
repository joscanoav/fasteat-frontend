// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';

interface LoginPayload  { email: string; password: string; }
interface LoginResponse { token: string; }
interface RegisterPayload { nombre: string; email: string; password: string; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiBase = environment.apiBase + '/usuarios';

  // 1️⃣ Estado de autenticación
  private _isAuthenticated = new BehaviorSubject<boolean>(!!this.getToken());
  readonly isAuthenticated$ = this._isAuthenticated.asObservable();

  constructor(private http: HttpClient) {}

  /** Devuelve el token guardado (o null) */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /** Header Authorization para usar en futuras peticiones */
  get authHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    });
  }

  /** Login */
  login(payload: LoginPayload): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiBase}/login`, payload, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      })
      .pipe(
        tap(res => {
          // Guarda token y actualiza estado
          localStorage.setItem('token', res.token);
          this._isAuthenticated.next(true);
        })
      );
  }

  /** Registro de nuevo usuario */
  register(payload: RegisterPayload): Observable<any> {
    return this.http.post(`${this.apiBase}`, payload, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
    // Nota: no marcamos isAuthenticated=true tras register; 
    // normalmente esperamos al login para emitir true
  }

  /** Logout */
  logout(): void {
    localStorage.removeItem('token');
    this._isAuthenticated.next(false);
  }
}
