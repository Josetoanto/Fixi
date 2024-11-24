import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { FormsModule } from '@angular/forms';
import { PerfilService } from '../../service/perfil.service';
import { TokenService } from '../../service/token.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule],
  standalone: true,
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private userService: UserService, private router: Router, private perfilService: PerfilService, private tokenService: TokenService) {}

  login() {
    this.userService.login(this.email, this.password).subscribe(
      (response) => {
        console.log('Inicio de sesión exitoso:', response);
        // Dependiendo del rol del usuario (tipo_usuario), redirigir a la página correspondiente
        switch (response.tipo_usuario) {
          case 'Cliente':
            this.router.navigate(['/homeClient']);
            break;
          case 'Proveedor':
            this.router.navigate(['/homeProveedor']);
            break;
          case 'Admin':
            this.router.navigate(['/homeAdmin']);
            break;
          default:
            console.error('Rol de usuario desconocido');
        }
        if (response.perfil_id === null) {
          const nuevoPerfil = new FormData();
          nuevoPerfil.append('usuarioId', response.user_id);
          nuevoPerfil.append('nombre', "Nombre Temporal");
          nuevoPerfil.append('tipoUsuario', response.tipo_usuario);
          nuevoPerfil.append("habilidades", JSON.stringify(null));
          nuevoPerfil.append('direccion', JSON.stringify(null));  // Si la dirección es nula, agregarla como JSON string
          nuevoPerfil.append('telefono', ""); // Agregar teléfono como null
          nuevoPerfil.append('fechaNacimiento', ""); // Fecha de nacimiento como null
          nuevoPerfil.append("description", "Descripción del perfil");

    
          this.perfilService.createPerfil(nuevoPerfil).subscribe(
            (data) => {
              this.tokenService.saveProfileId(data.id);  // Aquí guardamos el ID del nuevo perfil en el token
    
              // Aquí puedes hacer cualquier otra acción posterior, como actualizar la vista o redirigir al usuario
              console.log('Perfil creado y asociado con el usuario:', data);
            },
            (error) => {
              console.error('Error al crear el perfil:', error);
            }
          );
        } else {
          console.log('El usuario ya tiene un perfil asociado');
          this.tokenService.saveProfileId(response.perfil_id)
        }
      },
      (error) => {
        console.error('Error durante el login:', error);
      }
    );
  }

  goToSignUp() {
    this.router.navigate(['/signup']);
  }
}
