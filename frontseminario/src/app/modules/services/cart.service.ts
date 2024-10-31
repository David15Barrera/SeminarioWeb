// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart, CartItem, CartItemSimple } from '../interfaces/cart.model';
import { map, switchMap, tap } from 'rxjs/operators';
@Injectable({
    providedIn: 'root',
})
export class CartService {

    private apiUrl = 'http://localhost:3000/api/carts'; // URL base de la API de carrito
    private cartItemUrl = 'http://localhost:3000/api/cart-item'; // URL base de la API de items de carrito

    constructor(private http: HttpClient) {}

    // Obtener el carrito con estado PENDING del usuario
    getPendingCart(userId: number): Observable<Cart | null> {
        return this.http.get<Cart[]>(`${this.apiUrl}/all`).pipe(
            map((carts: Cart[]) =>
                carts.find(cart => cart.user_id === userId && cart.status === 'PENDING') || null
            )
        );
    }
 
    // Obtener todos los items del carrito pendiente de un usuario específico
    getPendingCartItems(userId: number): Observable<CartItemSimple[]> {
        return this.http.get<CartItemSimple[]>(`${this.apiUrl}/pending/items/${userId}`);
    }

    // Actualizar la cantidad y subtotal de un producto en el carrito
    updateCartItemDetails(cartItemId: number, updatedDetails: Partial<CartItem>): Observable<CartItem> {
        return this.http.put<CartItem>(`${this.cartItemUrl}/update/${cartItemId}`, updatedDetails);
    }


    // Crear un nuevo carrito con estado PENDING
    createPendingCart(userId: number): Observable<Cart> {
        const newCart: Partial<Cart> = {
            total: 0,
            tax: 0,
            payment_method: 'PAYPAL', // Método de pago predeterminado
            status: 'PENDING',
            user_id: userId,
            discount_payment_method: 0,
        };
        return this.http.post<Cart>(`${this.apiUrl}/create`, newCart);
    }

    // Agregar o actualizar un producto en el carrito PENDING
    addProductToCart(userId: number, product: any, quantity: number): Observable<CartItem> {
        return this.getPendingCart(userId).pipe(
            switchMap(cart => {
                if (!cart) {
                    return this.createPendingCart(userId).pipe(
                        switchMap(newCart =>
                            this.createOrUpdateCartItem(newCart.id, product, quantity)
                        )
                    );
                }
                return this.createOrUpdateCartItem(cart.id, product, quantity);
            })
        );
    }

// Crear o actualizar un item en el carrito y actualizar el total
private createOrUpdateCartItem(cartId: number, product: any, quantity: number): Observable<CartItem> {
    const subTotal = product.price * quantity;
    const newCartItem: Partial<CartItem> = {
        cart_id: cartId,
        product_id: product.id,
        quantity: quantity,
        sub_total: subTotal,
    };
    
    return this.createCartItem(newCartItem as CartItem).pipe(
        tap(() => this.updateCartTotal(cartId).subscribe()) // Actualiza el total pero no cambia el tipo de respuesta
    );
}

    // Actualizar el total del carrito
    private updateCartTotal(cartId: number): Observable<Cart> {
        return this.getCartItemsByCartId(cartId).pipe(
            switchMap(items => {
                const total = items.reduce((acc, item) => acc + item.sub_total, 0);
                return this.updateCart(cartId, { total } as Cart);
            })
        );
    }

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

    // Obtener items de carrito por ID de carrito
    getCartItemsByCartId(cartId: number): Observable<CartItem[]> {
        return this.http.get<CartItem[]>(`${this.apiUrl}/by-cart/${cartId}`);
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

   // Obtener carritos por estado
   getCartsByUserIdAndStatus(userId: number, status: 'COMPLETED' | 'CANCELLED_ERROR'): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.apiUrl}/all`).pipe(
        map((carts: Cart[]) =>
            carts.filter(cart => cart.user_id === userId && cart.status === status)
            )
        );
    }

    processPayment(cartId: number, paymentData: { total: number, tax: number, payment_method: string, userEmail: string }): Observable<Cart> {
        return this.http.put<Cart>(`${this.apiUrl}/updatePay/${cartId}`, paymentData);
    }

}



