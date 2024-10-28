import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
interface Message {
  text: string;
  sentByMe: boolean;
}

interface User {
  name: string;
}


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  users = ['Juan', 'María', 'Carlos', 'Ana'];
  messages = [
    { sender: 'Juan', content: '¡Hola! ¿Cómo estás?' },
    { sender: 'Yo', content: 'Bien, gracias. ¿Y tú?' },
    { sender: 'Juan', content: 'Todo bien, gracias por preguntar!' }
  ];
  newMessage = '';

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({ sender: 'Yo', content: this.newMessage });
      this.newMessage = '';
    }
  }

}
