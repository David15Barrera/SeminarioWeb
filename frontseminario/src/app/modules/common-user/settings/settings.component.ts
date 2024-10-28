import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../manager/interfaces/user.model';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
  user: User = {
    id: 0,
    name: '',
    email: '',
    address: '',
    nit: '',
    password: '',
    payment_method: 'PAYPAL'
  };
  confirmPassword: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData() {
    if (typeof window !== 'undefined' && localStorage) {
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  
      if (storedUser && storedUser.id) {
        const userId = storedUser.id;
        this.userService.getUserById(userId).subscribe(
          (userData) => {
            this.user = userData;
          },
          (error) => {
            console.error('Error al obtener los datos del usuario:', error);
            Swal.fire({
              title: 'Error!',
              text: 'Error al obtener los datos del usuario:',
              icon: 'error',
              confirmButtonText: 'Cool'
            })
          }
        );
      } else {
        console.error('No se encontró el usuario en el localStorage');
      }
    } else {
      console.warn('localStorage no está disponible en este entorno.');
    }
  }
  

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  updateAccount() {
    if (this.user.password && this.user.password !== this.confirmPassword) {
      Swal.fire({
        title: 'Error!',
        text: 'Contraseñas no coinciden',
        icon: 'error',
        confirmButtonText: 'Cool'
      })
      return;
    }

    this.userService.updateUser(this.user.id, this.user).subscribe(
      (updatedUser) => {
        console.log('Datos del usuario actualizados:', updatedUser);
        Swal.fire({
          title: "Usuario",
          text: "Usuario actualizado correctamente",
          icon: "success"
        });
      },
      (error) => {
        console.error('Error al actualizar los datos del usuario:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Error al actualizar los datos',
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      }
    );
  }
}  