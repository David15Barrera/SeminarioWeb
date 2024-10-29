import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      nit: ['', [Validators.required, Validators.pattern('^[0-9]*$')]], // Validación numérica
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      payment_method: ['PAYPAL'], // Si es un método fijo
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;

      // Asegúrate de que la contraseña coincida
      if (userData.password === userData.confirmPassword) {
        this.authService.register(userData).subscribe(response => {
          console.log('Registro exitoso', response);
          
          // Muestra SweetAlert de éxito
          Swal.fire({
            title: 'Registro exitoso',
            text: 'Te has registrado correctamente',
            icon: 'success',
            confirmButtonText: 'Continuar'
          }).then(() => {
            // Redirige al usuario a la ruta /session/login
            this.router.navigate(['/session/login']);
          });

        }, error => {
          console.error('Error en el registro', error);
          // Muestra SweetAlert de error
          Swal.fire({
            title: 'Error',
            text: 'No se pudo completar el registro. Intenta de nuevo.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        });
      } else {
        // Muestra SweetAlert si las contraseñas no coinciden
        Swal.fire({
          title: 'Error',
          text: 'Las contraseñas no coinciden.',
          icon: 'warning',
          confirmButtonText: 'Aceptar'
        });
      }
    } else {
      // Muestra SweetAlert si el formulario es inválido
      Swal.fire({
        title: 'Error',
        text: 'Por favor, completa todos los campos requeridos.',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }
  }
}
