import { Component, OnInit } from '@angular/core';
import { PerfilService } from '../../service/perfil.service';
import { SolicitudService } from '../../service/solicitud.service';
import { TokenService } from '../../service/token.service';
import { HeaderFixiComponent } from '../../component/header-fixi/header-fixi.component';
import { CurrencyPipe } from '@angular/common';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fixi-perfil',
  standalone: true,
  imports: [NgFor, CurrencyPipe, HeaderFixiComponent,CommonModule],
  templateUrl: './fixi-perfil.component.html',
  styleUrls: ['./fixi-perfil.component.scss'],
})
export class FixiPerfilComponent implements OnInit {
  perfil: any = null;
  trabajos: any[] = [];
  trabajosHechos: any[] = [];
  editando: boolean = false;

  constructor(
    private perfilService: PerfilService,
    private solicitudService: SolicitudService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.obtenerPerfil();
    this.obtenerTrabajos();
  }

  obtenerPerfil(): void {
    const perfilId = this.tokenService.getProfileId();
    if (perfilId) {
      this.perfilService.getPerfilById(perfilId).subscribe(
        (data) => {
          this.perfil = data;
          console.log(data);
          this.perfil.nombre = this.tokenService.getProfileName();
        },
        (error) => {
          console.error('Error al obtener el perfil:', error);
        }
      );
    }
  }

  obtenerTrabajos(): void {
    this.solicitudService.obtenerSolicitudes(0, 10).subscribe(
      (data) => {
        this.trabajos = data.filter((trabajo) => trabajo.status !== 'hecho');
        this.trabajosHechos = data.filter((trabajo) => trabajo.status === 'hecho');
      },
      (error) => {
        console.error('Error al obtener trabajos:', error);
      }
    );
  }

  toggleEditar(): void {
    this.editando = !this.editando;
  }

  guardarCambios(): void {
    const formData = new FormData();
    formData.append('description', this.perfil.description);
    formData.append('telefono', this.perfil.telefono);
    formData.append('direccion', JSON.stringify(this.perfil.direccion));

    const perfilId = this.tokenService.getProfileId();
    if (perfilId) {
      this.perfilService.updatePerfil(perfilId, formData).subscribe(
        (response) => {
          console.log('Perfil actualizado:', response);
          this.perfil = response;
          this.toggleEditar();
        },
        (error) => {
          console.error('Error al actualizar el perfil:', error);
        }
      );
    }
  }

  agregarTrabajo(): void {
    console.log('Agregar trabajo clicado');
    // Implementar lógica para agregar un nuevo trabajo
  }
}
