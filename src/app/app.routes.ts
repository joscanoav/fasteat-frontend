// src/app/app.routes.ts
import { Routes }                from '@angular/router';
import { authGuard }             from './guards/auth.guard';
import { HomeComponent } from './features/home/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { ListaRestComponent } from './features/restaurantes/lista-rest/lista-rest.component';
import { DetalleRestComponent } from './features/restaurantes/detalle-rest/detalle-rest.component';
import { CarritoComponent } from './features/carrito/carrito/carrito.component';
import { PedidosComponent } from './features/pedidos/pedidos/pedidos.component';
import { CartaComponent } from './features/restaurantes/carta/carta.component';

export const routes: Routes = [
  { path: '',             component: HomeComponent },
  { path: 'login',        component: LoginComponent },
  { path: 'registro',     component: RegisterComponent },
  {
    path: 'restaurantes',
    component: ListaRestComponent,
    canActivate: [ authGuard ]
  },
  {
    path: 'restaurantes/:id',
    component: DetalleRestComponent,
    canActivate: [ authGuard ]
  },
  {
    path: 'carrito',
    component: CarritoComponent,
    canActivate: [ authGuard ]
  },
  {
    path: 'mis-pedidos',
    component: PedidosComponent,
    canActivate: [ authGuard ]
  },

  { path: 'carta', 
    component: CartaComponent, 
     },


  { path: '**', redirectTo: '' }
];

