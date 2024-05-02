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
import {MatIconModule} from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import { NavComponent } from '../nav/nav.component';


@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [NavComponent,MatSelectModule,MatToolbarModule,MatIconModule,NgIf,MatTableModule,NgFor,RouterModule,RouterOutlet,MatInputModule,MatButtonModule,FormsModule,ReactiveFormsModule,MatCardModule],
  templateUrl: './tareas.component.html',
  styleUrl: './tareas.component.css'
})
export class TareasComponent {

  selected = 'Cap. Paz';
  
EditarTarea: boolean;
formulario: FormGroup;
title = 'tareas'; 
idTareaEdicion = '';
  name = '';
  nombreUser='';
  tarea = '';
  getTareas: Tarea[] = []; 
  btntareas= 'Tareas Completadas';
  btntareasToggle= false;
  estadoTarea:boolean = false;
   
  constructor(private rroute: ActivatedRoute,private tareasService: TareasService, private userService: UserService, private route: Router) { 
    this.formulario = new FormGroup({
      nombre: new FormControl(),
      recordatorio: new FormControl()
    });
    this.EditarTarea = false;
  
    this.nombreUser = sessionStorage.getItem('nombre')||'';
    
  }

  

  delete(id: Tarea['id']) {
    let text;
    if (confirm("Seguro desea eliminar la tarea?") == true) {
     
      this.tareasService.deleteTarea(id).then(() => {
     
        this.tareasService.filterByUser(this.name).subscribe((data) => {
          this.getTareas = data;
          });
      }
      );
    } else {
      alert('Eliminacion cancelada');
      this.tareasService.filterByUser(this.name).subscribe((data) => {
        this.getTareas = data;
        });
    }
    
  }

  AgregarTarea() {
    
    const tarea = this.formulario?.value;
    if (!tarea.recordatorio) {
      alert('Debes completar todos los campos');
      return;
    }
    const tareaFinal:Tarea = {
      id: '',
      nombre: this.nombreUser,
      recordatorio: tarea.recordatorio,
      estado: 'pendiente',
      user: this.name,
      jefe: this.selected
    }
    this.tareasService.addTarea(tareaFinal).then(() => {
      this.alerta();
      this.limpiar();
      this.tareasService.filterByUser(this.name).subscribe((data) => {
        this.getTareas = data;
        });
      
    });
  }
  ngOnInit(): void {
   
    this.obtenerUsuarios();
    this.obtenerNombre();
    this.nombreUser = this.rroute.snapshot.paramMap.get('user') ?? '';
    localStorage.setItem('nombre', this.nombreUser);
    //this.nombreUser = sessionStorage.getItem('nombre')?? '';
    this.todasLasTareas();
    // this.tareasService.filterByUser(this.name).subscribe((data) => {
    // this.getTareas = data;
    // });

        
  }
vistaTareas(estado:boolean){
  if(estado){
    this.btntareas = 'Tareas Pendientes';
    this.tareasPendientes();
    this.btntareasToggle = false;
  }else{
    this.btntareas = 'Tareas Completadas';
    this.tareasCompletadas();
    this.btntareasToggle = true;
  }}

  tareasPendientes(){
    this.tareasService.filterByCompletasMias('pendiente', this.name).subscribe((data) => {
      this.getTareas = data;
    });
  }
  tareasCompletadas(){

  this.tareasService.filterByCompletasMias('completado', this.name).subscribe((data) => {
    this.getTareas = data;
  });
}


  obtenerUsuarios(){
    this.name = this.userService.getUser()||'';
  }
  obtenerNombre(){
    this.nombreUser = this.userService.getUserName();
    sessionStorage.setItem('nombre', this.nombreUser);
  }
    

  // mostrar tarea del usuario
  filterByUser() {
    this.tareasService.filterByUser(this.name).subscribe((data) => {
      this.getTareas = data;
    });
  }
  todasLasTareas() {
    this.tareasService.getTodasLasTareas(this.name).subscribe((data) => {
      this.getTareas = data;
    });
  }
  
  btnCancelar(){
    this.EditarTarea = false;
    this.limpiar();
  }
  limpiar() {
    this.formulario?.reset();
  }
  alerta(){
    alert("Tarea añadida");

  }


  onclick(){ 
    this.userService.logout()
    .then(() => {
      this.route.navigate(['login']);
    })
    .catch((error) => 
      console.log(error));
    }

    editarTarea(id: Tarea['id']) {
      if(this.name === this.getTareas.find(tarea => tarea.id === id)?.user || this.name === 'gpaz' || this.name === 'eclara'){
      this.formulario.setControl('recordatorio', new FormControl(this.getTareas.find(tarea => tarea.id === id)?.recordatorio));
      this.EditarTarea = true;
      this.idTareaEdicion = id;

      }else{
        alert('Solo puede editar tus tareas');
      }
      
    }
    confirmarEdicionTarea() {
      
      const tarea = this.formulario?.value;
      if (!tarea || !tarea.recordatorio) {
        alert('Debes completar el campo tarea');
        return;
      }
      this.tareasService.editarTarea(this.idTareaEdicion, tarea?.recordatorio).then(() => {
        this.filterByUser();
        this.limpiar();
        this.EditarTarea = false;
      });
    }
    camboPas(){
      this.route.navigate(['/pass']);
    } 
    adminGo(){
      this.route.navigate(['/administrador', this.nombreUser]);
    } 
}
