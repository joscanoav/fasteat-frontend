import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ButtonModule }   from 'primeng/button';
import { NavbarComponent } from './shared/navbar/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    NavbarComponent,
    FooterComponent,
    ButtonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}

