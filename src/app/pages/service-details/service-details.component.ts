import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicioService } from '../../service/servicio.service';
import { SolicitudService } from '../../service/solicitud.service'; // Importar el servicio de solicitudes
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderClientComponent } from '../../component/header-client/header-client.component';
import { PerfilService } from '../../service/perfil.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderClientComponent],
})
export class ServiceDetailsComponent implements OnInit {
  servicio: any = null; // Datos del servicio seleccionado
  servicioId: number = 0 ; // Datos del servicio seleccionado
  fecha: string = ''; // Fecha elegida por el usuario
  hora: string = ''; // Hora elegida por el usuario

  constructor(
    private route: ActivatedRoute,
    private servicioService: ServicioService,
    private solicitudService: SolicitudService, // Inyección del servicio de solicitudes,
    private userService: UserService,
    private perfilService: PerfilService
  ) {}

  ngOnInit(): void {
    const stringId = this.route.snapshot.paramMap.get('id')
    if (stringId){
      this.servicioId = parseInt(stringId);
      this.cargarServicio(this.servicioId);
    }
  }
  cargarServicio(id: number | null): void {
    if (!id) return;
  
    this.servicioService.getServicio(id).subscribe({
      next: (data) => {
        this.servicio = data;
  
        // Obtener el proveedor usando el proveedor_id del servicio
        if (this.servicio.proveedor_id) {
          this.userService.getUserById(this.servicio.proveedor_id).subscribe({
            next: (proveedor) => {
              this.servicio.proveedor = proveedor;
              // Usar perfil_id para obtener el perfil del proveedor
              if (proveedor.perfil_id) {
                this.perfilService.getPerfilById(proveedor.perfil_id).subscribe({
                  next: (perfil) => {
                    this.servicio.perfil = perfil; // Asignar el perfil al servicio
                    console.log(this.servicio)
                  },
                  error: (error) => {
                    console.error(
                      `Error al obtener el perfil con ID ${proveedor.perfil_id}:`,
                      error
                    );
                  },
                });
              }
            },
            error: (error) => {
              console.error(
                `Error al obtener el proveedor con ID ${this.servicio.proveedor_id}:`,
                error
              );
            },
          });
        }
      },
      error: (error) => {
        console.error('Error al cargar el servicio:', error);
      },
    });
  }
  
  

  agendarServicio(): void {
    if (!this.fecha || !this.hora) {
      alert('Por favor, selecciona una fecha y una hora.');
      return;
    }

    // Construir el objeto de solicitud
    const solicitud = {
      fecha_servicio: this.fecha,
      hora: this.hora,
      servicio_id: this.servicioId, // Obtener el ID del servicio
    };

    // Llamar al servicio para crear la solicitud
    this.solicitudService.crearSolicitud(solicitud).subscribe({
      next: (response) => {
        console.log('Solicitud creada:', response);
        alert('Solicitud creada con éxito.');
      },
      error: (error) => {
        console.error('Error al crear la solicitud:', error);
        alert('Ocurrió un error al crear la solicitud. Intenta nuevamente.');
      },
    });
  }
}
