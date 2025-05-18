import { Component }              from '@angular/core';
import { CommonModule }           from '@angular/common';
import { FormsModule }            from '@angular/forms';
import { Router }                 from '@angular/router';
import { ButtonModule }           from 'primeng/button';

import { UsuarioService }         from 'app/services/usuario.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  nombre = '';
  email = '';
  password = '';
  error = '';

  constructor(
    private userSvc: UsuarioService,
    private router: Router
  ) {}

  onSubmit() {
    if (!this.nombre || !this.email || !this.password) {
      this.error = 'Todos los campos son obligatorios';
      return;
    }
    this.userSvc.crear({ nombre: this.nombre, email: this.email, password: this.password })
      .subscribe({
        next: () => this.router.navigate(['/login']),
        error: () => this.error = 'No se pudo registrar'
      });
  }
}
