import { Component , Input} from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-proyects.component.html',
  styleUrl: './dashboard-proyects.component.scss'
})
export class DashboardProyectsComponent {
  @Input() title: string = 'Montaje de muebles';
  @Input() imageSrc: string = 'assets/path-to-your-image.jpg';
}
