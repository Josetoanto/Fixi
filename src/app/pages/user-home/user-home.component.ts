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
    { title: 'Limpieza', imageUrl: 'limpieza.jpg', fixisAvailable: 0, minPrice: 123 },
    { title: 'Jardinería', imageUrl: 'jardineria.jpg', fixisAvailable: 0, minPrice: 100 },
    { title: 'Electricidad', imageUrl: 'electricidad.jpeg', fixisAvailable: 0, minPrice: 105 },
    { title: 'Fontanería', imageUrl: 'fontaneria.jpeg', fixisAvailable: 0, minPrice: 200 },
    { title: 'Pintura', imageUrl: 'pintura.jpeg', fixisAvailable: 0, minPrice: 5000 },
    { title: 'Montaje de muebles', imageUrl: 'motajeMueble.jpeg', fixisAvailable: 0, minPrice: 65 },
    { title: 'Construccion', imageUrl: 'albanileria.jpeg', fixisAvailable: 0, minPrice: 90 },
    { title: 'Mudanza', imageUrl: 'mudanza.jpeg', fixisAvailable: 0, minPrice: 1234 },
    { title: 'Carpintería', imageUrl: 'carpinteria.jpeg', fixisAvailable: 0, minPrice: 500 }
];

profesiones: string[] = [
  'Limpieza',
  'Jardinería',
  'Electricidad',
  'Fontanería',
  'Pintura',
  'Montaje de muebles',
  'Construccion',
  'Mudanza',
  'Carpintería'
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
