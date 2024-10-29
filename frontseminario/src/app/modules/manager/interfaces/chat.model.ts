// src/app/interfaces/chat.model.ts
export interface Chat {
  participants: any; // Puedes definir un tipo más específico si es necesario
  id?: number;
  created_at?: Date;
}

export interface Message {
  id: number;
  message: string;
  created_at: string;
  chat_id: number;
  sender?: string; // Agrega este campo opcional para identificar al remitente en el frontend
}
