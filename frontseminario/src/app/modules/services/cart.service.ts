// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart, CartItem } from '../interfaces/cart.model';

@Injectable({
    providedIn: 'root',
})
export class CartService {
    private apiUrl = 'http://localhost:3000/api/carts'; // URL base de la API de carrito
    private cartItemUrl = 'http://localhost:3000/api/cart-item'; // URL base de la API de items de carrito

    constructor(private http: HttpClient) {}

    // Crear un nuevo carrito
    createCart(cart: Cart): Observable<Cart> {
        return this.http.post<Cart>(`${this.apiUrl}/create`, cart);
    }

    // Obtener todos los carritos
    getAllCarts(): Observable<Cart[]> {
        return this.http.get<Cart[]>(`${this.apiUrl}/all`);
    }

    // Obtener un carrito por ID
    getCartById(id: number): Observable<Cart> {
        return this.http.get<Cart>(`${this.apiUrl}/${id}`);
    }

    // Actualizar un carrito existente
    updateCart(id: number, cart: Cart): Observable<Cart> {
        return this.http.put<Cart>(`${this.apiUrl}/update/${id}`, cart);
    }

    // Eliminar un carrito
    deleteCart(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
    }

    // Crear un nuevo item de carrito
    createCartItem(cartItem: CartItem): Observable<CartItem> {
        return this.http.post<CartItem>(`${this.cartItemUrl}/create`, cartItem);
    }

    // Obtener todos los items de carrito
    getAllCartItems(): Observable<CartItem[]> {
        return this.http.get<CartItem[]>(`${this.cartItemUrl}/all`);
    }

    // Obtener un item de carrito por ID
    getCartItemById(id: number): Observable<CartItem> {
        return this.http.get<CartItem>(`${this.cartItemUrl}/${id}`);
    }

    // Actualizar un item de carrito existente
    updateCartItem(id: number, cartItem: CartItem): Observable<CartItem> {
        return this.http.put<CartItem>(`${this.cartItemUrl}/update/${id}`, cartItem);
    }

    // Eliminar un item de carrito
    deleteCartItem(id: number): Observable<void> {
        return this.http.delete<void>(`${this.cartItemUrl}/delete/${id}`);
    }
}
