import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa el Router


@Component({
  selector: 'app-header-client',
  standalone: true,
  templateUrl: './header-client.component.html',
  styleUrls: ['./header-client.component.scss']
})
export class HeaderClientComponent {
  menuOpen = false;

  constructor(private router: Router) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  cerrarSesion() {
    sessionStorage.removeItem('authToken');
    window.location.href = '/login'; // Cambia "/login" según tu ruta de inicio de sesión
  }

  redirectToProfile() {
    this.router.navigate(['/perfil']); 
  }

  redirectToServices() {
    this.router.navigate(['/servicios']); 
  }
}
