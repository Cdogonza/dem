import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavtareasComponent } from '../navtareas/navtareas.component';
import { NgFor, NgIf, NgStyle, NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NovedadesService } from '../services/novedades.service';
import Novedad from '../novedad';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix';
import { TelegramService } from '../services/telegram.service';
@Component({
  selector: 'app-novedades',
  standalone: true,
  imports: [RouterModule, NavtareasComponent, CommonModule, FormsModule, NgFor, NgIf, NgStyle, NgClass],
  templateUrl: './novedades.component.html',
  styleUrl: './novedades.component.css'
})

export class NovedadesComponent implements OnInit {
  fechaActual: String = '';
  usuario: string = '';
  tituloNovedades: string = '';
  formulario: FormGroup;
  nombreUser = '';
  constructor(private route: Router, private novedadesService: NovedadesService, private telegramService: TelegramService) {
    // Obtener la fecha actual en formato 'dd/mm/yyyy'
    const today = new Date(); // Obtiene la fecha actual
    const day: string = String(today.getDate()).padStart(2, '0'); // Obtiene el día y lo formatea con dos dígitos
    const month: string = String(today.getMonth() + 1).padStart(2, '0'); // Obtiene el mes (0-11, así que sumamos 1) y lo formatea
    const year: string = String(today.getFullYear()); // Obtiene el año

    const hoy=  day+ '/' + month + '/' + year;
    this.fechaActual = hoy;
    this.formulario = new FormGroup({
      fechaActual: new FormControl(),
      tituloNovedades: new FormControl(),
      nombreUser: new FormControl(),
    });
    this.nombreUser = sessionStorage.getItem('nombre') || '';
  }

  ngOnInit(): void {

    this.nombreUser = sessionStorage.getItem('nombre') || '';

  }

  publicar(): void {
    Loading.standard('Cargando...');
    const novedad = this.formulario?.value;

    const novedadNovedad: Novedad = {
      fecha: this.fechaActual,
      nombre: this.nombreUser,
      novedad: this.tituloNovedades
    }
    
    Loading.remove(2000);
    Notify.success('Novedad añadida');

    this.novedadesService.addNovedad(novedadNovedad);
    this.formulario.reset();
    this.adminGo();

    // Aquí podrías hacer una llamada a un servicio para guardar los datos
  }
  adminGo() {
    this.route.navigate(['/home', this.nombreUser]);
  }
 async sendMessageToTelegram(): Promise<void> {
  const message = `Nueva novedad publicada:
    
  Fecha: ${this.fechaActual}
  Usuario: ${this.nombreUser}
  Novedad: ${this.tituloNovedades}`;

   try {
     await this.telegramService.sendMessage(message);
     console.log('Mensaje enviado correctamente.');
   } catch (error) {
     console.error('Error al enviar el mensaje:', error);
   }
 }
}
