import { Component, AfterViewInit } from '@angular/core';
import { SolicitudService } from '../../service/solicitud.service';
import { DatePipe } from '@angular/common';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ServicioService } from '../../service/servicio.service';
import { Router } from '@angular/router';
import { HeaderFixiComponent } from '../../component/header-fixi/header-fixi.component';
import { PerfilService } from '../../service/perfil.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-servicios-fixi',
  standalone: true,
  imports:[DatePipe,CommonModule,NgFor,HeaderFixiComponent],
  templateUrl: './servicios-fixi.component.html',
  styleUrl: './servicios-fixi.component.scss'
})
export class ServiciosFixiComponent implements AfterViewInit {
  solicitudes: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private solicitudService: SolicitudService, private userService: UserService,private perfilService: PerfilService,private servicioService: ServicioService, private router: Router) {}

  obtenerSolicitudes(): void {
    this.solicitudService.obtenerSolicitudes(0, 20).subscribe({
      next: (data) => {
        // Filtramos las solicitudes canceladas
        this.solicitudes = data.filter(solicitud => !solicitud.cancelado);
  
        // Ordenamos las solicitudes por fecha de servicio (más cercano primero)
        this.solicitudes.sort((a, b) => {
          const fechaA = new Date(a.fecha_servicio);
          const fechaB = new Date(b.fecha_servicio);
          return fechaA.getTime() - fechaB.getTime(); // Orden ascendente
        });
  
        this.loading = false;
        console.log(data);
  
        this.solicitudes.forEach((solicitud) => {
          const clienteId = solicitud.cliente_id;
          if (clienteId) {
            this.userService.getUserById(clienteId).subscribe({
              next: (user) => {
                const profileId = user.perfil_id;
                solicitud.user_id = user.user_id;
                solicitud.name = user.name;
                solicitud.email = user.email;
                solicitud.chatId = user.user_id;
  
                if (profileId) {
                  this.perfilService.getPerfilById(profileId).subscribe({
                    next: (perfil) => {
                      solicitud.perfil = perfil;
                    },
                    error: (err) => {
                      console.error(`Error al obtener el perfil del cliente ${clienteId}:`, err);
                    }
                  });
                }
              },
              error: (err) => {
                console.error(`Error al obtener el usuario con ID ${clienteId}:`, err);
              }
            });
          }
        });
      },
      error: (err) => {
        console.error('Error al cargar solicitudes', err);
        this.error = err.error?.detail || 'Error desconocido. Intenta de nuevo más tarde.';
        this.loading = false;
      },
    });
  }

  cancelarSolicitud(solicitudId: number): void {
    if (!confirm('¿Estás seguro de que deseas cancelar esta solicitud?')) {
      return;
    }

    this.solicitudService.cancelarSolicitud(solicitudId, true).subscribe({
      next: () => {
        this.obtenerSolicitudes();
        alert('La solicitud ha sido cancelada exitosamente.');
      },
      error: (err) => {
        console.error('Error al cancelar solicitud', err);
        alert('Hubo un problema al cancelar la solicitud. Intenta nuevamente más tarde.');
      },
    });
  }

  aceptarSolicitud(solicitudId: number): void {
    this.solicitudService.actualizarEstadoSolicitud(solicitudId, 'ACEPTADO').subscribe({
      next: () => {
        this.obtenerSolicitudes();  // Actualizar la lista de solicitudes
        alert('Solicitud aceptada exitosamente.');
      },
      error: (err) => {
        console.error('Error al aceptar solicitud', err);
        alert('Hubo un problema al aceptar la solicitud. Intenta nuevamente más tarde.');
      }
    });
  }

  finalizarSolicitud(solicitudId: number): void {
    this.solicitudService.actualizarEstadoSolicitud(solicitudId, 'FINALIZADO').subscribe({
      next: () => {
        this.obtenerSolicitudes();  // Actualizar la lista de solicitudes
        alert('Solicitud finalizada exitosamente.');
      },
      error: (err) => {
        console.error('Error al finalizar solicitud', err);
        alert('Hubo un problema al finalizar la solicitud. Intenta nuevamente más tarde.');
      }
    });
  }

  iniciarChat(proveedorId: number): void {
    if(proveedorId){
      this.router.navigate(['/chat'], {
        queryParams: { proveedorId },
      });
    } else {
      alert("Error");
    }
  }

  ngAfterViewInit(): void {
    this.obtenerSolicitudes();
  }
}
