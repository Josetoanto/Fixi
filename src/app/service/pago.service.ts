import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service'; // Importa el TokenService

@Injectable({
  providedIn: 'root',
})
export class PagoService {
  private baseUrl = 'https://fixiapi.integrador.xyz/pagos'; // URL base para los pagos

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  // Crear un nuevo pago
  createPago(pago: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/`, pago, {
      headers: this.getAuthHeaders(),
    });
  }

  // Obtener un pago por ID
  getPago(pagoId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${pagoId}`, {
      headers: this.getAuthHeaders(),
    });
  }

  // Obtener todos los pagos con paginación
  getPagos(skip: number = 0, limit: number = 10): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/?skip=${skip}&limit=${limit}`, {
      headers: this.getAuthHeaders(),
    });
  }

  // Actualizar un pago existente
  updatePago(pagoId: number, pago: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${pagoId}`, pago, {
      headers: this.getAuthHeaders(),
    });
  }

  // Eliminar un pago por ID
  deletePago(pagoId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${pagoId}`, {
      headers: this.getAuthHeaders(),
    });
  }

  // Método privado para obtener las cabeceras de autenticación
  private getAuthHeaders(): HttpHeaders {
    const token = this.tokenService.getToken().value; // Obtén el token del servicio TokenService
    console.log(token); // Imprime el token en consola para depuración
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
}
