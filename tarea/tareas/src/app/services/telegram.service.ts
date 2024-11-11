import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class TelegramService {
  private token: string = '7295498733:AAFFGAPSPOCGRNxempAebJ_oZN57QDKhCGs';
  private chatId: string = 'DEMNovedadesbot';

  constructor() { }

  async sendMessage(message: string): Promise<void> {
    const url = `https://api.telegram.org/bot${this.token}/sendMessage`;

    try {
      await axios.post(url, {
        chat_id: this.chatId,
        text: message,
      });
      console.log('Mensaje enviado a Telegram');
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
    }
  }
}