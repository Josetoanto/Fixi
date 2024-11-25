import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [NgFor, FormsModule, NgClass],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  nuevoMensaje: string = '';

  mensajes = [
    { sender: 'fixi', text: 'Hola, soy tono' },
    { sender: 'cliente', text: 'hola tono quiero que te bajes por los chescos' },
    { sender: 'fixi', text: 'va amor' }
  ];

  
  enviarMensaje() {
    if (this.nuevoMensaje.trim() !== '') {
      
      this.mensajes.push({
        sender: 'fixi',
        text: this.nuevoMensaje
      });
      this.nuevoMensaje = '';
    }
  }
}
