import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service'; // Importa el TokenService


@Injectable({
  providedIn: 'root',
})
export class PerfilService {
  private baseUrl = 'https://fixiapi.integrador.xyz/perfil';

  constructor(private http: HttpClient,private tokenService: TokenService) {}

  createPerfil(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/`, formData, {
      headers: this.getAuthHeaders(),
    });
  }

  getPerfilById(perfilId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${perfilId}`, {
      headers: this.getAuthHeaders(),
    });
  }

  updatePerfil(perfilId: string, formData: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/`, formData, {
      headers: this.getAuthHeaders(),
      params: { perfil_id: perfilId },
    });
  }

  getAllPerfiles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/`, {
      headers: this.getAuthHeaders(),
    });
  }

  deletePerfil(perfilId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${perfilId}`, {
      headers: this.getAuthHeaders(),
    });
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.tokenService.getToken().value; 
    console.log(token)
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
}
