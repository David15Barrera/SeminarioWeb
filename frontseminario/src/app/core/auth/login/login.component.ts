import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe({
        next: (response) => {
            // Aquí usas 'response' directamente
            if (response) {
                localStorage.setItem('user', JSON.stringify(response));

                // Redirige según el rol
                const userRole = response.role; // Ahora puedes acceder directamente a 'role'
                if (userRole === 'Administrador') {
                    this.router.navigate(['/manager/configuracion']);
                } else if (userRole === 'Cliente') {
                    this.router.navigate(['/user/configuracion']);
                } else if (userRole === 'Empleado') {
                    this.router.navigate(['/manager/configuracion']);
                } else {
                    // Manejar caso de rol desconocido
                    console.error('Rol de usuario desconocido:', userRole);
                }
            } else {
                console.error('Respuesta no válida:', response);
                Swal.fire({
                  title: 'Inicio de Sesion',
                  text: 'Respuesta no válida',
                  icon: 'error',
                  confirmButtonText: 'Cool'
                })
            }
        },
        error: (error) => {
            console.error('Error de inicio de sesión:', error);
            Swal.fire({
              title: 'Inicio de Sesion',
              text: 'Error al inicio de sesión verificar',
              icon: 'error',
              confirmButtonText: 'Cool'
            })
        }
    });
}

}
