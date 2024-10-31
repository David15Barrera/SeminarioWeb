import { User } from './../../../modules/manager/interfaces/user.model';
import { UserService } from './../../../modules/services/user.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router'; 
import Swal from 'sweetalert2';


const roleMap: { [key: number]: string } = {
  1: 'Administrador',
  3: 'Empleado',
};
@Component({
  selector: 'app-manamanager-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './manamanager-nav.component.html',
  styleUrl: './manamanager-nav.component.scss'
})
export class ManamanagerNavComponent implements OnInit {
  user: User = {
    id: 0,
    name: '',
    email: '',
    address: '',
    nit: '',
    password: '',
    payment_method: 'PAYPAL'
  };

  userRole: string = ''; // Para almacenar el rol del usuario

  
  constructor(private authService: AuthService, private router: Router, private userService: UserService) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/session/login']); 
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  loadUserData() {
    if (typeof window !== 'undefined' && localStorage) {
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  
      if (storedUser && storedUser.id) {
        const userId = storedUser.id;
        this.userService.getUserById(userId).subscribe(
          (userData) => {
            this.user = userData;
            this.userRole = userData.role_id !== undefined ? roleMap[userData.role_id] : ''; // Uso del mapa
            this.checkUserRole();
          },
          (error) => {
            console.error('Error al obtener los datos del usuario:', error);
            Swal.fire({
              title: 'Error!',
              text: 'Error al obtener los datos del usuario:',
              icon: 'error',
              confirmButtonText: 'Cool'
            });
          }
        );
      } else {
        console.error('No se encontró el usuario en el localStorage');
      }
    } else {
      console.warn('localStorage no está disponible en este entorno.');
    }
  }
  

  checkUserRole() {
    if (this.userRole === 'Empleado') {
      // Bloquear acceso o realizar la acción que desees
      Swal.fire({
        title: 'Bienvenido!',
        text: 'Puedes Navergar como Empleado',
        icon: 'success',
        confirmButtonText: 'Cerrar'
      }).then(() => {
        this.router.navigate(['/manager/configuracion']); // Redirigir a otra ruta si es necesario
      });
    }
  }
}
