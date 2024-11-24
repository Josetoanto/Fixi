import { Component, AfterViewInit } from '@angular/core';
import { SolicitudService, Solicitud } from '../../service/solicitud.service';
import { DatePipe } from '@angular/common';
import { HeaderClientComponent } from '../../component/header-client/header-client.component';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports:[DatePipe,CommonModule,NgFor,HeaderClientComponent],
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss'],
})
export class ServiciosComponent implements AfterViewInit {
  solicitudes: Solicitud[] = [];
  loading = true;
  error: string | null = null;

  constructor(private solicitudService: SolicitudService) {}

  obtenerSolicitudes(): void {
    this.solicitudService.obtenerSolicitudes(0, 10).subscribe({
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

  ngAfterViewInit(): void {
    this.obtenerSolicitudes();
  }
}
