import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';  // Asegúrate de importar el TokenService

// Define las interfaces para los datos
export interface Chat {
  id: number;
  emisor_id: number;
  resepto_id: number;
  mensaje: string;
  fecha_envio: string;
}

export interface ChatCreate {
  resepto_id: number;
  mensaje: string;
}

export interface ChatUpdate {
  mensaje: string;
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = 'https://fixiapi.integrador.xyz/chats'; // Cambia esto por la URL real de tu API

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  /**
   * Obtener chats del usuario autenticado.
   * @param skip Cantidad de resultados a saltar (paginación).
   * @param limit Límite de resultados a obtener (paginación).
   * @returns Observable con la lista de chats.
   */
  getUserChats(skip: number = 0, limit: number = 100): Observable<Chat[]> {
    const url = `${this.apiUrl}/?skip=${skip}&limit=${limit}`;
    return this.http.get<Chat[]>(url, { headers: this.getHeaders() });
  }

  /**
   * Crear un nuevo chat.
   * @param chatData Datos del nuevo chat.
   * @returns Observable con el chat creado.
   */
  createChat(chatData: ChatCreate): Observable<Chat> {
    return this.http.post<Chat>(this.apiUrl, chatData, { headers: this.getHeaders() });
  }

  /**
   * Actualizar un chat existente.
   * @param chatId ID del chat a actualizar.
   * @param chatData Nuevos datos del chat.
   * @returns Observable con el chat actualizado.
   */
  updateChat(chatId: number, chatData: ChatUpdate): Observable<Chat> {
    const url = `${this.apiUrl}/${chatId}`;
    return this.http.put<Chat>(url, chatData, { headers: this.getHeaders() });
  }

  /**
   * Eliminar un chat.
   * @param chatId ID del chat a eliminar.
   * @returns Observable con el resultado de la eliminación.
   */
  deleteChat(chatId: number): Observable<{ message: string }> {
    const url = `${this.apiUrl}/${chatId}`;
    return this.http.delete<{ message: string }>(url, { headers: this.getHeaders() });
  }

  /**
   * Obtener encabezados de autorización.
   * @returns Encabezados con el token de autenticación.
   */
  private getHeaders(): HttpHeaders {
    const token = this.tokenService.getToken(); // Obtener el token dinámicamente desde el TokenService
    console.log(token)
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.value}`,
    });
  }
}
