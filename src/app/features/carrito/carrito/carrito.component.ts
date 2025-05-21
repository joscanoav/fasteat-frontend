import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { PedidoService } from 'app/services/pedido.service';
import { CarritoService } from 'app/services/carrito.service';
import { CarritoItem } from 'app/models/carrito-item.model';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputNumberModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  items: CarritoItem[] = [];
  total = 0;

  constructor(
    public carritoSvc: CarritoService,
    private pedSvc: PedidoService,
    private router: Router,
    private auth: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.carritoSvc.items$.subscribe(list => {
      this.items = list;
      this.updateTotal();
    });
  }

  updateTotal() {
    this.total = this.items.reduce(
      (sum, item) => sum + item.precio * item.cantidad,
      0
    );
  }

  onQtyChange(item: CarritoItem) {
    this.updateTotal();
  }

  remove(item: CarritoItem) {
    this.carritoSvc.removeItem(item);
  }

  placeOrder() {
    if (!this.items.length) return;

    const userId = this.auth.getUserId();
    const payload = {
      usuario_id: userId,
      items: this.items.map(i => ({
        producto_id: i.restauranteId,
        cantidad:     i.cantidad
      })),
      total: this.total
    };

    this.pedSvc.crear(payload).subscribe({
      next: () => {
        this.carritoSvc.vaciar();
        this.messageService.add({severity:'success', summary:'Éxito', detail:'Pedido realizado'});
        this.router.navigate(['/mis-pedidos']);
      },
      error: err => console.error('Error al realizar pedido', err)
    });
  }

  cancelOrder() {
    this.carritoSvc.vaciar();
    this.messageService.add({severity:'warn', summary:'Carrito', detail:'Compra anulada'});
  }
}