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
import { Router } from '@angular/router';
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
    MatCardModule
  ],

  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.css'
})
export class AdministradorComponent {

  getTareas: Tarea[] = [];
  constructor(private tareasService: TareasService, private UserService: UserService, private route: Router) {}


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

    this.tareasService.filterBy('pendiente').subscribe((data) => {
      this.getTareas = data;
    });

  }


  // mostrar mensaje en el caso que no haya tareas pendientes
   
}
