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


@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [NgStyle, NavtareasComponent, MatSelectModule, MatToolbarModule, MatIconModule, NgIf, 
    MatTableModule, NgFor, RouterModule, RouterOutlet, MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule, MatCardModule],
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
  nombreUser = '';
  tarea = '';
  getTareas: Tarea[] = [];
  btntareas = 'Tareas Completadas';
  leidoVar: boolean = true;
  currentDate: Date = new Date();

  constructor(private rroute: ActivatedRoute, private tareasService: TareasService, private userService: UserService, private route: Router) {
    this.formulario = new FormGroup({
      nombre: new FormControl(),
      recordatorio: new FormControl(),
      jefe: new FormControl()
    });
    this.EditarTarea = false;

    this.nombreUser = sessionStorage.getItem('nombre') || '';
    this.name = sessionStorage.getItem('email') || '';
  }
  getCurrentDate(): string {
    const day = this.currentDate.getDate().toString().padStart(2, '0');
    const month = (this.currentDate.getMonth() + 1).toString().padStart(2, '0'); // Meses empiezan en 0
    const year = this.currentDate.getFullYear().toString().slice(-2); // Tomar últimos dos dígitos del año

    return `${day}-${month}-${year}`;
  }
  leido(id: Tarea['id']) {
    this.tareasService.editarLecturaComentario(id);
  }
  leidoflaso(id: Tarea['id']) {
    this.tareasService.editarLecturaComentarioFalso(id);
  }
  delete(id: Tarea['id']) {
    let text;
    if (confirm("Seguro desea eliminar la tarea?") == true) {

      this.tareasService.deleteTarea(id).then(() => {

        this.tareasPendientes();
      }
      );
    } else {
      alert('Eliminacion cancelada');
      this.tareasPendientes();
    }

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
      this.tareasPendientes();

    });
  }

  ngOnInit(): void {
    this.nombreUser = this.rroute.snapshot.paramMap.get('user') ?? '';
    this.name = this.rroute.snapshot.paramMap.get('user') + '@dnsffaa.gub.uy' ?? '';
    sessionStorage.setItem('nombre', this.nombreUser);
    sessionStorage.setItem('email', this.name);

  }

  public async tareasPendientes() {
    (await this.tareasService.filterByCompletasMias('pendiente', this.name)).subscribe((data: Tarea[]) => {
      this.getTareas = data;
    });
  }
  public async tareasCompletadas() {
    (await this.tareasService.filterByCompletasMias('completado', this.name)).subscribe((data: Tarea[]) => {
      this.getTareas = data;
    });
  }


  obtenerUsuarios() {
    this.name = this.userService.getUser() || '';

  }
  obtenerNombre() {
    this.nombreUser = this.userService.getUserName();
    sessionStorage.setItem('nombre', this.nombreUser);

  }

  public async todasLasTareas() {
    (await this.tareasService.getTodasLasTareas(this.name)).subscribe((data: Tarea[]) => {
      this.getTareas = data;

    });
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
    if (this.name === this.getTareas.find(tarea => tarea.id === id)?.user || this.name === 'gpaz' || this.name === 'eclara') {
      this.formulario.setControl('recordatorio', new FormControl(this.getTareas.find(tarea => tarea.id === id)?.recordatorio));
      this.EditarTarea = true;
      this.idTareaEdicion = id;

    } else {
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
      this.tareasPendientes();
      this.limpiar();
      this.EditarTarea = false;
    });
  }
  camboPas() {
    this.route.navigate(['/pass']);
  }
  adminGo() {
    this.route.navigate(['/administrador', this.nombreUser]);
  }


  comentarTarea(id: Tarea['id']) {

    let text;
    const tarea = this.getTareas.find((tarea) => tarea.id === id);
    //text = tarea?.comentario;
    let person = prompt("Ingresa el comentario:", text);
    if (person == null || person == "") {
      text = "User cancelled the prompt.";
    } else {
      person = person;
      this.tareasService.agregarComentario(id, this.nombreUser.toUpperCase()+" "+person).then(() => {
        this.tareasPendientes();

    }
    );
  }
}
}
