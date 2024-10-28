// src/app/models/cart.model.ts
export interface Cart {
    id: number;
    total: number;
    tax: number;
    payment_method: 'PAYPAL' | 'PAYMENT_GATEWAY';
    status: 'COMPLETED' | 'CANCELLED_ERROR' | 'PENDING';
    description_error?: string;
    user_id: number;
    discount_payment_method: number;
    created_at?: string; // Opcional si no siempre se proporciona
}

export interface CartItem {
    id: number;
    quantity: number;
    sub_total: number;
    cart_id: number;
    product_id: number;
}
