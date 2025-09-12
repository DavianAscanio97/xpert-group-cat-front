import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * Componente de página no encontrada (404)
 * Muestra un mensaje de error cuando la ruta no existe
 */
@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
  /**
   * Regresa a la página anterior en el historial del navegador
   */
  goBack(): void {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      // Si no hay historial, redirigir al dashboard
      window.location.href = '/dashboard';
    }
  }
}
