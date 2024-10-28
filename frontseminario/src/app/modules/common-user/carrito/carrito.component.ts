import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { CartItemSimple } from '../../interfaces/cart.model';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.scss'
})
export class CarritoComponent implements OnInit {
  cartItems: CartItemSimple[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    const userId = 5; // Reemplaza esto por el ID del usuario correspondiente
    this.cartService.getPendingCartItems(userId).subscribe(items => {
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
    this.cartService.deleteCartItem(item.id).subscribe(() => {
      this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== item.id);
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