import { Component } from '@angular/core';
import { PerfilService } from '../../service/perfil.service';
import { TokenService } from '../../service/token.service';
import { HeaderFixiComponent } from '../../component/header-fixi/header-fixi.component';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-fixi-home',
  standalone: true,
  imports: [HeaderFixiComponent,NgFor],
  templateUrl: './fixi-home.component.html',
  styleUrl: './fixi-home.component.scss'
})
export class FixiHomeComponent {
  perfil: any = null; // Información del perfil
  constructor(
    private perfilService: PerfilService,
    private tokenService: TokenService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    // Obtener el ID del perfil desde el servicio Token
    const perfilId = this.tokenService.getProfileId();
    console.log(perfilId)
    if (perfilId) {
      this.perfilService.getPerfilById(perfilId).subscribe(
        (data) => {
          this.perfil = data;
         this.perfil.nombre = this.tokenService.getProfileName()

          console.log('Perfil cargado:', data);
        },
        (error) => {
          console.error('Error al cargar el perfil:', error);
        }
      );
    } else {
      console.warn('No se encontró un ID de perfil en el token.');
    }
  }
  irAServicios() {
    this.router.navigate(['/serviciosFixi']);
  }

  // Función para navegar a "Perfil"
  irAPerfil() {
    this.router.navigate(['/perfilFixi']);
  }

  irAHistorial() {
    this.router.navigate(['/historial']);
  }
}
