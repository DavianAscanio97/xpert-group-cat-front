import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { CatsService } from '@/core/services/cats.service';
import { ImagesService } from '@/core/services/images.service';
import { AuthService } from '@/core/services/auth.service';
import { CatBreed, CatImage } from '@/shared/models/cat.model';
import { LoadingSpinnerComponent } from '@/shared/components/loading-spinner/loading-spinner.component';
import { LogoComponent } from '@/shared/components/logo/logo.component';

/**
 * Componente del dashboard principal
 * Muestra un resumen de la aplicación y las razas más populares
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingSpinnerComponent, LogoComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  popularBreeds: CatBreed[] = [];
  isLoadingBreeds = false;
  totalBreeds = 0;
  totalImages = 0;
  userProfile: any = null;

  constructor(
    private catsService: CatsService,
    private imagesService: ImagesService,
    private authService: AuthService
  ) {}

  /**
   * Inicializa el componente
   */
  ngOnInit(): void {
    this.loadPopularBreeds();
    this.loadUserProfile();
    this.loadStats();
  }

  /**
   * Limpia las suscripciones al destruir el componente
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Carga las razas más populares
   */
  private loadPopularBreeds(): void {
    this.isLoadingBreeds = true;
    
    this.catsService.getPopularBreeds(6)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (breeds) => {
          this.popularBreeds = breeds;
          this.totalBreeds = breeds.length;
          this.isLoadingBreeds = false;
        },
        error: (error) => {
          console.error('Error al cargar razas populares:', error);
          this.isLoadingBreeds = false;
        }
      });
  }

  /**
   * Carga el perfil del usuario
   */
  private loadUserProfile(): void {
    this.authService.userProfile$
      .pipe(takeUntil(this.destroy$))
      .subscribe(profile => {
        this.userProfile = profile;
      });
  }

  /**
   * Carga las estadísticas generales
   */
  private loadStats(): void {
    // Cargar estadísticas de imágenes
    this.imagesService.getRandomImages(1)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (images) => {
          this.totalImages = images.length > 0 ? 1000 : 0; // Simulación
        },
        error: (error) => {
          console.error('Error al cargar estadísticas:', error);
        }
      });
  }
}
