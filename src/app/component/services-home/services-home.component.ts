import { Component } from '@angular/core';
import { DashboardProyectsComponent } from '../dashboard-proyects/dashboard-proyects.component';

@Component({
  selector: 'app-services-home',
  standalone: true,
  imports: [DashboardProyectsComponent],
  templateUrl: './services-home.component.html',
  styleUrl: './services-home.component.scss'
})
export class ServicesHomeComponent {

}
