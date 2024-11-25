import { Component, OnInit } from '@angular/core';
import { PerfilService } from '../../service/perfil.service';
import { FormsModule } from '@angular/forms'; // Importa FormsModule aquí
import { HeaderClientComponent } from '../../component/header-client/header-client.component';
import { CommonModule } from '@angular/common';
import { TokenService } from '../../service/token.service';

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [FormsModule, HeaderClientComponent, CommonModule],
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss'],
})
export class PerfilUsuarioComponent implements OnInit {
  perfil: any = null; // Aquí se guardará el perfil
  perfilEdit: any = {}; // Datos del perfil para editar
  editando: boolean = false; // Controla si está en modo edición

  constructor(private perfilService: PerfilService, private tokenService: TokenService) {}

  ciudades: string[] = [
    'Tuxtla Gutierrez',
    'San Cristobal de las Casas',
    'Comitan de Domínguez',
    'Tapachula',
    'Palenque',
    'Chiapa de Corzo',
    'Tonala',
    'Villaflores',
    'Ocosingo',
    'Cintalapa',
  ];

  ngOnInit(): void {
    const perfilId = this.tokenService.getProfileId(); // Cambia esto por el ID real
    if (perfilId) {
      this.perfilService.getPerfilById(perfilId).subscribe(
        (data) => {
          console.log(data)
          this.perfil = data;
          console.log(this.perfil.foto)
          this.perfilEdit = {
            ...data,
            direccion: {
              ciudad: data.direccion?.ciudad || '',
              colonia: data.direccion?.colonia || '',
              avenida: data.direccion?.avenida || '',
              numexterior: data.direccion?.numexterior || null,
              codigopost: data.direccion?.codigopost || null,
            },
          };
          this.perfil.nombre = this.tokenService.getProfileName();
        },
        (error) => {
          console.error('Error al obtener el perfil', error);
        }
      );
    }
  }

  onFileSelected(event: Event, tipo: string): void {
    const input = event.target as HTMLInputElement;
  
    if (input.files?.length) {
      if (tipo === 'foto') {
        this.perfil.fotoArchivo = input.files[0]; // Foto principal
        console.log(this.perfil.fotoArchivo)
      } else if (tipo === 'imagenes') {
        console.log(input.files)
        this.perfil.imagenesArchivos = Array.from(input.files); 
        console.log(this.perfil.imagenesArchivos)
      }
    }
  }

  toggleEditar(): void {
    this.editando = !this.editando;
  }

  guardarCambios(): void {

    const formData = new FormData();
    formData.append('description', this.perfilEdit.description);
    formData.append('telefono', this.perfilEdit.telefono);
    if (this.perfil.fotoArchivo) {
      console.log("guardando")
      console.log(this.perfil.fotoArchivo)
      formData.append('foto', this.perfil.fotoArchivo); 
    }
    const perfil_id = this.tokenService.getProfileId()
    if(perfil_id){
    formData.append('perfil_id', perfil_id)
    }
    // Dirección detallada
    formData.append(
      'direccion',
      JSON.stringify({
        ciudad: this.perfilEdit.direccion.ciudad,
        colonia: this.perfilEdit.direccion.colonia,
        avenida: this.perfilEdit.direccion.avenida,
        numexterior: this.perfilEdit.direccion.numexterior,
        codigopost: this.perfilEdit.direccion.codigopost,
      })
    );
    formData.append('habilidades', JSON.stringify([[]])); // Habilidades como array doble nulo
   

    

    // Enviar los datos al backend
    const perfilId = this.tokenService.getProfileId();
    if (perfilId) {
      this.perfilService.updatePerfil(perfilId, formData).subscribe(
        (response) => {
          console.log('Perfil actualizado:', response);
          this.perfil = { ...this.perfilEdit };
          this.toggleEditar();
        },
        (error) => {
          console.error('Error al guardar cambios:', error);
        }
      );
    }
  }
  
}
