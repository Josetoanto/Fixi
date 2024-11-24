import { Component } from '@angular/core';
import { APP_VERSION } from '../../environment/version'; // Ajusta la ruta según tu estructura de carpetas


@Component({
  selector: 'app-footer-home',
  standalone: true,
  imports: [],
  templateUrl: './footer-home.component.html',
  styleUrl: './footer-home.component.scss'
})
export class FooterHomeComponent {
  version = APP_VERSION.version;
  build = APP_VERSION.build;

  showVersion(): void {
    alert(`Versión: ${this.version}\nBuild: ${this.build}`);
  }
}
