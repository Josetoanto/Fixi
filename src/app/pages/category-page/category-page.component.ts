import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicioService } from '../../service/servicio.service';
import { HeaderClientComponent } from '../../component/header-client/header-client.component';
import { CommonModule } from '@angular/common';
import { PerfilService } from '../../service/perfil.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  imports: [HeaderClientComponent,CommonModule],
  standalone:true,
  styleUrls: ['./category-page.component.scss'],
})
export class CategoryPageComponent implements OnInit {
  perfil: any
  perfiles: any[] = [];
  categoria: string = '';

  servicios: {
    nombre: string;
    descripcion: string | null;
    tipo_servicio: string;
    ubicacion: string;
    costo: number;
    disponibilidad: boolean;
    proveedor_id: number;
    disponibilidadpago: boolean;
  }[] = [];


  constructor(
    private servicioService: ServicioService,
    private perfilService: PerfilService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categoria = this.route.snapshot.paramMap.get('categoria') || '';
    this.cargarServicios();
    //this.cargarPerfiles();
  }

  cargarServicios(): void {
    this.servicioService.getServicios().subscribe({
      next: (data: any[]) => {
        this.servicios = data.filter(
          (servicio: any) => servicio.tipo_servicio === this.categoria
        );
      },
      error: (error) => {
        console.error('Error al cargar los servicios:', error);
      },
    });
  }
  cargarPerfiles(): void {
    this.perfilService.getAllPerfiles().subscribe({
      next: (data: any) => {
        console.log(data)
        this.perfiles = data;
      },
      error: (error) => {
        console.error('Error al cargar los perfiles:', error);
      },
    });
  }

  getPerfilFoto(proveedorId: number): string | null {
    const perfil = this.perfiles.find((p: any) => p.profileId === proveedorId);
    return perfil ? perfil.foto : null;
  }
}
