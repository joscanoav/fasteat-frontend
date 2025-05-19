import { Component }      from '@angular/core';
import { CommonModule }   from '@angular/common';       // ← lo necesitas para NgIf
import { RouterOutlet }   from '@angular/router';
import { NavbarComponent }from './shared/navbar/navbar/navbar.component';
import { FooterComponent }from './shared/footer/footer/footer.component';
import { AuthService }    from './services/auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,    // ← aquí
    RouterOutlet,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn = false;

  constructor(
    private router: Router,
    private auth: AuthService
  ) {
    // Al cambiar de ruta comprobamos token
    this.router.events.subscribe(evt => {
      if (evt instanceof NavigationEnd) {
        this.isLoggedIn = !!this.auth.getToken();
      }
    });
  }

  onLogout() {
    this.auth.logout();
    this.isLoggedIn = false;
  }
}
