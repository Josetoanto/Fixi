import { ServicioService } from '../../service/servicio.service';
import { TokenService } from '../../service/token.service';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.scss'],
  imports: [FormsModule,NgFor],
  standalone: true,
})
export class CreateServiceComponent {
  @Input() perfil: any;
  @Output() cancelarEvento = new EventEmitter<void>(); // Emite el evento al padre

  // Lista de profesiones
  profesiones: string[] = [
    'Limpieza',
    'Jardinería',
    'Electricidad',
    'Fontanería',
    'Pintura',
    'Montaje de muebles',
    'Albañilería',
    'Mudanza',
    'Carpintería'
  ];

  // Lista de ciudades
  ciudades: string[] = [
    'Tuxtla Gutierrez',
    'San Cristobal de las Casas',
    'Comitan de Domínguez',
    'Tapachula',
    'Palenque',
    'Chiapa de Corzo',
    'Tonala',
    'Villaflores',
    'Ocosingo',
    'Cintalapa'
  ];

  servicio = {
    tipo_servicio: '',
    ubicacion: '',
    costo: 0,
    disponibilidad: true,
    disponibilidadpago: true,
    descripcion: '',
  };

  constructor(private servicioService: ServicioService) {}

  ngOnInit() {
    // Inicializa el tipo de servicio y la ubicación con los valores del perfil
    this.servicio.tipo_servicio = String(this.perfil?.habilidades[0] || '');
    this.servicio.ubicacion = this.perfil?.direccion?.ciudad || '';
  }

  crearServicio() {
    console.log(this.servicio);
    this.servicioService.createServicio(this.servicio).subscribe(
      (response) => {
        alert('Servicio creado exitosamente');
        console.log(response);
        this.cancelar();
      },
      (error) => {
        console.error('Error al crear el servicio:', error);
      }
    );
  }

  cancelar() {
    console.log('Creación cancelada');
    this.cancelarEvento.emit(); // Notifica al componente padre
  }
}
