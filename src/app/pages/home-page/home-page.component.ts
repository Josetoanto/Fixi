import { Component } from '@angular/core';
import { HeaderHomeComponent } from '../../component/header-home/header-home.component';
import { ServicesHomeComponent } from '../../component/services-home/services-home.component';
import { FooterHomeComponent } from '../../component/footer-home/footer-home.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HeaderHomeComponent,ServicesHomeComponent,FooterHomeComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
