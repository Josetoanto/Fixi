import { ServicioService } from '../../service/servicio.service';
import { TokenService } from '../../service/token.service';
import { FormsModule } from '@angular/forms';
import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.scss'],
  imports:[FormsModule],
  standalone: true,
})
export class CreateServiceComponent {
  @Input() perfil: any; 
  @Output() cancelarEvento = new EventEmitter<void>(); // Emite el evento al padre

  servicio = {
    tipo_servicio: '',
    ubicacion: '',
    costo: 0,
    disponibilidad: true,
    disponibilidadpago: true,
    descripcion: '',
  };

  constructor(
    private servicioService: ServicioService,
  ) {}

  ngOnInit() {
    this.servicio.tipo_servicio = String(this.perfil?.habilidades[0] || '');
    this.servicio.ubicacion = this.perfil?.direccion?.ciudad || '';
  }

  crearServicio() {
    console.log(this.servicio)
    this.servicioService.createServicio(this.servicio).subscribe(
      (response) => {
        alert('Servicio creado exitosamente');
        console.log(response)
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
