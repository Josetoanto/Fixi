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
    // Método para guardar el id en localStorage
    saveId(id: number): void {
      localStorage.setItem('id', id.toString()); // Convierte el id a string antes de guardarlo
    }
  
    // Método para obtener el id desde localStorage
    getId(): number | null {
      const idString = localStorage.getItem('id');
      return idString ? parseInt(idString, 10) : null; // Convierte el valor de vuelta a número
    }
  
    removeId(): void {
      localStorage.removeItem('id');
    }
    saveProfileId(id: number | null): void {
      if (id){
      console.log(id)
      localStorage.setItem('idProfile', id.toString());
      } // Convierte el id a string antes de guardarlo
    }
  
    getProfileId(): string | null {
      const idString = localStorage.getItem('idProfile');
      return idString; // Convierte el valor de vuelta a número
    }
  
    // Método para eliminar el id
    removeProfileId(): void {
      localStorage.removeItem('idProfile');
    }
    saveProfileName(name: string | null): void {
      if (name){
      console.log(name)
      localStorage.setItem('idName', name);
      }
    }
  
    getProfileName(): string | null {
      const idString = localStorage.getItem('idName');
      console.log(idString)
      return idString;
    }
  
    removeProfileName(): void {
      localStorage.removeItem('idName');
    }
}
