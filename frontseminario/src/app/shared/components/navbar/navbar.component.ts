import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

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
