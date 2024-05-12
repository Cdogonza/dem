import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from '@angular/material/card';
import { TareasService } from '../services/tareas.service';
import { NgFor,NgIf,NgStyle } from '@angular/common';
import Tarea from '../tarea';
import { UserService } from '../services/user.service';
import {Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MatDialogTitle} from '@angular/material/dialog';
import {MatDialogContent} from '@angular/material/dialog';
import {MatDialogActions} from '@angular/material/dialog';
import {MatDialogClose} from '@angular/material/dialog';
import {NavComponent} from '../nav/nav.component';
@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [
    NgStyle,
    NavComponent,
    NgFor,
    NgIf,
    RouterModule,
    RouterOutlet,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],

  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.css'
})
export class AdministradorComponent {
openDialog() {
throw new Error('Method not implemented.');
}

  btnResolver:boolean = true;
  getTareas: Tarea[] = [];
  nombreUser='';
  btntareas= 'Tareas Completadas';
  btntareasToggle= false;
  name = '';

  constructor(private tareasService: TareasService, private UserService: UserService,
     public dialog: MatDialog)  {

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
      this.tareasService.filterBy('pendiente').subscribe((data: Tarea[]) => {
        this.getTareas = data;
        
      });

    }
    );
  }
  delete(id: Tarea['id']) {

    if (confirm("Seguro desea eliminar la tarea?") == true) {

    this.tareasService.deleteTarea(id).then(() => {
      this.tareasService.filterBy('pendiente').subscribe((data: Tarea[]) => {
        this.getTareas = data;
      });
    }

    );
  }else{
    alert('Eliminacion cancelada');
    this.tareasService.filterBy('pendiente').subscribe((data: Tarea[]) => {
      this.getTareas = data;
    });
  }
}

  ngOnInit(): void {
      // this.nombreUser = this.rroute.snapshot.paramMap.get('user') ?? '';
      this.nombreUser = sessionStorage.getItem('nombre')||'';
  }
  public verTareasCompletas(){
    this.btnResolver = true;
  this.tareasService.filterByCompletas('completado').subscribe((data: Tarea[]) => {
    this.getTareas = data;
  });
}
public verTareasPendientes(){
  this.btnResolver = false;
  this.tareasService.filterBy('pendiente').subscribe((data: Tarea[]) => {
    this.getTareas = data;
  });
}

editarTarea(id: Tarea['id']) {

    let text;
    const tarea = this.getTareas.find((tarea) => tarea.id === id);
    text = tarea?.comentario;
    let person = prompt("Ingresa el comentario:", text);
    if (person == null || person == "") {
      text = "User cancelled the prompt.";
    } else {
      person = person;
      this.tareasService.agregarComentario(id, this.nombreUser.toUpperCase()+" "+person).then(() => {
        this.tareasService.filterBy('pendiente').subscribe((data: Tarea[]) => {
          this.getTareas = data;
        }
        );

      alert("Comentario guardado");

    }
    );


 

  }
}
}