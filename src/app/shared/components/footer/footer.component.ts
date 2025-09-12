import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * Componente de footer de la aplicación
 * Muestra información de la aplicación y enlaces útiles
 */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  /**
   * Obtiene el año actual para el copyright
   * @returns Año actual
   */
  get currentYear(): number {
    return new Date().getFullYear();
  }
}
