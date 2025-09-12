import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UserProfile } from '@/shared/models/user.model';
import { LogoComponent } from '@/shared/components/logo/logo.component';

/**
 * Componente de header de la aplicación
 * Muestra la navegación principal y el estado de autenticación
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, LogoComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() isAuthenticated = false;
  @Input() userProfile: UserProfile | null = null;
  @Output() logout = new EventEmitter<void>();

  showUserMenu = false;
  showMobileMenu = false;

  /**
   * Alterna la visibilidad del menú de usuario
   */
  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }

  /**
   * Alterna la visibilidad del menú móvil
   */
  toggleMobileMenu(): void {
    this.showMobileMenu = !this.showMobileMenu;
  }

  /**
   * Obtiene las iniciales del usuario para el avatar
   * @returns Iniciales del usuario
   */
  getUserInitials(): string {
    if (!this.userProfile?.email) return 'U';
    
    const email = this.userProfile.email;
    const name = email.split('@')[0];
    return name.substring(0, 2).toUpperCase();
  }

  /**
   * Maneja el logout del usuario
   */
  onLogout(): void {
    this.showUserMenu = false;
    this.showMobileMenu = false;
    this.logout.emit();
  }
}
