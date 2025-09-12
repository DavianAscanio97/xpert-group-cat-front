import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs';

import { CatsService } from '@/core/services/cats.service';
import { CatBreed } from '@/shared/models/cat.model';

/**
 * Componente de búsqueda de razas de gatos
 * Permite buscar y filtrar razas por diferentes criterios
 */
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  searchForm: FormGroup;
  searchResults: CatBreed[] = [];
  isSearching = false;
  hasSearched = false;

  constructor(
    private formBuilder: FormBuilder,
    private catsService: CatsService
  ) {
    this.searchForm = this.createForm();
  }

  ngOnInit(): void {
    // Removed automatic search subscription
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      searchTerm: [''],
      affectionLevel: [''],
      energyLevel: [''],
      childFriendly: [''],
      hypoallergenic: [false],
      hairless: [false],
      natural: [false],
      rare: [false]
    });
  }


  performSearch(): void {
    const searchTerm = this.searchForm.get('searchTerm')?.value?.trim();
    
    this.isSearching = true;
    this.hasSearched = true;

    // Si hay término de búsqueda, buscar por nombre
    if (searchTerm && searchTerm.length >= 2) {
      this.catsService.searchBreeds(searchTerm)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (breeds) => {
            this.searchResults = this.filterBreeds(breeds);
            this.isSearching = false;
          },
          error: (error) => {
            console.error('Error en búsqueda:', error);
            this.isSearching = false;
          }
        });
    } else {
      // Si no hay término de búsqueda, obtener todas las razas y filtrar
      this.catsService.getBreeds()
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (breeds) => {
            this.searchResults = this.filterBreeds(breeds);
            this.isSearching = false;
          },
          error: (error) => {
            console.error('Error al obtener razas:', error);
            this.isSearching = false;
          }
        });
    }
  }

  private filterBreeds(breeds: CatBreed[]): CatBreed[] {
    return breeds.filter(breed => {
      const form = this.searchForm.value;
      
      // Filter by affection level
      if (form.affectionLevel && breed.affection_level !== parseInt(form.affectionLevel)) {
        return false;
      }
      
      // Filter by energy level
      if (form.energyLevel && breed.energy_level !== parseInt(form.energyLevel)) {
        return false;
      }
      
      // Filter by child friendly
      if (form.childFriendly && breed.child_friendly !== parseInt(form.childFriendly)) {
        return false;
      }
      
      // Filter by special features
      if (form.hypoallergenic && !breed.hypoallergenic) {
        return false;
      }
      
      if (form.hairless && !breed.hairless) {
        return false;
      }
      
      if (form.natural && !breed.natural) {
        return false;
      }
      
      if (form.rare && !breed.rare) {
        return false;
      }
      
      return true;
    });
  }

  clearSearch(): void {
    this.searchForm.reset();
    this.searchResults = [];
    this.hasSearched = false;
  }
}
