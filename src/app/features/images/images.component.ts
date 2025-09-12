import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { ImagesService } from '@/core/services/images.service';
import { CatImage } from '@/shared/models/cat.model';

/**
 * Componente para mostrar la galería de imágenes de gatos
 * Permite explorar y filtrar imágenes por raza
 */
@Component({
  selector: 'app-images',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  images: CatImage[] = [];
  selectedImage: CatImage | null = null;
  isLoading = false;
  currentPage = 1;
  imagesPerPage = 20;

  constructor(private imagesService: ImagesService) {}

  ngOnInit(): void {
    this.loadImages();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadImages(): void {
    this.isLoading = true;
    
    this.imagesService.getRandomImages(this.imagesPerPage)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (images) => {
          this.images = images;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error al cargar imágenes:', error);
          this.isLoading = false;
        }
      });
  }

  loadMoreImages(): void {
    this.isLoading = true;
    this.currentPage++;
    
    this.imagesService.getRandomImages(this.imagesPerPage)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (newImages) => {
          this.images = [...this.images, ...newImages];
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error al cargar más imágenes:', error);
          this.isLoading = false;
        }
      });
  }

  viewImage(image: CatImage): void {
    this.selectedImage = image;
  }

  closeModal(): void {
    this.selectedImage = null;
  }

  getImageAlt(image: CatImage): string {
    if (image.breeds && image.breeds.length > 0) {
      return `Imagen de gato de raza ${image.breeds[0].name}`;
    }
    return 'Imagen de gato';
  }

  onImageLoad(): void {
    // Image loaded successfully
  }

  onImageError(): void {
    // Handle image load error
    console.warn('Error al cargar imagen');
  }
}
