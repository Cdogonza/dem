import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TareasService } from './services/tareas.service';
import {MatCardModule} from '@angular/material/card';
import { NgFor } from '@angular/common';
import Tarea from './tarea';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor,RouterOutlet,MatInputModule,MatButtonModule,FormsModule,ReactiveFormsModule,MatCardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  formulario: FormGroup;
  title = 'tareas';

  name = '';
    tarea = '';
    getTareas: Tarea[] = []; // Fix: Change the type to Tarea[]
   
  constructor(private tareasService: TareasService) { 
    this.formulario = new FormGroup({
      nombre: new FormControl(),
      recordatorio: new FormControl()
    });
  }
onSubmit() {
  const tarea = this.formulario?.value;
  this.tareasService.addTarea(tarea).then(() => {
    this.alerta();
    this.limpiar();
    //recargar la pagina
    this.tareasService.getData().subscribe((data) => {
      this.getTareas = data;
    });
  });
}
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.tareasService.getData().subscribe((data) => {
    this.getTareas = data;
  });
}

limpiar() {
  this.formulario?.reset();
}
alerta(){
  alert("Tarea añadida");
}



}
