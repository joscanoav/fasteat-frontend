import { Component, inject }    from '@angular/core';
import { CommonModule }         from '@angular/common';
import { FormsModule }          from '@angular/forms';
import { InputTextModule }      from 'primeng/inputtext';
import { ButtonModule }         from 'primeng/button';
import { Router }               from '@angular/router';

import { AuthService }          from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,    // <-- Necesario para *ngIf, *ngFor, etc.
    FormsModule,
    InputTextModule,
    ButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  error = '';

  private auth = inject(AuthService);
  private router = inject(Router);

  login() {
    if (!this.email || !this.password) {
      this.error = 'Email y contraseña son obligatorios.';
      return;
    }

    this.loading = true;
    this.error = '';
    this.auth.login({ email: this.email, password: this.password })
      .subscribe({
        next: () => this.router.navigate(['/restaurantes']),
        error: err => {
          this.error = err.error?.message || 'Credenciales inválidas';
          this.loading = false;
        }
      });
  }

  register() {
    this.router.navigate(['/register']);
  }
}
