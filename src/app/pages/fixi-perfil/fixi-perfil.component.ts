import { Component, OnInit } from '@angular/core';
import { PerfilService } from '../../service/perfil.service';
import { ServicioService } from '../../service/servicio.service';
import { TokenService } from '../../service/token.service';
import { HeaderFixiComponent } from '../../component/header-fixi/header-fixi.component';
import { CurrencyPipe } from '@angular/common';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CreateServiceComponent } from '../../component/create-service/create-service.component';
import { Servicio } from '../../component/Servicio';
import { FilePreviewPipe } from '../../component/previuw-file.pipe';


@Component({
  selector: 'app-fixi-perfil',
  standalone: true,
  imports: [NgFor, CurrencyPipe, HeaderFixiComponent,FormsModule,CommonModule,CreateServiceComponent],
  templateUrl: './fixi-perfil.component.html',
  styleUrls: ['./fixi-perfil.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Permite elementos personalizados
})



export class FixiPerfilComponent implements OnInit {
  perfil: any = null;
  trabajos: Servicio[] = [];
  trabajosHechos: Servicio[] = [];
  editando: boolean = false;
  

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

  constructor(
    private perfilService: PerfilService,
    private servicioService: ServicioService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.obtenerPerfil();
    this.obtenerTrabajos();
  }

  mostrarFormulario = false;


  
  obtenerPerfil(): void {
    const perfilId = this.tokenService.getProfileId();
    if (perfilId) {
      this.perfilService.getPerfilById(perfilId).subscribe(
        (data) => {
          this.perfil = data;
          this.perfil.nombre = this.tokenService.getProfileName();
          console.log(data.imagenes)
        },
        (error) => {
          console.error('Error al obtener el perfil:', error);
        }
      );
    }
  }

  

  obtenerTrabajos(): void {
    // Obtener el ID del proveedor logueado
    const proveedorId = this.tokenService.getId();
  
    if (proveedorId) {
      // Llamada al servicio para obtener los servicios
      this.servicioService.getServicios(0, 10).subscribe(
        (data: Servicio[]) => { // Definimos que 'data' es un array de tipo Servicio
          // Filtrar los servicios para obtener solo los asociados al proveedor logueado
          const serviciosProveedor = data.filter((servicio: Servicio) => servicio.proveedor_id === proveedorId);
          
          // Filtrar los servicios en dos categorías: no hechos y hechos
          this.trabajos = serviciosProveedor.filter((trabajo: Servicio) => trabajo.status !== 'hecho');
          this.trabajosHechos = serviciosProveedor.filter((trabajo: Servicio) => trabajo.status === 'hecho');
        },
        (error) => {
          console.error('Error al obtener servicios:', error);
        }
      );
    } else {
      console.error('No se pudo obtener el ID del proveedor');
    }
  }
  

  toggleEditar(): void {
    this.editando = !this.editando;
  }
  cerrarFormulario(): void {
    this.mostrarFormulario= false
  }



  guardarCambios(): void {
    const formData = new FormData();
    const perfilId = this.tokenService.getProfileId();

  
    // Agregar datos básicos
    formData.append('nombre', this.perfil.nombre);
    formData.append('description', this.perfil.description);
    formData.append('telefono', this.perfil.telefono);
    formData.append('habilidades', JSON.stringify(this.perfil.habilidades));
    formData.append('direccion', JSON.stringify(this.perfil.direccion));
    if (perfilId){
    formData.append('perfil_id', perfilId)
    }
  
    // Manejar la foto principal
    if (this.perfil.fotoArchivo) {
      formData.append('foto', this.perfil.fotoArchivo); // Foto principal
    }
  
    // Manejar imágenes adicionales
      if (this.perfil.imagenesArchivos && this.perfil.imagenesArchivos.length > 0) {
        this.perfil.imagenesArchivos.forEach((file: File) => {
          formData.append('imagenes', file, file.name); // Agrega cada archivo individualmente
        });
      }
  
    console.log(this.convertirFormDataAObjeto(formData))
    if (perfilId) {
      console.log(formData)
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

  convertirFormDataAObjeto(formData: FormData): any {
    const obj: any = {};
  
    formData.forEach((value, key) => {
      // Si el valor es un archivo, solo guarda su nombre o mételo como File
      if (value instanceof File) {
        obj[key] = value.name; // Muestra solo el nombre
        // obj[key] = value; // Para mostrarlo completo como un File
      } else {
        obj[key] = value;
      }
    });
  
    return obj;
  }
  

  onFileSelected(event: Event, tipo: string): void {
    const input = event.target as HTMLInputElement;
  
    if (input.files?.length) {
      if (tipo === 'foto') {
        this.perfil.fotoArchivo = input.files[0]; // Foto principal
      } else if (tipo === 'imagenes') {
        console.log(input.files)
        this.perfil.imagenesArchivos = Array.from(input.files); 
        console.log(this.perfil.imagenesArchivos)
      }
    }
  }
  
  
  

  agregarTrabajo(): void {
    // Método para agregar trabajos futuros.
  }
  
}
