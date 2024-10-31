import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ChatService } from '../../services/chat.service';
import { User, UserWithMessages } from '../interfaces/user.model';
import { Message, Chat } from '../interfaces/chat.model';
import { isPlatformBrowser } from '@angular/common';
interface Publication {
  id: number;
  content: string;
  userName: string; // Añadido para almacenar el nombre del usuario
  timestamp: string; // Para almacenar la marca de tiempo
}
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
  messages: Message[] = [];
  posts: Publication[] = []; // Cambiado a tipo Publication
  newMessage = '';
  newPost = '';
  userId: number | null = null;
  userName: string | null = null;
  currentChatId: number | undefined;
  isChatOpen: boolean = false; // Nueva propiedad

  constructor(private userService: UserService, private chatService: ChatService, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    this.loadUserId();
    this.loadUsers();
    this.loadPosts(); // Cargar publicaciones desde localStorage
  }

  loadUserId() {
    if (isPlatformBrowser(this.platformId)) { // Verifica que estás en el navegador
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      if (storedUser && storedUser.id) {
        this.userId = storedUser.id;
        this.userName = storedUser.name;
      } else {
        console.error('No se encontró el usuario en el localStorage');
      }
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

  loadPosts(): void {
    if (isPlatformBrowser(this.platformId)) { // Verifica que estás en el navegador
      const storedPosts = localStorage.getItem('posts');
      if (storedPosts) {
        this.posts = JSON.parse(storedPosts);
      }
    }
  }

  savePosts(): void {
    if (isPlatformBrowser(this.platformId)) { // Verifica que estás en el navegador
      localStorage.setItem('posts', JSON.stringify(this.posts));
    }
  }

  selectUser(user: User) {
    if (this.userId) {
      this.chatService.getOrCreateChat(this.userId, user.id).subscribe(response => {
        this.messages = response.messages;
        this.currentChatId = response.chat.id;
      });
    }
  }

  sendMessage() {
    if (this.newMessage.trim() && this.currentChatId !== null && this.userId !== null) {
      const chatId: number = this.currentChatId!;
      const senderId: number = this.userId!;
  
      this.chatService.createMessage(chatId, senderId, this.newMessage).subscribe(newMessage => {
        this.messages.push(newMessage);
        this.newMessage = '';
      });
    }
  }

  createPost() {
    if (this.newPost.trim()) {
      const timestamp = new Date().toLocaleString();
      const newPublication: Publication = { 
        id: this.posts.length + 1, // Generar ID simple (mejorar en producción)
        content: this.newPost, 
        userName: this.userName!, 
        timestamp 
      };
      this.posts.push(newPublication);
      this.savePosts(); // Guardar publicaciones en localStorage
      this.newPost = '';
    }
  }

  toggleChat() {
    this.isChatOpen = !this.isChatOpen; // Alterna el estado del chat
  }
}