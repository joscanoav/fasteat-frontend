// src/app/features/restaurantes/detalle-rest/detalle-rest.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule }       from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ButtonModule }    from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule }  from 'primeng/textarea';

import { Restaurante, RestauranteService } from 'app/services/restaurante.service';

@Component({
  selector: 'app-detalle-rest',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    TextareaModule    // ← aquí
  ],
  templateUrl: './detalle-rest.component.html',
  styleUrls: ['./detalle-rest.component.css']
})
export class DetalleRestComponent implements OnInit {
  form: FormGroup;
  isNew = false;
  restauranteId?: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private svc: RestauranteService
  ) {
    this.form = this.fb.group({
      nombre:     ['', Validators.required],
      direccion:  ['', Validators.required],
    });
  }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam === 'nuevo') {
      this.isNew = true;
    } else if (idParam) {
      this.restauranteId = +idParam;
      this.svc.obtener(this.restauranteId).subscribe(r => this.form.patchValue(r));
    }
  }

  save() {
    console.log('↪️ save() called, form.value =', this.form.value);

    const data = {
      ...this.form.value,
      menu: {} as Record<string, number>
    };

    if (this.isNew) {
      this.svc.crear(data).subscribe({
        next: res => {
          console.log('✅ Restaurante creado:', res);
          this.volver();
        },
        error: err => console.error('❌ Error creando restaurante', err)
      });
    } else if (this.restauranteId != null) {
      this.svc.actualizar(this.restauranteId, data).subscribe({
        next: res => {
          console.log('✅ Restaurante actualizado:', res);
          this.volver();
        },
        error: err => console.error('❌ Error actualizando restaurante', err)
      });
    }
  }

  cancelar() {
    this.volver();
  }

  private volver() {
    this.router.navigate(['/restaurantes']);
  }
}
