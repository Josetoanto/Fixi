import { Component,Input } from '@angular/core';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() title: string = 'Título del Servicio';
  @Input() imageUrl: string = 'default.jpg';
  @Input() fixisAvailable: number = 0;
  @Input() minPrice: number = 0;
}
