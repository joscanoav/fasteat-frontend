import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// PrimeNG
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule }  from 'primeng/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ CommonModule, RouterModule, MenubarModule, ButtonModule ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() isLoggedIn = false;
  @Output() logout = new EventEmitter<void>();

  items = [
    { label: 'Inicio',     routerLink: '/' },
    { label: 'Menú',       routerLink: '/menu' },
    { label: 'Promociones',routerLink: '/promos' },
    { label: 'Pedidos',    routerLink: '/pedidos' },
    { label: 'Carrito',    routerLink: '/carrito' }
  ];

  onLogoutClick() { this.logout.emit(); }
}
