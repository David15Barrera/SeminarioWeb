import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string; // URL de la imagen
}

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.scss'
})
export class CarritoComponent implements OnInit {
  cartItems: CartItem[] = [
    {
      id: 1,
      name: 'Producto 1',
      price: 29.99,
      quantity: 1,
      image: 'https://via.placeholder.com/150' // URL de ejemplo
    },
    {
      id: 2,
      name: 'Producto 2',
      price: 49.99,
      quantity: 1,
      image: 'https://via.placeholder.com/150' // URL de ejemplo
    }
  ];

  constructor() {}

  ngOnInit(): void {
    // Aquí puedes cargar los elementos del carrito desde una API si es necesario.
  }

  calculateTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  increaseQuantity(item: CartItem) {
    item.quantity++;
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  removeFromCart(item: CartItem) {
    this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== item.id);
  }

  checkout() {
    // Aquí puedes manejar el proceso de pago o redirigir a la página de pago.
    alert('Procediendo al pago...');
  }
}