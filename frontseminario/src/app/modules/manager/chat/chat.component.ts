import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ChatService } from '../../services/chat.service';
import { User, UserWithMessages } from '../interfaces/user.model';
import { Message, Chat } from '../interfaces/chat.model';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  messages: Message[] = []; // Cambiado a un array vacío
  newMessage = '';
  userId: number | null = null;
  userName: string | null = null;
  currentChatId: number | undefined; // Cambiar a undefined en lugar de null


  constructor(private userService: UserService, private chatService: ChatService) {}

  ngOnInit(): void {
    this.loadUserId();
    this.loadUsers();
  }

  loadUserId() {
    if (typeof window !== 'undefined' && localStorage) {
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      if (storedUser && storedUser.id) {
        this.userId = storedUser.id;
        this.userName = storedUser.name;
      } else {
        console.error('No se encontró el usuario en el localStorage');
      }
    } else {
      console.warn('localStorage no está disponible en este entorno.');
    }
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
      this.filterUsers();
    });
  }

  filterUsers(): void {
    this.filteredUsers = this.users.filter(user => (user.role_id === 1 || user.role_id === 3) && user.id !== this.userId);
  }

  selectUser(user: User) {
    if (this.userId) {
      this.chatService.getOrCreateChat(this.userId, user.id).subscribe(response => {
        this.messages = response.messages;
        this.currentChatId = response.chat.id; // Guardar el ID del chat actual
      });
    }
  }

  sendMessage() {
    if (this.newMessage.trim() && this.currentChatId !== null && this.userId !== null) {
      // Verificar que currentChatId y userId sean números
      const chatId: number = this.currentChatId!;
      const senderId: number = this.userId!;
  
      this.chatService.createMessage(chatId, senderId, this.newMessage).subscribe(newMessage => {
        this.messages.push(newMessage);
        this.newMessage = '';
      }, error => {
        console.error('Error al enviar el mensaje:', error);
      });
    } else {
      console.warn('No se puede enviar el mensaje. Asegúrate de que los campos no estén vacíos y que los IDs sean válidos.');
    }
  }
  
}