import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { NavtareasComponent } from "../navtareas/navtareas.component";
import { ActivatedRoute, RouterModule, RouterOutlet, RouterLink} from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavComponent, NavtareasComponent,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  nombreUser = '';

  constructor() {
    this.nombreUser = sessionStorage.getItem('nombre') || '';
  }
}
