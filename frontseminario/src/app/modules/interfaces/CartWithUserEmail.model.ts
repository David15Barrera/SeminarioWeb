import { Cart } from "./cart.model";

export interface CartWithUserEmail extends Cart {
    userEmail: string; // Agrega la propiedad aquí
  }