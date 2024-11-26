import { Component, AfterViewInit } from '@angular/core';
import { SolicitudService } from '../../service/solicitud.service';
import { PagoService } from '../../service/pago.service';  // Importa el PagoService
import { DatePipe } from '@angular/common';
import { HeaderClientComponent } from '../../component/header-client/header-client.component';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ServicioService } from '../../service/servicio.service';
import { Route, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [DatePipe, CommonModule, NgFor, HeaderClientComponent,FormsModule],
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss'],
})
export class ServiciosComponent implements AfterViewInit {
  solicitudes: any[] = [];
  loading = true;
  error: string | null = null;
  selectedSolicitud: any = null; // Solicitud seleccionada para pagar
  pagoData = {
    solicitud_id: 0,
    direccion: {
      ciudad: '',
      colonia: '',
      avenida: '',
      numexterior: 0,
      codigopost: 0,
    },
    tarjeta: {
      numero: 0,
      nombre: '',
      cvc: 0,
    },
  };

  constructor(
    private solicitudService: SolicitudService,
    private pagoService: PagoService, // Inyectamos el PagoService
    private servicioService: ServicioService,
    private router: Router
  ) {}

  obtenerSolicitudes(): void {
    this.solicitudService.obtenerSolicitudes(0, 100).subscribe({
      next: (data) => {
        // Filtrar solicitudes canceladas y ordenar por fecha
        this.solicitudes = data
          .filter(solicitud => !solicitud.cancelado) // Eliminar solicitudes canceladas
          .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()); // Ordenar por fecha ascendente
  
        this.loading = false;
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
      next: (data) => {
        console.log('Solicitud cancelada:', data);
        this.obtenerSolicitudes();
        alert('La solicitud ha sido cancelada exitosamente.');
      },
      error: (err) => {
        console.error('Error al cancelar solicitud', err);
        alert('Hubo un problema al cancelar la solicitud. Intenta nuevamente más tarde.');
      },
    });
  }

  iniciarChat(servicioId: number): void {
    this.servicioService.getServicio(servicioId).subscribe({
      next: (servicio) => {
        const proveedorId = servicio.proveedor_id;
        console.log('Proveedor ID:', proveedorId);
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

  // Método para seleccionar la solicitud y mostrar el formulario de pago
  seleccionarSolicitud(solicitud: any): void {
    // Mostrar el formulario de pago solo si el estado es 'ACEPTADO' o 'FINALIZADO' y no está cancelada
    if ((solicitud.status === 'ACEPTADO' || solicitud.status === 'FINALIZADO') && !solicitud.cancelado) {
      this.selectedSolicitud = solicitud;
    }
  }
  

  // Método para realizar el pago
  realizarPago(): void {
    this.pagoData.solicitud_id = this.selectedSolicitud.solicitud_id;
    this.pagoService.createPago(this.pagoData).subscribe({
      next: (data) => {
        console.log('Pago realizado:', data);
        alert('Pago realizado con éxito');
        this.selectedSolicitud = null; // Resetear la solicitud seleccionada
        this.obtenerSolicitudes(); // Actualizar la lista de solicitudes
      },
      error: (err) => {
        console.error('Error al realizar el pago', err);
        alert('Hubo un problema al realizar el pago. Intenta nuevamente más tarde.');
      },
    });
  }

  ngAfterViewInit(): void {
    this.obtenerSolicitudes();
  }
}
