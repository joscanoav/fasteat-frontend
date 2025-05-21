import { Component, OnInit }    from '@angular/core';
import { CommonModule }         from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { TableModule }          from 'primeng/table';
import { ButtonModule }         from 'primeng/button';
import { Restaurante, RestauranteService } from 'app/services/restaurante.service';


@Component({
  selector: 'app-lista-rest',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TableModule,
    ButtonModule
  ],
  templateUrl: './lista-rest.component.html',
  styleUrls: ['./lista-rest.component.css']
})
export class ListaRestComponent implements OnInit {
  restaurantes: Restaurante[] = [];

  constructor(
    private svc: RestauranteService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadAll();
  }

  loadAll() {
    this.svc.listar().subscribe({
      next: data => this.restaurantes = data,
      error: err => console.error(err)
    });
  }

  verDetalle(r: Restaurante) {
    this.router.navigate(['/restaurantes', r.id]);
  }

  nuevo() {
    this.router.navigate(['/restaurantes', 'nuevo']);
  }

  eliminar(r: Restaurante) {
    if (!r.id) return;
    if (confirm(`¿Eliminar "${r.nombre}"?`)) {
      this.svc.eliminar(r.id).subscribe(() => this.loadAll());
    }
  }
}
