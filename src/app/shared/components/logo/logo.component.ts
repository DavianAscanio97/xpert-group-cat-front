import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * Componente de logo reutilizable
 * Proporciona diferentes variantes del logo de Cats App
 */
@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent {
  @Input() variant: 'default' | 'large' | 'small' | 'minimal' = 'default';
  @Input() showText = true;
  @Input() showSubtitle = true;
  @Input() link = '/dashboard';
  @Input() wrapperClass = '';

  get iconContainerClass(): string {
    const baseClasses = 'bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105';
    
    switch (this.variant) {
      case 'large':
        return `${baseClasses} w-16 h-16`;
      case 'small':
        return `${baseClasses} w-8 h-8`;
      case 'minimal':
        return `${baseClasses} w-6 h-6`;
      default:
        return `${baseClasses} w-10 h-10`;
    }
  }

  get iconClass(): string {
    switch (this.variant) {
      case 'large':
        return 'text-3xl';
      case 'small':
        return 'text-lg';
      case 'minimal':
        return 'text-sm';
      default:
        return 'text-xl';
    }
  }

  get titleClass(): string {
    const baseClasses = 'font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300';
    
    switch (this.variant) {
      case 'large':
        return `${baseClasses} text-3xl`;
      case 'small':
        return `${baseClasses} text-lg`;
      case 'minimal':
        return `${baseClasses} text-sm`;
      default:
        return `${baseClasses} text-xl`;
    }
  }

  get subtitleClass(): string {
    const baseClasses = 'text-gray-500 -mt-1';
    
    switch (this.variant) {
      case 'large':
        return `${baseClasses} text-sm`;
      case 'small':
        return `${baseClasses} text-xs`;
      case 'minimal':
        return `${baseClasses} text-xs`;
      default:
        return `${baseClasses} text-xs hidden sm:block`;
    }
  }
}
