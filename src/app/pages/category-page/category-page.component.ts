import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicioService } from '../../service/servicio.service';
import { HeaderClientComponent } from '../../component/header-client/header-client.component';
import { CommonModule } from '@angular/common';
import { PerfilService } from '../../service/perfil.service';
import { RouterLink } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  imports: [HeaderClientComponent,CommonModule,RouterLink],
  standalone:true,
  styleUrls: ['./category-page.component.scss'],
})
export class CategoryPageComponent implements OnInit {
  perfil: any
  perfiles: any[] = [];
  categoria: string = '';

  servicios: {
    servicio_id: number,
    nombre: string;
    descripcion: string | null;
    tipo_servicio: string;
    ubicacion: string;
    costo: number;
    disponibilidad: boolean;
    proveedor_id: number;
    disponibilidadpago: boolean;
    proveedor: any
    foto:any
  }[] = [];


  constructor(
    private servicioService: ServicioService,
    private perfilService: PerfilService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.categoria = this.route.snapshot.paramMap.get('categoria') || '';
    this.cargarServicios();
  }

  cargarServicios(): void {
    this.servicioService.getServicios().subscribe({
      next: (data: any[]) => {
        const serviciosFiltrados = data.filter(
          (servicio: any) => servicio.tipo_servicio === this.categoria
        );
        this.servicios = serviciosFiltrados.map((servicio) => {
          // Obtener el proveedor
          this.userService.getUserById(servicio.proveedor_id).subscribe({
            next: (proveedor) => {
              servicio.proveedor = proveedor;

              // Usar perfil_id del proveedor para obtener la foto
              if (proveedor.perfil_id) {
                this.perfilService.getPerfilById(proveedor.perfil_id).subscribe({
                  next: (perfil) => {
                    servicio.foto = perfil.foto; // Guardar foto en el servicio
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
                `Error al obtener el proveedor con ID ${servicio.proveedor_id}:`,
                error
              );
            },
          });
          return servicio;
        });
        console.log(this.servicios)
      },
      error: (error) => {
        console.error('Error al cargar los servicios:', error);
      },
    });
  }
  

 
}
