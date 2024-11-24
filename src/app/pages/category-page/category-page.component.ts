import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicioService } from '../../service/servicio.service';
import { HeaderClientComponent } from '../../component/header-client/header-client.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  imports: [HeaderClientComponent,CommonModule],
  standalone:true,
  styleUrls: ['./category-page.component.scss'],
})
export class CategoryPageComponent implements OnInit {
  servicios: any[] = [];
  categoria: string = '';

  constructor(
    private servicioService: ServicioService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categoria = this.route.snapshot.paramMap.get('categoria') || '';
    this.cargarServicios();
  }

  cargarServicios(): void {
    this.servicioService.getServicios().subscribe({
      next: (data: any) => {
        console.log("Obteniendo servicios")
        this.servicios = data.filter(
          (servicio: any) => servicio.tipo_servicio === this.categoria
          
        );
      },
      error: (error) => {
        console.error('Error al cargar los servicios:', error);
      }
    });
  }
}
