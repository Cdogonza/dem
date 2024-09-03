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
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthguardService } from '../services/authguard.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { HttpClientModule,HttpClient  } from '@angular/common/http';

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [HttpClientModule,AsyncPipe,MatDialogModule,NgStyle, NavtareasComponent, MatSelectModule, MatToolbarModule, MatIconModule, NgIf, 
      MatTableModule, NgFor, RouterModule, RouterOutlet, MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule, MatCardModule],

  templateUrl: './tareas.component.html',
  styleUrl: './tareas.component.css'
})
export class TareasComponent {

  cartelesTask:boolean = false;
  cartelTareas= 'No tienes Tareas Para Mostrar';
  toggleLabel: string = 'Solo Pendientes';
  toggleCheck: boolean = true;
  btnResolver:boolean = true;
  admin: boolean;
  selected = 'Cap. Paz';
  EditarTarea: boolean;
  formulario: FormGroup;
  title = 'tareas';
  idTareaEdicion = '';
  name = '';
  nombreUser = '';
  tarea = '';
  getTareas: any[] = [];
  getTareasPendientes: any[] = [];
  getTareasAsignadas: any[] = [];
  taskPrueba: Observable<any[]> = new Observable<any[]>();
  btntareas = 'Tareas Completadas';
  leidoVar: boolean = true;
  currentDate: Date = new Date();
  tareasJefe:boolean;
  userCorreo: string = '';

  constructor(public http:HttpClient, public dialog: MatDialog,private rroute: ActivatedRoute, 
    private tareasService: TareasService, private userService: UserService, 
    private route: Router, private authguard: AuthguardService) {

    this.formulario = new FormGroup({
      nombre: new FormControl(),
      recordatorio: new FormControl(),
      jefe: new FormControl()
    });
    this.EditarTarea = false;
    this.tareasJefe = false;
    this.nombreUser = sessionStorage.getItem('nombre') || '';
    this.name = sessionStorage.getItem('email') || '';
    this.admin = false;
  }

enviarEmail(user: string) {


  let params = {
    correo: user,
    asunto: 'Tarea Pendiente',
    mensaje: 'Jefatura te asigno una tarea en la plataforma de tareas, por favor revisa la app para mas detalles'
  }
  this.http.post('http://localhost:3000/enviar',params).subscribe((data) => {
    console.log(data);
  });


}
  toggleCheckform() {
    this.toggleCheck = !this.toggleCheck;
    if(this.toggleCheck){
      this.toggleLabel = 'Todas las tareas';
    }else{
      this.toggleLabel = 'Solo Pendientes';
    }
    this.todasLasTareasAsignadas();
    
}

  openFormDialog(): void {
    this.dialog.open(FormDialogComponent, {
      width: '50%', // Ajusta el tamaño según tus necesidades
      height: '50%', // Ajusta el tamaño según tus necesidades
    });
  }


  getCurrentDate(): string {
    const day = this.currentDate.getDate().toString().padStart(2, '0');
    const month = (this.currentDate.getMonth() + 1).toString().padStart(2, '0'); // Meses empiezan en 0
    const year = this.currentDate.getFullYear().toString().slice(-2); // Tomar últimos dos dígitos del año

    return `${day}-${month}-${year}`;
  }
  leido(id: Tarea['id']) {

    this.tareasService.editarLecturaComentario(id);
    this.todasLasTareasAsignadas();
  }

  leidoflaso(id: Tarea['id']) {

    this.tareasService.editarLecturaComentarioFalso(id);
    this.todasLasTareasAsignadas();
    this.tareasPendientes();
  }

