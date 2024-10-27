import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-auth-nav',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './auth-nav.component.html',
  styleUrl: './auth-nav.component.scss'
})
export class AuthNavComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
