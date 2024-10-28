export interface User {
    id: number;
    name: string;
    email: string;
    address: string;
    nit: string;
    password: string;
    role_id?: number;
    payment_method: 'PAYPAL' | 'PAYMENT_GATEWAY';
    created_at?: string;
  }