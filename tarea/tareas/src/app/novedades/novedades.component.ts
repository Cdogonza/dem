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
@Component({
  selector: 'app-novedades',
  standalone: true,
  imports: [RouterModule, NavtareasComponent, CommonModule, FormsModule, NgFor, NgIf, NgStyle, NgClass],
  templateUrl: './novedades.component.html',
  styleUrl: './novedades.component.css'
})

export class NovedadesComponent implements OnInit {
  fechaActual: string;
  usuario: string = '';
  tituloNovedades: string = '';
  formulario: FormGroup;
  nombreUser = '';
  constructor(private route: Router, private novedadesService: NovedadesService) {
    // Obtener la fecha actual en formato 'dd/mm/yyyy'

    const today = new Date();
    this.fechaActual = today.toLocaleDateString();
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
    this.route.navigate(['/novedades', this.nombreUser]);
  }
}
