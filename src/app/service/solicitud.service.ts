import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';



export interface SolicitudCreate {
  titulo: string;
  descripcion: string;
}

@Injectable({
  providedIn: 'root',
})
export class SolicitudService {
  private apiUrl = 'https://fixiapi.integrador.xyz/solicitudes'; // Cambia esto a tu endpoint base

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  private getHeaders(): HttpHeaders {
    const token = this.tokenService.getToken().value;
    console.log(token)
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  crearSolicitud(solicitud: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/`, solicitud, {
      headers: this.getHeaders(),
    });
  }

  obtenerSolicitud(solicitudId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${solicitudId}`, {
      headers: this.getHeaders(),
    });
  }

  obtenerSolicitudes(skip: number = 0, limit: number = 20): Observable<any[]> {
    if (skip < 0 || limit <= 0) {
      throw new Error('Parámetros inválidos: "skip" debe ser >= 0 y "limit" > 0');
    }
    const params = new HttpParams()
      .set('skip', skip.toString())
      .set('limit', limit.toString());

    const header = this.getHeaders()
    return this.http.get<any[]>(this.apiUrl, {
      headers: header,
      params,
    });
  }

  actualizarEstadoSolicitud(solicitudId: number, status: string): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/${solicitudId}/status?status=${status}`,  // status como parámetro de consulta
      {},
      { headers: this.getHeaders() }
    );
  }
  
  // Cancelar una solicitud
  cancelarSolicitud(solicitudId: number, cancelar: boolean): Observable<any> {
    const url = `${this.apiUrl}/${solicitudId}/cancelar?cancelar=${cancelar}`;
    return this.http.put<any>(url, {}, { headers: this.getHeaders() });
  }

  // Eliminar una solicitud
  eliminarSolicitud(solicitudId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${solicitudId}`, {
      headers: this.getHeaders(),
    });
  }
}
