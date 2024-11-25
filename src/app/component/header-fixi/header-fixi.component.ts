import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-fixi',
  standalone: true,
  imports: [],
  templateUrl: './header-fixi.component.html',
  styleUrl: './header-fixi.component.scss'
})
export class HeaderFixiComponent {
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
    this.router.navigate(['/perfilFixi']); 
  }

  redirectToServices() {
    this.router.navigate(['/serviciosFixi']); 
  }
}
