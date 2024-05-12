import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TareasComponent } from '../tareas/tareas.component';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navtareas',
  standalone: true,
  imports: [RouterModule,
    RouterOutlet],
  templateUrl: './navtareas.component.html',
  styleUrl: './navtareas.component.css'
})
export class NavtareasComponent {

  nombreUser = '';

  constructor(private tareas: TareasComponent,private userService: UserService, private route: Router) {
    this.nombreUser = sessionStorage.getItem('nombre') || '';
  }
  onclick(){ 
    this.userService.logout()
    .then(() => {
      this.route.navigate(['login']);
    })
    .catch((error) => 
      console.log(error));
    }

    verTareasCompletas(){
      this.tareas.tareasCompletadas();
    }
    verTareasPendientes(){
    this.tareas.tareasPendientes();
  }
  verTodasTareas(){
    this.tareas.todasLasTareas();
  }
  ngOnInit(){
    this.verTareasPendientes();
    
  }
}
