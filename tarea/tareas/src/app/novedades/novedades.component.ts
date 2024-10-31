import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavtareasComponent } from '../navtareas/navtareas.component';
import { NgFor, NgIf, NgStyle,NgClass } from '@angular/common';
import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-novedades',
  standalone: true,
  imports: [RouterModule,NavtareasComponent,CommonModule ,FormsModule, NgFor, NgIf, NgStyle,NgClass],
  templateUrl: './novedades.component.html',
  styleUrl: './novedades.component.css'
})

export class NovedadesComponent implements OnInit {
  fechaActual: string;
  usuario: string | null = '';
  tituloNovedades: string = '';
  constructor(private route: ActivatedRoute) {
    // Obtener la fecha actual en formato 'dd/mm/yyyy'

    const today = new Date();
    this.fechaActual = today.toLocaleDateString();
  }

  ngOnInit(): void {

      this.usuario = this.route.snapshot.paramMap.get('user') ?? '';
 
  }

  publicar(): void {
    // Aquí puedes manejar la lógica para almacenar los valores
    console.log('Fecha:', this.fechaActual);
    console.log('Usuario:', this.usuario);
    console.log('Novedades:', this.tituloNovedades);
    
    // Aquí podrías hacer una llamada a un servicio para guardar los datos
  }
}
