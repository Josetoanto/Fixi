import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Historial {
  id: number;
  cliente_id: number;
  servicio_id?: number;
  descripcion: string;
  fecha: string;
}

export interface HistorialCreate {
  cliente_id: number;
  servicio_id?: number;
  descripcion: string;
  fecha: string;
}

@Injectable({
  providedIn: 'root'
})
export class HistorialService {
  private readonly apiUrl = 'https://fixiapi.integrador.xyz/historial'; // URL base de la API

  constructor(private http: HttpClient) {}

  /**
   * Crear un nuevo historial.
   * @param historial Datos del historial a crear.
   */
  createHistorial(historial: HistorialCreate): Observable<Historial> {
    return this.http.post<Historial>(`${this.apiUrl}/`, historial);
  }

  /**
   * Obtener un historial por ID.
   * @param id ID del historial a obtener.
   */
  getHistorial(id: number): Observable<Historial> {
    return this.http.get<Historial>(`${this.apiUrl}/${id}`);
  }

  /**
   * Obtener todos los historiales con paginación.
   * @param skip Número de elementos a saltar.
   * @param limit Número máximo de elementos a obtener.
   */
  getHistoriales(skip: number = 0, limit: number = 10): Observable<Historial[]> {
    return this.http.get<Historial[]>(`${this.apiUrl}/?skip=${skip}&limit=${limit}`);
  }

  /**
   * Actualizar un historial existente.
   * @param id ID del historial a actualizar.
   * @param historial Datos del historial actualizados.
   */
  updateHistorial(id: number, historial: HistorialCreate): Observable<Historial> {
    return this.http.put<Historial>(`${this.apiUrl}/${id}`, historial);
  }

  /**
   * Eliminar un historial por ID.
   * @param id ID del historial a eliminar.
   */
  deleteHistorial(id: number): Observable<Historial> {
    return this.http.delete<Historial>(`${this.apiUrl}/${id}`);
  }
}
