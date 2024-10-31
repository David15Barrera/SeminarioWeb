// store.model.ts
export interface Store {
    id?: number; // El ? indica que es opcional, para los casos de creación
    name: string;
    description?: string;
    address: string;
    phone?: string;
    // Agrega otros campos que sean relevantes para tu modelo
  }
  