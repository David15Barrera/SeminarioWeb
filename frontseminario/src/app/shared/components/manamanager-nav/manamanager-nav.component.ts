import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-manamanager-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './manamanager-nav.component.html',
  styleUrl: './manamanager-nav.component.scss'
})
export class ManamanagerNavComponent {
  isSidebarOpen = false;
  
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
