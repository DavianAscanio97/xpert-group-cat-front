import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { CatsService } from '@/core/services/cats.service';
import { CatBreed } from '@/shared/models/cat.model';

/**
 * Componente para mostrar la lista de razas de gatos
 * Permite explorar y filtrar las razas disponibles
 */
@Component({
  selector: 'app-breeds',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breeds.component.html',
  styleUrls: ['./breeds.component.scss']
})
export class BreedsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  breeds: CatBreed[] = [];
  isLoading = false;

  constructor(private catsService: CatsService) {}

  ngOnInit(): void {
    this.loadBreeds();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadBreeds(): void {
    this.isLoading = true;
    
    this.catsService.getBreeds()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (breeds) => {
          this.breeds = breeds;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error al cargar razas:', error);
          this.isLoading = false;
        }
      });
  }
}
