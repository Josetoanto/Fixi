import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { TokenService } from './token.service'; // Importa el TokenService

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://fixiapi.integrador.xyz';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService // Inyecta el TokenService
  ) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/`, userData).pipe(
      tap((response: any) => {
        const token: any = { value: response.token };
        this.tokenService.saveToken(token); // Guardar el token usando el TokenService
        this.tokenService.saveProfileName(response.name)
      }),
      catchError((error) => {
        console.error('Error durante el registro:', error);
        return throwError(error);
      })
    );
  }

  getUserById(userId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/users/${userId}`, { headers }).pipe(
      catchError((error) => {
        console.error(`Error al obtener el usuario con ID ${userId}:`, error);
        return throwError(error);
      })
    );
  }
  

  // Iniciar sesión
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/token`, { email, password }).pipe(
      tap((response: any) => {
        const token: any = { value: response.access_token };
        this.tokenService.saveId(response.user_id)
        this.tokenService.saveProfileId(response.perfil_id)
        this.tokenService.saveToken(token); 
      }),
      catchError((error) => {
        console.error('Error durante el inicio de sesión:', error);
        return throwError(error);
      })
    );
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = this.tokenService.getToken();
    return !!token;
  }

  // En user.service.ts
  getProveedorIngresos(): Observable<any> {
    const headers = this.getAuthHeaders(); // Asegurarse de que se incluya el token de autenticación
    return this.http.get(`${this.apiUrl}/users/admin/ingresos/proveedores`, { headers }).pipe(
      catchError((error) => {
        console.error('Error al obtener ingresos de proveedores:', error);
        return throwError(error);
      })
    );
  }


  // Cerrar sesión
  logout(): void {
    this.tokenService.removeToken(); // Eliminar el token usando el TokenService
  }

  // Obtener encabezados de autorización
    private getAuthHeaders(): HttpHeaders {
    const token = this.tokenService.getToken().value;
    console.log(token)
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
  // Obtener usuarios con paginación
  getUsers(skip: number = 0, limit: number = 50): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/users?skip=${skip}&limit=${limit}`, { headers }).pipe(
      catchError((error) => {
        console.error('Error al obtener usuarios:', error);
        return throwError(error);
      })
    );
  }

  // Eliminar un usuario por ID
  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${userId}`, {
      headers: this.getAuthHeaders(),
    }).pipe(
      catchError((error) => {
        console.error('Error al eliminar usuario:', error);
        return throwError(error);
      })
    );
  }
}
