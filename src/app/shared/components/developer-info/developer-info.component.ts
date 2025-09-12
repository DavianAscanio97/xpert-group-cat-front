import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Componente de información del desarrollador
 * Muestra información sobre el creador de la aplicación
 */
@Component({
  selector: 'app-developer-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './developer-info.component.html',
  styleUrls: ['./developer-info.component.scss']
})
export class DeveloperInfoComponent {}
