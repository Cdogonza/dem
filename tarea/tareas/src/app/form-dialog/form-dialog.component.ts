import { Component } from '@angular/core';

import { RouterModule, RouterOutlet } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from '@angular/material/card';
import { TareasService } from '../services/tareas.service';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import Tarea from '../tarea';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { NavtareasComponent } from '../navtareas/navtareas.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TareasComponent } from '../tareas/tareas.component';

@Component({
  selector: 'app-form-dialog',
  standalone: true,
  imports: [NgStyle, NavtareasComponent, MatSelectModule, MatToolbarModule, MatIconModule, NgIf, 
  MatTableModule, NgFor, RouterModule, RouterOutlet, MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule, MatCardModule],
  templateUrl: './form-dialog.component.html',
  styleUrl: './form-dialog.component.css'
})
export class FormDialogComponent {
  currentDate: Date = new Date();
  formulario: FormGroup;
  selected = 'Cap. Paz';
  title = 'tareas';
  idTareaEdicion = '';
  name = '';
  nombreUser = '';
  tarea = '';
  getTareas: Tarea[] = [];
  btntareas = 'Tareas Completadas';
  leidoVar: boolean = true;
  EditarTarea: boolean;
  constructor(private tareas: TareasComponent,public dialog: MatDialog,private rroute: ActivatedRoute, private tareasService: TareasService, private userService: UserService, private route: Router,public dialogRef: MatDialogRef<FormDialogComponent>) {
    this.formulario = new FormGroup({
      nombre: new FormControl(),
      recordatorio: new FormControl(),
      jefe: new FormControl()
    });
    this.EditarTarea = false;
    //this.nombreUser = sessionStorage.getItem('nombre') || '';
  }
  ngOnInit(): void {
    this.nombreUser = this.rroute.snapshot.paramMap.get('user') ?? '';
    this.name = this.rroute.snapshot.paramMap.get('user') + '@dnsffaa.gub.uy' ?? '';
    sessionStorage.setItem('nombre', this.nombreUser);
    sessionStorage.setItem('email', this.name);

  }

  getCurrentDate(): string {
    const day = this.currentDate.getDate().toString().padStart(2, '0');
    const month = (this.currentDate.getMonth() + 1).toString().padStart(2, '0'); // Meses empiezan en 0
    const year = this.currentDate.getFullYear().toString().slice(-2); // Tomar últimos dos dígitos del año

    return `${day}-${month}-${year}`;
  }

  close(): void {
    this.dialogRef.close();
  }


  AgregarTarea() {

    const tarea = this.formulario?.value;
    if (!tarea.recordatorio) {
      alert('Debes completar todos los campos');
      return;
    }
    const tareaFinal: Tarea = {
      id: '',
      nombre: this.nombreUser,
      recordatorio: tarea.recordatorio,
      estado: 'pendiente',
      user: this.name,
      jefe: this.selected,
      comentario: [],
      coment: false,
      fecha: this.getCurrentDate()
    }
    this.tareasService.addTarea(tareaFinal).then(() => {
      this.alerta();
      this.limpiar();
      this.verTareasPendientes();

    });
  }


  verTareasPendientes(){
    this.tareas.tareasPendientes();
  }


  limpiar() {
    this.formulario?.reset();

  }
  alerta() {
    alert("Tarea añadida");

  }

}
