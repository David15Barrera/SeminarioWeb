import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { CartItemSimple } from '../../interfaces/cart.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.scss'
})
export class CarritoComponent implements OnInit {
  cartItems: CartItemSimple[] = [];
  userId: number | null = null; // ID del usuario

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadUserId(); 
    this.loadCartItems();
  }

  loadUserId() {
    if (typeof window !== 'undefined' && localStorage) {
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

  loadCartItems(): void {
    if (this.userId !== null) {
    this.cartService.getPendingCartItems(this.userId).subscribe(items => {
        this.cartItems = items.map(item => ({
            id: item.id, // ID del cart item
            quantity: item.quantity,
            sub_total: item.sub_total, // Añadir el sub_total aquí
            cart_id: item.cart_id, // Añadir el cart_id aquí
            product_id: item.product_id,
            product: {
              name: item.product.name,
              image_url: item.product.image_url,
              price: item.product.price
            }
        }));
    });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Debes iniciar sesión para agregar productos al carrito.',
          icon: 'error',
          confirmButtonText: 'Entendido'
        });
      }
  }

  calculateTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  increaseQuantity(item: CartItemSimple) {
    item.quantity++;
    this.updateCartItem(item); // Actualiza el item en el servidor
  }

  decreaseQuantity(item: CartItemSimple) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateCartItem(item); // Actualiza el item en el servidor
    }
  }

  updateQuantity(item: CartItemSimple) {
    this.updateCartItem(item); // Actualiza el item en el servidor
  }

  removeFromCart(item: CartItemSimple) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás recuperar este elemento después de eliminarlo!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminarlo',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Si el usuario confirma la eliminación
            this.cartService.deleteCartItem(item.id).subscribe(() => {
                this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== item.id);
                Swal.fire(
                    'Eliminado!',
                    'El producto ha sido eliminado de tu carrito.',
                    'success'
                );
            }, error => {
                // Manejo de errores, en caso de que la eliminación falle
                Swal.fire(
                    'Error!',
                    'No se pudo eliminar el producto. Intenta nuevamente.',
                    'error'
                );
            });
        }
    });
}


  updateCartItem(item: CartItemSimple) {
    const updatedDetails = { quantity: item.quantity, sub_total: item.product.price * item.quantity };
    this.cartService.updateCartItemDetails(item.id, updatedDetails).subscribe();
  }

  checkout() {
    alert('Procediendo al pago...');
  }
}