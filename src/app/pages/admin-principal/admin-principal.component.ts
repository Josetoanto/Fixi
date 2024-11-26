import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-principal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-principal.component.html',
  styleUrls: ['./admin-principal.component.scss']
})
export class AdminPrincipalComponent {
  usuariosActivos = 0;
  fixisActivos = 0;
  ingresosTotales = 0.0; // Valor dinámico
  isLoading = false; // Variable de carga

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadIngresos(); // Cargar ingresos de proveedores
  }

  loadUsers(): void {
    this.isLoading = true; // Iniciar carga
    this.userService.getUsers(0, 100).subscribe(
      (users) => {
        console.log(users);
        this.usuariosActivos = users.filter(
          (user: any) => user.tipo_usuario === 'Cliente'
        ).length;
        console.log(this.usuariosActivos);

        this.fixisActivos = users.filter(
          (user: any) => user.tipo_usuario === 'Proveedor'
        ).length;
        console.log(this.fixisActivos);
      },
      (error) => {
        console.error('Error al cargar usuarios:', error);
      },
      () => {
        this.isLoading = false; 
      }
    );
  }

  loadIngresos(): void {
    this.userService.getProveedorIngresos().subscribe(
      (data) => {
        console.log(data);
        const totalIngresos = data.reduce((sum: number, proveedor: any) => sum + proveedor.ingresos, 0);
        this.ingresosTotales = totalIngresos * 0.2; // Obtener el 20% de los ingresos totales
      },
      (error) => {
        console.error('Error al obtener ingresos de proveedores:', error);
      }
    );
  }
}
