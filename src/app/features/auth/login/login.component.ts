import { Component, inject, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    DialogModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Input() embedMode = false;
  @Output() close = new EventEmitter<void>();

  email = '';
  password = '';
  loading = false;
  error = '';

  private auth = inject(AuthService);
  private router = inject(Router);

  login() {
    if (!this.email || !this.password) {
      this.error = 'Correo electrónico y contraseña son obligatorios';
      return;
    }

    this.loading = true;
    this.error = '';

    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        this.close.emit();
        this.router.navigate(['/restaurantes']);
      },
      error: (err) => {
        this.error = err.error?.message || 'Credenciales incorrectas';
        this.loading = false;
      }
    });
  }

  register() {
    this.router.navigate(['/registro']);
  }

  onInputChange() {
    if (this.error) this.error = '';
  }
}
