import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from '@angular/material/card';
import { TareasService } from '../services/tareas.service';
import { NgFor,NgIf } from '@angular/common';
import Tarea from '../tarea';
import { UserService } from '../services/user.service';
import {canActivate} from '@angular/fire/auth-guard';
import {Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    RouterModule,
    RouterOutlet,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    
  ],

  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.css'
})
export class AdministradorComponent {

  btnResolver:boolean = true;
  getTareas: Tarea[] = [];
  nombreUser='';
  btntareas= 'Tareas Completadas';
  btntareasToggle= false;

  constructor(private tareasService: TareasService, private UserService: UserService,
     private route: Router,private rroute: ActivatedRoute) {

      this.nombreUser = sessionStorage.getItem('nombre')||'';
     }

vistaTareas(estado:boolean){
  if(estado){
    this.btntareas = 'Tareas Completadas';
    this.verTareasPendientes();
    this.btntareasToggle = false;
  }else{
    this.btntareas = 'Tareas Pendientes';
    this.verTareasCompletas();
    this.btntareasToggle = true;
  }}

  resolverTarea(id: Tarea['id']) {
    this.tareasService.updateTarea(id, 'completado').then(() => {
      this.tareasService.filterBy('pendiente').subscribe((data) => {
        this.getTareas = data;
        
      });

    }
    );
  }
  delete(id: Tarea['id']) {
    this.tareasService.deleteTarea(id).then(() => {
      this.tareasService.filterBy('pendiente').subscribe((data) => {
        this.getTareas = data;
      });
    }
    );
  }

  ngOnInit(): void {
    // this.nombreUser = this.rroute.snapshot.paramMap.get('user') ?? '';
    this.nombreUser = sessionStorage.getItem('nombre')||'';
    this.verTareasPendientes();
  }
  verTareasCompletas(){
    this.btnResolver = true;
  this.tareasService.filterByCompletas('completado').subscribe((data) => {
    this.getTareas = data;
  });
}
verTareasPendientes(){
  this.btnResolver = false;
  this.tareasService.filterBy('pendiente').subscribe((data) => {
    this.getTareas = data;
  });
}

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
  //   if (this.authService.isAdmin()) {
  //     return true; // Permite el acceso si el usuario es un administrador
  //   } else {
  //     return this.route.createUrlTree(['/not-authorized']); // Redirige a una página de no autorizado si el usuario no es un administrador
  //   }
  // }

  // mostrar mensaje en el caso que no haya tareas pendientes
   
}
