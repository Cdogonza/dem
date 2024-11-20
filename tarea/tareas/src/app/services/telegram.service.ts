import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/envoironment';

@Injectable({
  providedIn: 'root',
})
export class TelegramService {
  private token: string = environment.telegramToken;
  private chatIds: string[] = environment.telegramChatIds;
  

  constructor() {}

  getTelegramToken(): string {
    return this.token;
  }
 

  async sendMessage(message: string): Promise<void> {
    const url = `https://api.telegram.org/bot${this.token}/sendMessage`;

    for (const chatId of this.chatIds) {
    try {
      const response = await axios.post(url, {
        chat_id: chatId, 
        text: message,
      });
      console.log('Mensaje enviado correctamente:', response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error al enviar el mensaje:', error.response?.data || error.message);
      } else {
        console.error('Error al enviar el mensaje:', error);
      }
    }
  }
}	
}	