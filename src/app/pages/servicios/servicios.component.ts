import { Component, AfterViewInit } from '@angular/core';
import { SolicitudService } from '../../service/solicitud.service';
import { DatePipe } from '@angular/common';
import { HeaderClientComponent } from '../../component/header-client/header-client.component';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ServicioService } from '../../service/servicio.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports:[DatePipe,CommonModule,NgFor,HeaderClientComponent],
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss'],
})
export class ServiciosComponent implements AfterViewInit {
  solicitudes: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private solicitudService: SolicitudService, private servicioService: ServicioService, private router: Router) {}

  obtenerSolicitudes(): void {
    this.solicitudService.obtenerSolicitudes(0, 20).subscribe({
      next: (data) => {
        console.log(data)
        this.solicitudes = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar solicitudes', err);
        this.error =
          err.error?.detail || 'Error desconocido. Intenta de nuevo más tarde.';
        this.loading = false;
      },
    });
  }
  cancelarSolicitud(solicitudId: number): void {
    if (!confirm('¿Estás seguro de que deseas cancelar esta solicitud?')) {
      return;
    }

    this.solicitudService.cancelarSolicitud(solicitudId, true).subscribe({
      next: (data) => {
        console.log('Solicitud cancelada:', data);
        this.obtenerSolicitudes();

       

        alert('La solicitud ha sido cancelada exitosamente.');
      },
      error: (err) => {
        console.error('Error al cancelar solicitud', err);
        alert(
          'Hubo un problema al cancelar la solicitud. Intenta nuevamente más tarde.'
        );
      },
    });
  }

  iniciarChat(servicioId: number): void {
    this.servicioService.getServicio(servicioId).subscribe({
      next: (servicio) => {
        const proveedorId = servicio.proveedor_id;
        console.log('Proveedor ID:', proveedorId);
        // Redirigir al componente de chat con el idProveedor
        this.router.navigate(['/chat'], {
          queryParams: { proveedorId },
        });
      },
      error: (err) => {
        console.error('Error al obtener el servicio:', err);
        alert('No se pudo iniciar el chat. Intenta más tarde.');
      },
    });
  }


  ngAfterViewInit(): void {
    this.obtenerSolicitudes();
  }
}
