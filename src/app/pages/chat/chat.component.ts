import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HeaderFixiComponent } from "../../component/header-fixi/header-fixi.component";
import { ChatService, Chat, ChatCreate } from "../../service/chat.service"; // Importa el servicio
import { TokenService } from '../../service/token.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [NgFor, FormsModule, NgClass, HeaderFixiComponent],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  nuevoMensaje: string = '';
  proveedorId: number | null = null; // ID del proveedor asociado al chat
  mensajes: Chat[] = []; // Lista de mensajes cargados desde la API

  constructor(private route: ActivatedRoute, private chatService: ChatService, private tokenService:TokenService) {}

  ngOnInit(): void {
    // Obtén el ID del proveedor desde los parámetros de la ruta
    this.route.queryParams.subscribe((params) => {
      this.proveedorId = +params['proveedorId'];
      if (this.proveedorId) {
        this.obtenerMensajes(); // Carga los mensajes si hay un proveedorId válido
      }
    });
  }

  /**
   * Obtiene todos los mensajes relacionados con el usuario autenticado y el proveedor.
   */
  obtenerMensajes(): void {
    this.chatService.getUserChats().subscribe({
      next: (mensajes) => {
        this.mensajes = mensajes.filter(
          (msg) => msg.resepto_id === this.proveedorId || msg.emisor_id === this.tokenService.getId()
        );
        console.log(this.mensajes)
      },
      error: (err) => {
        console.error('Error al obtener mensajes:', err);
      },
    });
  }

  /**
   * Envía un nuevo mensaje al proveedor.
   */
  enviarMensaje(): void {
    if (this.nuevoMensaje.trim() !== '' && this.proveedorId) {
      const nuevoChat: ChatCreate = {
        resepto_id: this.proveedorId,
        mensaje: this.nuevoMensaje,
      };

      this.chatService.createChat(nuevoChat).subscribe({
        next: (chatEnviado) => {
          this.mensajes.push(chatEnviado); // Agrega el mensaje enviado a la lista
          this.nuevoMensaje = ''; // Limpia el campo de texto
        },
        error: (err) => {
          console.error('Error al enviar mensaje:', err);
        },
      });
    }
  }
}
