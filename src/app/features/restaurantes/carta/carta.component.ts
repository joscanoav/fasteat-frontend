import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';  // <-- importa Router
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

import { RestauranteService } from 'app/services/restaurante.service';
import { CarritoService } from 'app/services/carrito.service';
import { Promo, Restaurante } from 'app/models/restaurante.model';

@Component({
  selector: 'app-carta',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CardModule,
    ButtonModule
  ],
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.css']
})
export class CartaComponent implements OnInit {
  restaurante!: Restaurante;
  promos: Promo[] = [];

  constructor(
    private route: ActivatedRoute,
    private svc: RestauranteService,
    private carritoSvc: CarritoService,
    private router: Router             // <-- aquí

  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : null;
    if (id !== null) {
      this.svc.obtener(id).subscribe({
        next: r => {
          this.restaurante = r;
          this.promos = r.promos;
        },
        error: err => console.error('Error cargando carta', err)
      });
    }
  }

  agregarAlCarrito(promo: Promo) {
    const item = {
      restauranteId: this.restaurante.idRestaurante!,
      nombre:         promo.nombre,
      precio:         promo.precio,
      cantidad:       1,
      url:            promo.url
    };
    this.carritoSvc.agregar(item);
    this.router.navigate(['/carrito']);

  }
}
