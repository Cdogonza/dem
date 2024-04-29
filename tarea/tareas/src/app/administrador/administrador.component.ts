import { Component, Inject } from '@angular/core';
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
import { BrowserModule } from '@angular/platform-browser';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialogTitle} from '@angular/material/dialog';
import {MatDialogContent} from '@angular/material/dialog';
import {MatDialogActions} from '@angular/material/dialog';
import {MatDialogClose} from '@angular/material/dialog';
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
     private route: Router,private rroute: ActivatedRoute,public dialog: MatDialog)  {

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

    if (confirm("Seguro desea eliminar la tarea?") == true) {

    this.tareasService.deleteTarea(id).then(() => {
      this.tareasService.filterBy('pendiente').subscribe((data) => {
        this.getTareas = data;
      });
    }

    );
  }else{
    alert('Eliminacion cancelada');
    this.tareasService.filterBy('pendiente').subscribe((data) => {
      this.getTareas = data;
    });
  }
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

editarTarea(id: Tarea['id']) {

    let text;
    const tarea = this.getTareas.find((tarea) => tarea.id === id);
    let person = prompt("Ingresa el comentario:", tarea?.recordatorio ?? '');
    if (person == null || person == "") {
      text = "User cancelled the prompt.";
    } else {
      this.tareasService.editarTarea(id, person).then(() => {
        this.tareasService.filterBy('pendiente').subscribe((data) => {
          this.getTareas = data;
        }

        );

      alert("Comentario guardado");

    }
    );


 

  }
}
}