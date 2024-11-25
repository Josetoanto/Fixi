import { Component } from '@angular/core';
import { PerfilService } from '../../service/perfil.service';
import { TokenService } from '../../service/token.service';
import { HeaderFixiComponent } from '../../component/header-fixi/header-fixi.component';
import { NgFor } from '@angular/common';

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
    private tokenService: TokenService
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
}
