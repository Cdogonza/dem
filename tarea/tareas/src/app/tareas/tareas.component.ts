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
import {MatTableModule} from '@angular/material/table';




@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [NgIf,MatTableModule,NgFor,RouterModule,RouterOutlet,MatInputModule,MatButtonModule,FormsModule,ReactiveFormsModule,MatCardModule],
  templateUrl: './tareas.component.html',
  styleUrl: './tareas.component.css'
})
export class TareasComponent {

displayedColumns: string[] = ['NOMBRE', 'TAREA', 'ESTADO'];
  
estado: boolean = false;
  formulario: FormGroup;
  title = 'tareas';
  

  name = '';
  tarea = '';
    getTareas: Tarea[] = []; 

   
  constructor(private tareasService: TareasService, private UserService: UserService, private route: Router) { 
    this.formulario = new FormGroup({
      nombre: new FormControl(),
      recordatorio: new FormControl()
    });

  }
 

  onSubmit() {
    
    const tarea = this.formulario?.value;
    if (!tarea.nombre || !tarea.recordatorio) {
      alert('Debes completar todos los campos');
      return;
    }
    const tareaFinal:Tarea = {
      id: '',
      nombre: tarea.nombre,
      recordatorio: tarea.recordatorio,
      estado: 'pendiente'
    }
    this.tareasService.addTarea(tareaFinal).then(() => {
  
      this.limpiar();
      this.tareasService.getData().subscribe((data) => {
        this.getTareas = data;
        
      });
      this.alerta();
    });
  }
  ngOnInit(): void {

    this.tareasService.getData().subscribe((data) => {
      this.getTareas = data;
      
    });
  }


  // id: Tarea['id']
  
  limpiar() {
    this.formulario?.reset();
  }
  alerta(){
    alert("Tarea añadida");
  }


  onclick(){ 
    this.UserService.logout()
    .then(() => {
      this.route.navigate(['login']);
    })
    .catch((error) => 
      console.log(error));
    }
}
