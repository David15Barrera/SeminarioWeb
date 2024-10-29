import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-manamanager-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './manamanager-nav.component.html',
  styleUrl: './manamanager-nav.component.scss'
})
export class ManamanagerNavComponent {

  constructor(private authService: AuthService,  private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/session/login']); 
  }

  isSidebarOpen = false;
  
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
