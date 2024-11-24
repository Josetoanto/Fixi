import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { NgFor } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-clients',
  standalone: true,
  imports: [NgFor,DatePipe],
  templateUrl: './admin-clients.component.html',
  styleUrl: './admin-clients.component.scss'
})
export class AdminClientsComponent {
  clientes: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes(): void {
    this.userService.getUsers().subscribe({
      next: (usuarios) => {
        this.clientes = usuarios.filter(
          (usuario: any) => usuario.tipo_usuario === 'Cliente'
        );
      },
      error: (err) => {
        console.error('Error al cargar los clientes:', err);
      },
    });
  }

  deleteUser(userId: number): void {
    if (!confirm('¿Estás seguro de eliminar este cliente?')) return;

    this.userService.deleteUser(userId).subscribe({
      next: () => {
        console.log('Cliente eliminado con éxito.');
        this.loadClientes(); // Recargar la lista después de eliminar
      },
      error: (err) => {
        console.error('Error al eliminar cliente:', err);
      },
    });
  }
}
