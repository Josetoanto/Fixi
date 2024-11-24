import { Component, AfterViewInit } from '@angular/core';
import { HeaderClientComponent } from '../../component/header-client/header-client.component';
import { CardComponent } from '../../component/card/card.component';
import { NgFor } from '@angular/common';
import { ServicioService } from '../../service/servicio.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [HeaderClientComponent, CardComponent, NgFor,RouterModule],
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss'],
})
export class UserHomeComponent implements AfterViewInit {
  cards = [
    { title: 'Limpieza', imageUrl: 'limpieza.jpg', fixisAvailable: 0, minPrice: 50 },
    { title: 'Jardinería', imageUrl: 'jardineria.jpg', fixisAvailable: 0, minPrice: 75 },
    { title: 'Electricidad', imageUrl: 'electricidad.jpeg', fixisAvailable: 0, minPrice: 100 },
    { title: 'Fontanería', imageUrl: 'fontaneria.jpeg', fixisAvailable: 0, minPrice: 80 },
    { title: 'Pintura', imageUrl: 'pintura.jpeg', fixisAvailable: 0, minPrice: 120 },
    { title: 'Montaje de muebles', imageUrl: 'motajeMueble.jpeg', fixisAvailable: 0, minPrice: 65 },
  ];

  constructor(private servicioService: ServicioService) {}

  ngAfterViewInit(): void {
    this.loadServicios();
  }

  loadServicios(): void {
    console.log("Obteniendo servicios");
    this.servicioService.getServicios().subscribe({
      next: (response) => {
        console.log(response)
        this.updateFixisAvailable(response);
      },
      error: (error) => {
        console.error('Error al cargar los servicios:', error);
      },
      complete: () => {
        console.log('Carga de servicios completada.');
      }
    });
  }
  
  private updateFixisAvailable(servicios: any[]): void {
    this.cards.forEach((card) => (card.fixisAvailable = 0));

    servicios.forEach((servicio) => {
      const card = this.cards.find((c) => c.title === servicio.tipo_servicio);
      if (card) {
        card.fixisAvailable++;
      }
    });
  }
}
