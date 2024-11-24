import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { DatePipe } from '@angular/common';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-admin-fixis-page',
  standalone: true,
  imports: [NgFor,DatePipe],
  templateUrl: './admin-fixis-page.component.html',
  styleUrl: './admin-fixis-page.component.scss'
})
export class AdminFixisPageComponent {
  users: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers(0,50).subscribe({
      next: (data: any[]) => {
        this.users = data.filter(user => user.tipo_usuario === 'Proveedor');
      },
      error: (err) => {
        console.error('Error al obtener usuarios:', err);
      },
    });
  }

  deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        // Eliminar al usuario localmente después de la respuesta del servidor
        this.users = this.users.filter((user) => user.user_id !== userId);
      },
      error: (err) => {
        console.error('Error al eliminar usuario:', err);
      },
    });
  }
}
