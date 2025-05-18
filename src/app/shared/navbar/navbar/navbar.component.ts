import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MegaMenuModule } from 'primeng/megamenu';
import { MegaMenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MegaMenuModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() isLoggedIn = false;            // <— propiedad de entrada
  @Output() logout = new EventEmitter<void>();  // <— evento de salida

  items: MegaMenuItem[] = [];

  ngOnInit() {
    this.items = [
      { label: 'Inicio', routerLink: '/' },
      { label: 'Menú', routerLink: '/menu' },
      { label: 'Promociones', routerLink: '/promos' },
      { label: 'Pedidos', routerLink: '/pedidos' },
      { label: 'Carrito', routerLink: '/carrito' }
    ];
  }

  onLogoutClick() {
    this.logout.emit();
  }
}