  delete(id: Tarea['id']) {

    Confirm.show(
      'Eliminar tarea?',
      '',
      'Si',
      'No',
      () => {
        this.tareasService.deleteTarea(id).then(() => {
          Notify.success('Tarea eliminada');
          this.tareasPendientes();
          this.todasLasTareasAsignadas();
          this.tareasPendientes();
        }
        );
      },
      () => {
        Notify.failure('Eliminacion cancelada');
        this.todasLasTareasAsignadas();
      },
      {
      },
      );
    

  }
  deleteMiasCompletas(id: Tarea['id']) {

    Confirm.show(
      'Eliminar tarea?',
      '',
      'Si',
      'No',
      () => {
        this.tareasService.deleteTarea(id).then(() => {

          this.tareasCompletadasMias();
          this.tareasPendientes();
        }
        
        );
        Notify.success('Tarea eliminada');
      },
      () => {
        Notify.failure('Eliminacion cancelada');
        this.tareasCompletadasMias();
        this.tareasPendientes();
        this.tareasPendientes();
      },
      {
      },
      );


  }
  AgregarTarea() {

    const tarea = this.formulario?.value;
    if (!tarea.recordatorio) {
      alert('Debes completar todos los campos');
      return;
    }
    Loading.standard('Cargando...');
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
      

      if(tareaFinal.jefe === 'Cap Paz'){
        this.userCorreo = 'gpaz@dnsffaa.gub.uy';
  
      }else
      if(tareaFinal.jefe === 'Tte. Clara'){
        this.userCorreo = 'eclara@dnsffaa.gub.uy';
      }else{
        this.userCorreo = tareaFinal.jefe+'@dnsffaa.gub.uy';
      
      }
      this.limpiar();
      this.todasLasTareasAsignadas();

      this.enviarEmail(this.userCorreo);

      Loading.remove(2000);
      Notify.success('Tarea añadida');

    });
    
  }

  ngOnInit(): void {
    this.nombreUser = this.rroute.snapshot.paramMap.get('user') ?? '';
    this.name = this.rroute.snapshot.paramMap.get('user') + '@dnsffaa.gub.uy' ?? '';
    sessionStorage.setItem('nombre', this.nombreUser);
    sessionStorage.setItem('email', this.name);
    this.todasLasTareasAsignadas();


  }

  checkUser() {
    this.authguard.isAdmin2().then((data) => {
      this.admin = data;
    });
  }

  obtenerUsuarios() {
    this.name = this.userService.getUser() || '';

  }
  obtenerNombre() {
    this.nombreUser = this.userService.getUserName();
    sessionStorage.setItem('nombre', this.nombreUser);

  }

  public async tareasPendientes() {


      this.getTareasPendientes =  await this.tareasService.filterByCompletasMias('pendiente', this.name);
      if(this.getTareasPendientes.length > 0){
        this.cartelesTask = true;
      }else{
        this.cartelesTask = false;
      }
    
  }
  public async tareasCompletadas() {
    this.getTareasPendientes =  await this.tareasService.filterByCompletasMias('completado', this.name);
  }

  public async tareasCompletadasMias() {
    this.getTareas =  await this.tareasService.filterByCompletasMias('completado', this.name);
    if(this.getTareas.length > 0){
      this.cartelesTask = true;
    }else{
      this.cartelesTask = false;
    }
  }

  public async todasLasTareasAsignadas() {

    if(this.toggleCheck){

    
      if (this.nombreUser === 'gpaz') {

        this.getTareasAsignadas = await this.tareasService.getTasksMiasPendientes("Cap Paz");
  
      } else {
        if (this.nombreUser === 'eclara') {
  
         this.getTareasAsignadas = await this.tareasService.getTasksMiasPendientes("Tte Clara");
        } else {
          this.getTareasAsignadas = await this.tareasService.getTasksMiasPendientes(this.nombreUser);
    }}
    }else{
 
    if (this.nombreUser === 'gpaz') {

      this.getTareasAsignadas = await this.tareasService.getTasksMiasTodas("Cap Paz");

    } else {
      if (this.nombreUser === 'eclara') {

       this.getTareasAsignadas = await this.tareasService.getTasksMiasTodas("Tte Clara");
      } else {
        this.getTareasAsignadas = await this.tareasService.getTasksMiasTodas(this.nombreUser);
  }}}
  if(this.getTareasAsignadas.length > 0){
    this.cartelesTask = true;
  }else{
    this.cartelesTask = false;
  }
}
  // public async todasLasTareas() {
  //   (await this.tareasService.getTodasLasTareas(this.name)).subscribe((data: Tarea[]) => {
  //     this.getTareas = data;

  //   });
  // }

  resolverTarea(id: Tarea['id']) {

    this.tareasService.updateTarea(id, 'completado').then(async () => {
      this.todasLasTareasAsignadas();

    }
    );
  }
  btnCancelar() {
    this.EditarTarea = false;
    this.limpiar();
  }
  limpiar() {
    this.formulario?.reset();

  }
  alerta() {
    alert("Tarea añadida");

  }


  onclick() {
    this.userService.logout()
      .then(() => {
        this.route.navigate(['login']);
      })
      .catch((error) =>
        console.log(error));
  }

  editarTarea(id: Tarea['id']) {
    
    if (this.name === this.getTareasPendientes.find(tarea => tarea.idd === id)?.user) {
      this.formulario.setControl('recordatorio', new FormControl(this.getTareasPendientes.find(tarea => tarea.idd === id)?.recordatorio));
      this.EditarTarea = true;
      this.idTareaEdicion = id;
      this.changeTab('disabled');
    } else {
      alert('Solo puede editar tus tareas');
    }

  }

  changeTab(tabId: string) {
    const triggerEl = document.querySelector(`#${tabId}-tab`) as HTMLElement;
    triggerEl.click(); // Esto emula un click en el botón del tab
  }
  confirmarEdicionTarea() {

    const tarea = this.formulario?.value;
    if (!tarea || !tarea.recordatorio) {
      alert('Debes completar el campo tarea');
      return;
    }
    this.tareasService.editarTarea(this.idTareaEdicion, tarea?.recordatorio).then(() => {
      this.todasLasTareasAsignadas();
      this.tareasPendientes();
      this.limpiar();
      this.EditarTarea = false;
      alert('Tarea actualizada');
      this.changeTab('home');
      
    });
  }
  camboPas() {
    this.route.navigate(['/pass']);
  }
  adminGo() {
    this.route.navigate(['/administrador', this.nombreUser]);
  }


  comentarTarea(id: Tarea['id']) {
    let dat = this.getCurrentDate();
    let text;
    const tarea = this.getTareasAsignadas.find((tarea) => tarea.idd === id);

    let person = prompt("Ingresa el comentario:", text);
    if (person == null || person == "") {
      text = "User cancelled the prompt.";
    } else {
      person = person;
      this.tareasService.agregarComentario(id, this.nombreUser.toUpperCase()+" "+person+" "+dat).then(() => {
        this.todasLasTareasAsignadas();
        this.tareasPendientes();

    }
    );
  }
}
}
