import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})


export class TokenService {
  private tokenKey = 'authToken'; // Clave para guardar el token

  saveToken(token: any): void {
    const tokenString = JSON.stringify(token);
    localStorage.setItem(this.tokenKey, tokenString); // Aquí podrías cambiarlo a localStorage si deseas persistencia más allá de la sesión
  }

  getToken(): any | null {
    const tokenString = localStorage.getItem(this.tokenKey);
    return tokenString ? JSON.parse(tokenString) : null;
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
