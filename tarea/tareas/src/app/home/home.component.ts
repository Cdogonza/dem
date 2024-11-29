import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { NavtareasComponent } from "../navtareas/navtareas.component";
import { RouterLink } from '@angular/router';
import { NovedadesService } from '../services/novedades.service';
import Novedad from '../novedad';
import { NgFor,NgIf } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [NgIf,MatTableModule, NavComponent, NavtareasComponent, RouterLink, NgFor, MatFormFieldModule, MatInputModule, MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  nombreUser = '';
  fechaActual: string ='' // Definición de la propiedad
  fechaAyer: string ='' // Definición de la propiedad
  data: Novedad[] = [];
  dataFiltrada: Novedad[] = [];
  selectedDate: string | undefined;
  hoyYtodas: boolean = true;

  constructor(private novedadesService: NovedadesService, private cdr: ChangeDetectorRef,private rroute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.nombreUser = this.rroute.snapshot.paramMap.get('user') ?? '';
    this.fehcaHoy();
    this.fehcaAyer();
    this.novedadesHoy();
    
  }

  async loadAllData() {
    this.hoyYtodas = false;
    this.novedadesService.getData().subscribe(data => {
      this.dataFiltrada = data;
      this.cdr.detectChanges(); // Forzar la detección de cambios
      
    }, error => {
      console.error('Error al cargar datos:', error);
    });
  }

  novedadesHoy() {
    this.hoyYtodas = true;
    this.novedadesService.getDataByDate(this.fechaActual,this.fechaAyer).subscribe(data => {
      this.data = data;
      console.log(this.fechaActual,this.fechaAyer);
      this.dataFiltrada = [...this.data];
      this.cdr.detectChanges(); // Forzar la detección de cambios
      
    }, error => {
      console.error('Error al cargar datos:', error);
    });
  }
  fehcaHoy(){
    const today = new Date(); // Obtiene la fecha actual
    const day: string = String(today.getDate()).padStart(2, '0'); // Obtiene el día y lo formatea con dos dígitos
    const month: string = String(today.getMonth() + 1).padStart(2, '0'); // Obtiene el mes (0-11, así que sumamos 1) y lo formatea
    const year: string = String(today.getFullYear()); // Obtiene el año
    const hoy = day + '/' + month + '/' + year;
    this.fechaActual = hoy;
  console.log(this.fechaActual+'hoy');
  }
  fehcaAyer(){
    const today = new Date(); // Obtiene la fecha actual
    const day: string = String(today.getDate() - 1).padStart(2, '0'); // Obtiene el día y lo formatea con dos dígitos
    const month: string = String(today.getMonth() + 1).padStart(2, '0'); // Obtiene el mes (0-11, así que sumamos 1) y lo formatea
    const year: string = String(today.getFullYear()); // Obtiene el año
    const hoy = day + '/' + month + '/' + year;
    this.fechaAyer = hoy;
    console.log(this.fechaAyer);
  
  }
  printTable() {
    const printContents = document.getElementById('table')?.outerHTML;
    
    if (!printContents) {
      console.error('No se encontró la tabla para imprimir.');
      return;
    }
  
    // Crear una nueva ventana
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    printWindow?.document.write(`
      <html>
        <head>
          <title>Imprimir Tabla</title>
          <style>
            /* Estilos opcionales para la impresión */
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid #000;
              padding: 8px;
              text-align: left;
            }
          </style>
        </head>
        <body onload="window.print(); window.close();">
          ${printContents}
        </body>
      </html>
    `);
    printWindow?.document.close();
  }
  filtrarTabla(event: Event) {
    const textoBusqueda = (event.target as HTMLInputElement).value.toLowerCase();

    this.cargaTodas()
    this.dataFiltrada = this.dataFiltrada.filter(item =>
      item.novedad.toLowerCase().includes(textoBusqueda) ||
      item.nombre.toLowerCase().includes(textoBusqueda)
  );
}

async cargaTodas() {
 
  this.novedadesService.getData().subscribe(data => {
    this.dataFiltrada = data;
   // this.cdr.detectChanges(); // Forzar la detección de cambios
    
  }, error => {
    console.error('Error al cargar datos:', error);
  });
}



}




