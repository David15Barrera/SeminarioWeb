import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { Cart, CartItemSimple } from '../../interfaces/cart.model';
import { ProductService } from '../../services/product.service';

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
  emailId: string | null = null; // ID del usuario
  isPaymentModalOpen = false; // Estado del modal
  selectedPaymentMethod: 'PAYPAL' | 'PAYMENT_GATEWAY' = 'PAYPAL';
  isCheckoutModalVisible: boolean = false;
  totalAmount: number = 0; // Nueva propiedad para el total
  userEmail: string = ''; // Correo del usuario
  paypalForm: any = { // Agregar formulario para PayPal
    email: '',
    transactionId: '',
  };

  constructor(private cartService: CartService, private productService: ProductService) {}

  ngOnInit(): void {
    this.loadUserId(); 
    this.loadCartItems();
    this.calculateTotal2(); 
  }
  
  loadUserId() {
    if (typeof window !== 'undefined' && localStorage) {
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      if (storedUser && storedUser.id) {
        this.userId = storedUser.id;
        this.emailId = storedUser.email;
      } else {
        console.error('No se encontró el usuario en el localStorage');
      }
    } else {
      console.warn('localStorage no está disponible en este entorno.');
    }
  }

  loadCartItems(): void {
    console.log(this.emailId);
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
  calculateTotal2(): number {
    this.totalAmount = this.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    return this.totalAmount;
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



  calculateTax(): number {
    return this.selectedPaymentMethod === 'PAYPAL' ? 10 : 5;
  }

  openPaymentModal() {
    this.isPaymentModalOpen = true;
  }

  closePaymentModal() {
    this.isPaymentModalOpen = false;
  }

  // Método para mostrar el modal
  checkout() {
    this.isCheckoutModalVisible = true;
  }

  // Método para cancelar el proceso de pago y cerrar el modal
  cancelCheckout() {
    this.isCheckoutModalVisible = false;
  }

  // Método para confirmar el pago
  confirmPayment() {
    const tax = this.calculateTax();
    const totalAmount = this.calculateTotal2() + tax;
  
    if (this.userId !== null) {
      this.cartService.getPendingCart(this.userId).subscribe(cart => {
        if (cart) {
          const paymentData = {
            total: totalAmount,
            tax: tax,
            payment_method: this.selectedPaymentMethod,
            userEmail: this.emailId ?? ''// Reemplaza con el email del usuario
          };
  
          // Procesa el pago y actualiza el carrito
          this.cartService.processPayment(cart.id, paymentData).subscribe(
            () => {
              Swal.fire('Pago Exitoso', 'El pago se ha completado correctamente', 'success');
              
              // Descuento de productos después del pago exitoso
              this.cartItems.forEach(item => {
                this.productService.getProductById(item.product_id).subscribe(product => {
                  const updatedQuantity = product.available_quantity - item.quantity;
  
                  if (updatedQuantity >= 0) {
                    this.productService.updateProduct(item.product_id, {
                      ...product,
                      available_quantity: updatedQuantity
                    }).subscribe(() => {
                      console.log(`Cantidad actualizada para el producto ID ${item.product_id}`);
                    });
                  } else {
                    Swal.fire({
                      title: 'Error',
                      text: 'No hay suficiente cantidad disponible para el producto: ' + product.name,
                      icon: 'error',
                      confirmButtonText: 'Entendido'
                    });
                  }
                });
              });
  
              // Limpiar el carrito tras el pago
              this.cartItems = [];
              this.isCheckoutModalVisible = false;
            },
            error => {
              Swal.fire('Error', 'Hubo un problema al procesar el pago', 'error');
            }
          );
        } else {
          Swal.fire('Error', 'No se encontró un carrito pendiente', 'error');
        }
      });
    }
  }
  
  

}