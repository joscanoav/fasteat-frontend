import { Component, OnInit }      from '@angular/core';
import { CommonModule }           from '@angular/common';
import { ButtonModule }           from 'primeng/button';

import { PedidoService, Pedido }  from 'app/services/pedido.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  // en un caso real, cart vendrá de un servicio de estado
  cart: { productoId: number; cantidad: number }[] = [];

  constructor(private pedSvc: PedidoService) {}

  ngOnInit() {
    // aquí cargarías el carrito (ej: localStorage)
  }

  placeOrder() {
    const pedido: Pedido = {
      usuarioId: 0,
      items: this.cart,
      total: this.cart.reduce((sum, i) => sum + i.cantidad * 0, 0) // ajusta total según tu lógica
    };
    this.pedSvc.crear(pedido).subscribe();
  }
}
