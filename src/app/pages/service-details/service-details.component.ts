import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicioService } from '../../service/servicio.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderClientComponent } from '../../component/header-client/header-client.component';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderClientComponent],
})
export class ServiceDetailsComponent implements OnInit {
  servicio: any = null;
  fecha: string = '';
  hora: string = '';

  constructor(
    private route: ActivatedRoute,
    private servicioService: ServicioService
  ) {}

  ngOnInit(): void {
    const servicioId = this.route.snapshot.paramMap.get('id');
    console.log(servicioId)
    this.cargarServicio(servicioId);
  }

  cargarServicio(id: string | null): void {
    if (!id) return;
    this.servicioService.getServicio(parseInt(id)).subscribe({
      next: (data) => {
        this.servicio = data;
      },
      error: (error) => {
        console.error('Error al cargar el servicio:', error);
      },
    });
  }

  agendarServicio(): void {
    console.log('Servicio agendado:', {
      fecha: this.fecha,
      hora: this.hora,
      servicio: this.servicio,
    });
    alert('Servicio agendado con éxito.');
  }
}
