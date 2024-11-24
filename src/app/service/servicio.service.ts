import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenService } from './token.service'; // Importa el TokenService

@Injectable({
  providedIn: 'root',
})
export class ServicioService {
  private apiUrl = 'https://lh8wfcbm-8001.use2.devtunnels.ms'; // Cambiar por la URL de tu API

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.tokenService.getToken().value;
    console.log(token)
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }


  // Obtener un servicio por su ID
  getServicio(servicioId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http
      .get(`${this.apiUrl}/servicios/${servicioId}`, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error al obtener el servicio:', error);
          return throwError(error);
        })
      );
  }

  // Obtener la lista de servicios
  getServicios(skip: number = 0, limit: number = 10): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http
      .get(`${this.apiUrl}/servicios?skip=${skip}&limit=${limit}`, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error al obtener los servicios:', error);
          return throwError(error);
        })
      );
  }

  // Crear un nuevo servicio
  createServicio(servicioData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http
      .post(`${this.apiUrl}/servicios/`, servicioData, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error al crear el servicio:', error);
          return throwError(error);
        })
      );
  }

  // Actualizar un servicio existente
  updateServicio(servicioId: number, servicioData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http
      .put(`${this.apiUrl}/servicios/${servicioId}`, servicioData, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error al actualizar el servicio:', error);
          return throwError(error);
        })
      );
  }

  // Eliminar un servicio
  deleteServicio(servicioId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http
      .delete(`${this.apiUrl}/servicios/${servicioId}`, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error al eliminar el servicio:', error);
          return throwError(error);
        })
      );
  }

  // Subir imágenes a un servicio
  uploadImages(servicioId: number, files: File[]): Observable<any> {
    const headers = this.getAuthHeaders();
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    return this.http
      .post(`${this.apiUrl}/servicios/${servicioId}/upload-images`, formData, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error al subir imágenes:', error);
          return throwError(error);
        })
      );
  }

  // Obtener una imagen específica de un servicio
  getImage(servicioId: number, imageIndex: number): Observable<Blob> {
    const headers = this.getAuthHeaders();
    return this.http
      .get(`${this.apiUrl}/servicios/${servicioId}/images/${imageIndex}`, {
        headers,
        responseType: 'blob',
      })
      .pipe(
        catchError((error) => {
          console.error('Error al obtener la imagen:', error);
          return throwError(error);
        })
      );
  }
}
