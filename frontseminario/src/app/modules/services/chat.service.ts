// src/app/services/chat.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chat, Message } from './../manager/interfaces/chat.model';

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  private apiUrl = 'http://localhost:3000/api/chats';
  private messageApiUrl = 'http://localhost:3000/api/messages';
  private participantApiUrl = 'http://localhost:3000/api/chat-participants';

  constructor(private http: HttpClient) {}

  // Crear un chat
  createChat(chat: Chat): Observable<Chat> {
    return this.http.post<Chat>(`${this.apiUrl}/create`, chat);
  }

  // Obtener un chat por ID
  getChatById(id: number): Observable<Chat> {
    return this.http.get<Chat>(`${this.apiUrl}/${id}`);
  }

  // Eliminar un chat
  deleteChat(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  // Obtener mensajes por chat ID
  getMessagesByChatId(chat_id: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/${chat_id}/messages`);
  }

  // Crear un mensaje
  //createMessage(message: Message): Observable<Message> {
  // return this.http.post<Message>(`${this.messageApiUrl}/create`, message);
 // }

  // Obtener todos los mensajes
  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.messageApiUrl}/all`);
  }

  // Obtener mensaje por ID
  getMessageById(id: number): Observable<Message> {
    return this.http.get<Message>(`${this.messageApiUrl}/${id}`);
  }

  // Eliminar mensaje
  deleteMessage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.messageApiUrl}/delete/${id}`);
  }

  // Obtener chats de un usuario específico
  getUserChats(user_id: number): Observable<Chat[]> {
    return this.http.get<Chat[]>(`${this.apiUrl}/user/${user_id}`);
  }

  // Obtener participantes de un chat
  getChatParticipants(chat_id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.participantApiUrl}/${chat_id}`);
  }

  // Añadir participante
  addParticipant(chat_id: number, user_id: number): Observable<void> {
    return this.http.post<void>(`${this.participantApiUrl}/`, { chat_id, user_id });
  }

  // Eliminar participante
  removeParticipant(chat_id: number, user_id: number): Observable<void> {
    return this.http.delete<void>(`${this.participantApiUrl}/${chat_id}/${user_id}`);
  }

// Obtener o crear un chat entre dos usuarios
  getOrCreateChat(user_id_1: number, user_id_2: number): Observable<{ chat: Chat, messages: Message[] }> {
    return this.http.post<{ chat: Chat, messages: Message[] }>(`${this.apiUrl}/getOrCreateChat`, { user_id_1, user_id_2 });
  }

  createMessage(chat_id: number, sender_id: number, message: string): Observable<Message> {
    return this.http.post<Message>(`${this.messageApiUrl}/create`, {
      chat_id,
      sender_id,
      message
    });
  }
}
