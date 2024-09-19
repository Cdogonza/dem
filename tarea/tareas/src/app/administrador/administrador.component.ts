import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from '@angular/material/card';
import { TareasService } from '../services/tareas.service';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import Tarea from '../tarea';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogTitle } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog';
import { MatDialogActions } from '@angular/material/dialog';
import { MatDialogClose } from '@angular/material/dialog';
import { NavComponent } from '../nav/nav.component';
import { HttpClientModule,HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [
    HttpClientModule,
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

  

  btnResolver: boolean = true;
  currentDate: Date = new Date();
  getTareas: any[] = [];
  getTareasCompletas: any[] = [];
  userCorreo: string = '';
  cartelesTask: boolean = false;
  cartelesTaskComplete: boolean = false;
  cartelTareas = 'No tienes Tareas Para Mostrar';
  nombreUser = '';
  btntareas = 'Tareas Completadas';
  btntareasToggle = false;
  name = '';

  constructor(public http:HttpClient,private tareasService: TareasService, private UserService: UserService,
    public dialog: MatDialog, private rroute: ActivatedRoute) {

    this.nombreUser = sessionStorage.getItem('nombre') || '';
    this.name = sessionStorage.getItem('email') || '';
  }


  resolverTarea(id: Tarea['id']) {

    this.tareasService.updateTarea(id, 'completado').then(async () => {

      this.verTareasPendientes();
      this.verTareasCompletas();

    }
    );
  }

  async deleteMiasCompletas(id: Tarea['id']) {

    if (confirm("Seguro desea eliminar la tarea?") == true) {

      this.tareasService.deleteTarea(id).then(async () => {
        this.verTareasPendientes();
        this.verTareasCompletas();
      }

      );
    } else {
      alert('Eliminacion cancelada');
      this.verTareasPendientes();
      this.verTareasCompletas();
    }
  }

  ngOnInit(): void {
    this.nombreUser = this.rroute.snapshot.paramMap.get('user') ?? '';
    this.name = this.rroute.snapshot.paramMap.get('user') + '@dnsffaa.gub.uy' ?? '';
    sessionStorage.setItem('nombre', this.nombreUser);
    sessionStorage.setItem('email', this.name);
    this.verTareasPendientes();

  }


  public async verTareasCompletas() {

    this.getTareasCompletas = await this.tareasService.filterByComplete();

    if (this.getTareasCompletas.length > 0) {
      this.cartelesTaskComplete = true;
    } else {
      this.cartelesTaskComplete = false;
    }
  }

  public async verTareasPendientes() {

    this.getTareas = await this.tareasService.filterByPendientesAut();

    if (this.getTareas.length > 0) {
      this.cartelesTask = true;
    } else {
      this.cartelesTask = false;
    }
  }

  getCurrentDate(): string {
    const day = this.currentDate.getDate().toString().padStart(2, '0');
    const month = (this.currentDate.getMonth() + 1).toString().padStart(2, '0'); // Meses empiezan en 0
    const year = this.currentDate.getFullYear().toString().slice(-2); // Tomar últimos dos dígitos del año

    return `${day}-${month}-${year}`;
  }

  enviarEmailcomentario(user: string, jefe: string) {


    let params = {
      correo: user,
      asunto: 'Tarea Pendiente',
      mensaje: 'Tienes un comentario en una tarea de '+jefe+', por favor revisa la app para mas detalles'
    }
     //  this.http.post('https://dem-back.vercel.app/',params).subscribe((data) => {
    this.http.post('https://dem-back.vercel.app/',params).subscribe((data) => {
      console.log(data);
    });
  
  
  }


  comentarTarea(id: Tarea['id']) {
    let dat = this.getCurrentDate();
    let text;
    const tarea = this.getTareas.find((tarea) => tarea.idd === id);

    let person = prompt("Ingresa el comentario:", text);
    if (person == null || person == "") {
      text = "User cancelled the prompt.";
    } else {
      person = person;
      this.tareasService.agregarComentario(id, this.nombreUser.toUpperCase()+" "+person+" "+dat).then(() => {

        if(tarea.jefe === 'Cap Paz'){
          this.userCorreo = 'gpaz@dnsffaa.gub.uy';
    
        }else
        if(tarea.jefe === 'Tte Clara'){
          this.userCorreo = 'eclara@dnsffaa.gub.uy';
        }else{
          this.userCorreo = tarea.jefe+'@dnsffaa.gub.uy';
        
        }
        this.enviarEmailcomentario(this.userCorreo, tarea.nombre);


        
        this.verTareasPendientes();
  

      }
      );
    }
  }
}