import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavtareasComponent } from '../navtareas/navtareas.component';
import { NgFor, NgIf, NgStyle,NgClass } from '@angular/common';
import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TelegramService } from '../services/telegram.service';

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
  constructor(private telegramService: TelegramService) { }
  
  onSubmit() {
    this.telegramService.sendMessage(`Novedades: ${this.tituloNovedades}`);
  
  }	
}


/* token de telegram Done! Congratulations on your new bot. You will find it at t.me/DEMNovedadesbot. You can now add a description, about section and profile picture for your bot, see /help for a list of commands. By the way, when you've finished creating your cool bot, ping our Bot Support if you want a better username for it. Just make sure the bot is fully operational before you do this.

Use this token to access the HTTP API:
7295498733:AAFFGAPSPOCGRNxempAebJ_oZN57QDKhCGs
Keep your token secure and store it safely, it can be used by anyone to control your bot.

For a description of the Bot API, see this page: https://core.telegram.org/bots/api

*/