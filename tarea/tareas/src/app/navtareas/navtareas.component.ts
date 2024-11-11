import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
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
  nombre = '';
  rol = '';
  name= '';

  constructor(private rroute: ActivatedRoute,private userService: UserService, private route: Router) {
    this.nombreUser = sessionStorage.getItem('nombre') || '';

  }

  cargarNombreUsuario() {

 this.userService.getUserByEmail(this.nombreUser)
  .then((user) => {
    this.nombre = user.nombre;
    this.rol = user.rol;
    console.log(this.nombre);
  }
  )
  .catch((error) => {
    console.log (error);
  });
  }
  

  onclick(){ 
    this.userService.logout()
    .then(() => {
      this.route.navigate(['login']);
    })
    .catch((error) => 
      console.log(error));
    }

  //   verTareasCompletas(){
  //     this.tareas.tareasCompletadas();
  //   }
  //   verTareasPendientes(){
  //   this.tareas.tareasPendientes();
  // }
  // verTodasTareas(){
  //   this.tareas.todasLasTareas();
  // }
  ngOnInit(){
    // this.verTareasPendientes();
    this.cargarNombreUsuario();
    this.nombreUser = this.rroute.snapshot.paramMap.get('user') ?? '';
    this.name = (this.rroute.snapshot.paramMap.get('user') ?? '') + '@dnsffaa.gub.uy';
    sessionStorage.setItem('nombre', this.nombreUser);
    sessionStorage.setItem('email', this.name);
  }
}
