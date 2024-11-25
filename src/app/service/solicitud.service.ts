import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

export interface Solicitud {
  id: number;
  titulo: string;
  descripcion: string;
  status: string;
  cancelado: boolean;
  fecha_creacion: string;
}

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

  crearSolicitud(solicitud: SolicitudCreate): Observable<Solicitud> {
    return this.http.post<Solicitud>(`${this.apiUrl}/`, solicitud, {
      headers: this.getHeaders(),
    });
  }

  obtenerSolicitud(solicitudId: number): Observable<Solicitud> {
    return this.http.get<Solicitud>(`${this.apiUrl}/${solicitudId}`, {
      headers: this.getHeaders(),
    });
  }

  obtenerSolicitudes(skip: number = 0, limit: number = 10): Observable<Solicitud[]> {
    if (skip < 0 || limit <= 0) {
      throw new Error('Parámetros inválidos: "skip" debe ser >= 0 y "limit" > 0');
    }
    const params = new HttpParams()
      .set('skip', skip.toString())
      .set('limit', limit.toString());

    const header = this.getHeaders()
    return this.http.get<Solicitud[]>(this.apiUrl, {
      headers: header,
      params,
    });
  }

  actualizarEstadoSolicitud(solicitudId: number, status: string): Observable<Solicitud> {
    return this.http.put<Solicitud>(
      `${this.apiUrl}/${solicitudId}/status`,
      { status },
      { headers: this.getHeaders() }
    );
  }

  // Cancelar una solicitud
  cancelarSolicitud(solicitudId: number, cancelar: boolean): Observable<Solicitud> {
    return this.http.put<Solicitud>(
      `${this.apiUrl}/${solicitudId}/cancelar`,
      { cancelar },
      { headers: this.getHeaders() }
    );
  }

  // Eliminar una solicitud
  eliminarSolicitud(solicitudId: number): Observable<Solicitud> {
    return this.http.delete<Solicitud>(`${this.apiUrl}/${solicitudId}`, {
      headers: this.getHeaders(),
    });
  }
}
