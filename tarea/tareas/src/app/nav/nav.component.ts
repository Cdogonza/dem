import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AdministradorComponent } from '../administrador/administrador.component';
@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule,
    RouterOutlet
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  nombreUser='';
  nombre = '';
  rol = '';

  constructor(private admin:AdministradorComponent,private userService: UserService, private route: Router) {
    this.nombreUser = sessionStorage.getItem('nombre')||'';
   }
   
   cargarNombreUsuario() {

    this.userService.getUserByEmail(this.nombreUser)
     .then((user) => {
       this.nombre = user.nombre;
       this.rol = user.rol;
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

  ngOnInit(): void {
   
    this.cargarNombreUsuario();

  }
}
