import { Component, OnInit, signal } from '@angular/core';
import { Tag } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Plato } from './plato';
import { PlatoService } from 'app/services/carta.service';
import { HeaderComponent } from 'app/shared/header/header.component';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.css'],
  standalone: true,
  imports: [
    Tag,
    ButtonModule,
    CommonModule,
    FormsModule,
    HeaderComponent
  ],
  providers: [PlatoService],
})
export class CartaComponent implements OnInit {
  platos = signal<Plato[]>([]);

  constructor(private platoService: PlatoService) {}

  ngOnInit() {
    this.platoService.getPlatos().then(platos => this.platos.set(platos));
  }

  /** Sólo los primeros 6 para la galería */
  get primerosSeis(): Plato[] {
    return this.platos().slice(0, 6);
  }

  getSeverity(plato: Plato) {
    switch (plato.inventoryStatus) {
      case 'INSTOCK':    return 'success';
      case 'LOWSTOCK':   return 'warn';
      case 'OUTOFSTOCK': return 'danger';
      default:           return null;
    }
  }
}
