import { Component } from '@angular/core';
import { ServiciosComponent } from '../servicios/servicios.component';
@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [ServiciosComponent],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.scss'
})
export class HistorialComponent {
  
}
