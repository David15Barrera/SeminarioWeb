import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Cart } from '../../interfaces/cart.model';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-facturas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './facturas.component.html',
  styleUrl: './facturas.component.scss'
})
export class FacturasComponent implements OnInit {
  carts: Cart[] = []; // Para almacenar los carritos
  userId: number | null = null; // ID del usuario

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadUserId();
    this.loadCarts(); // Cargar carritos al iniciar el componente
  }

  loadUserId() {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      if (storedUser && storedUser.id) {
        this.userId = storedUser.id;
      } else {
        console.error('No se encontró el usuario en el localStorage');
      }
    } else {
      console.warn('localStorage no está disponible en este entorno.');
    }
  }
  
  loadCarts(): void {
    if (this.userId !== null) {
      const statuses: ('COMPLETED' | 'CANCELLED_ERROR')[] = ['COMPLETED', 'CANCELLED_ERROR'];
      
      for (const status of statuses) {
        this.cartService.getCartsByUserIdAndStatus(this.userId, status).subscribe(
          (carts) => {
            console.log('Carts received:', carts);
            this.carts = this.carts.concat(carts); // Concatenar los carritos en el array
          },
          (error) => {
            console.error('Error al cargar carritos:', error);
            Swal.fire({
              title: 'Error',
              text: 'No se pudieron cargar los carritos.',
              icon: 'error',
              confirmButtonText: 'Entendido'
            });
          }
        );
      }
    } else {
      console.warn('userId es null, no se pueden cargar los carritos.');
    }
  }
  
  showCartDetails(cartId: number): void {
    this.cartService.getCartItemsByCartId(cartId).subscribe(
      (items) => {
        // Construir el mensaje para SweetAlert
        const itemsList = items.map(item => `${item.product_id} - Cantidad: ${item.quantity}`).join('<br>');
        Swal.fire({
          title: 'Detalles del Carrito',
          html: `<p>Items Comprados:</p><p>${itemsList || 'No hay items en este carrito.'}</p>`,
          icon: 'info',
          confirmButtonText: 'Cerrar'
        });
      },
      (error) => {
        console.error('Error al cargar los items del carrito:', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudieron cargar los detalles del carrito.',
          icon: 'error',
          confirmButtonText: 'Entendido'
        });
      }
    );
  }
   
}