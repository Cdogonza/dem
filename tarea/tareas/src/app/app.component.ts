import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TareasService } from './services/tareas.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MatInputModule,MatButtonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  formulario: FormGroup;
  title = 'tareas';
 
constructor(private tareasService:TareasService ) { 
  this.formulario = new FormGroup({
    nombre: new FormControl(),
    recordatorio: new FormControl()
  });
}
onSubmit() {
  const tarea = this.formulario?.value;
  this.tareasService.addTarea(tarea).then(() => {
    console.log('Tarea añadida');
  });
}


}
