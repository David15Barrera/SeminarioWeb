import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
  user = {
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

  constructor() {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData() {
    // Cargar los datos del usuario actual desde tu API
    this.user = {
      name: 'Juan Pérez',
      email: 'juan.perez@ejemplo.com',
      address: 'Calle Falsa 123',
      nit: '1234567890',
      password: '',
      payment_method: 'PAYPAL'
    };
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  updateAccount() {
    if (this.user.password && this.user.password !== this.confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    // Lógica para enviar los datos actualizados al backend
    console.log('Datos del usuario actualizados:', this.user);
    // Llamada al servicio para actualizar los datos
  }

}  