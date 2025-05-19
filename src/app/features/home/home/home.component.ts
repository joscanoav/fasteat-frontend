import { Component, OnInit } from '@angular/core';
import { CommonModule }        from '@angular/common';
import { RouterModule }        from '@angular/router';
import { MegaMenuModule }      from 'primeng/megamenu';
import { CarouselModule }      from 'primeng/carousel';
import { TagModule }           from 'primeng/tag';
import { DialogModule }        from 'primeng/dialog';
import { ButtonModule }        from 'primeng/button';

import { MegaMenuItem }        from 'primeng/api';
import { LoginComponent } from 'app/features/auth/login/login.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MegaMenuModule,
    CarouselModule,
    TagModule,
    DialogModule,
    ButtonModule,
    LoginComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  menuItems: MegaMenuItem[] = [];
  promotions = [
    { name: '50% OFF', image: 'assets/images/promo1.jpeg', price: '50% OFF', tag: 'LIMITED TIME' },
    { name: 'Burger Olvidada', image: 'assets/images/promo2.jpeg', price: '$10.99', tag: 'NEW' },
    { name: 'Combo Familiar', image: 'assets/images/promo3.jpeg', price: '$25.99', tag: 'POPULAR' }
  ];
  responsiveOptions = [
    { breakpoint: '1400px', numVisible: 2, numScroll: 1 },
    { breakpoint: '1199px', numVisible: 3, numScroll: 1 },
    { breakpoint: '767px',  numVisible: 2, numScroll: 1 },
    { breakpoint: '575px',  numVisible: 1, numScroll: 1 }
  ];
  loginDialogVisible = false;

  ngOnInit() {
    this.menuItems = [
      { label: 'Nuestra Carta', routerLink: ['/carta'] },
      { label: 'Cupones',       routerLink: ['/coupons']     },
      { label: 'Ubicación',     routerLink: ['/locations']   }
    ];
  }

  getSeverity(tag: string) {
    return ({ 'LIMITED TIME': 'danger', 'NEW': 'success', 'POPULAR': 'warn' }[tag] ?? 'info');
  }

  showLoginDialog() {
    this.loginDialogVisible = true;
  }
}
