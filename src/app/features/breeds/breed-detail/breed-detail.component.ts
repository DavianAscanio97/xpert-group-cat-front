import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { CatsService } from '@/core/services/cats.service';
import { ImagesService } from '@/core/services/images.service';
import { CatBreed, CatImage } from '@/shared/models/cat.model';

/**
 * Componente para mostrar el detalle de una raza específica
 * Muestra información detallada e imágenes de la raza
 */
@Component({
  selector: 'app-breed-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breed-detail.component.html',
  styleUrls: ['./breed-detail.component.scss']
})
export class BreedDetailComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  breed: CatBreed | null = null;
  images: CatImage[] = [];
  isLoading = false;
  isLoadingImages = false;

  constructor(
    private route: ActivatedRoute,
    private catsService: CatsService,
    private imagesService: ImagesService
  ) {}

  ngOnInit(): void {
    this.loadBreedDetail();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadBreedDetail(): void {
    this.isLoading = true;
    
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const breedId = params['id'];
        if (breedId) {
          this.catsService.getBreedById(breedId)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next: (breed) => {
                this.breed = breed;
                this.isLoading = false;
                this.loadBreedImages(breedId);
              },
              error: (error) => {
                console.error('Error al cargar raza:', error);
                this.isLoading = false;
              }
            });
        }
      });
  }

  private loadBreedImages(breedId: string): void {
    this.isLoadingImages = true;
    
    this.imagesService.getImagesByBreedId(breedId, 5)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (images) => {
          this.images = images;
          this.isLoadingImages = false;
        },
        error: (error) => {
          console.error('Error al cargar imágenes:', error);
          this.isLoadingImages = false;
        }
      });
  }

  hasSpecialFeatures(): boolean {
    if (!this.breed) return false;
    
    return !!(this.breed.hypoallergenic || this.breed.hairless || this.breed.natural || 
              this.breed.rare || this.breed.rex || this.breed.short_legs);
  }

  goBack(): void {
    window.history.back();
  }
}
