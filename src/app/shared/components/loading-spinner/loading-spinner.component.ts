import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Componente de loading spinner reutilizable
 * Proporciona diferentes estilos de loading para la aplicación
 */
@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent {
  @Input() type: 'simple' | 'logo' | 'dots' | 'pulse' = 'simple';
  @Input() message: string = '';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() variant: 'default' | 'fullscreen' | 'overlay' = 'default';

  get wrapperClass(): string {
    const classes = [];
    
    if (this.variant === 'fullscreen') {
      classes.push('fullscreen');
    } else if (this.variant === 'overlay') {
      classes.push('overlay');
    }
    
    if (this.size === 'small') {
      classes.push('small');
    } else if (this.size === 'large') {
      classes.push('large');
    }
    
    return classes.join(' ');
  }
}