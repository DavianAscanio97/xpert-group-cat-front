import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, of, map } from 'rxjs';

import { environment } from '@/environments/environment';
import { CatBreed, BreedQuery, PaginatedResponse } from '@/shared/models/cat.model';

/**
 * Servicio para la gestión de razas de gatos
 * Consume la API del backend para obtener información sobre razas de gatos
 */
@Injectable({
  providedIn: 'root'
})
export class CatsService {
  private readonly API_URL = `${environment.apiUrl}/breeds`;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todas las razas de gatos disponibles
   * @param query - Parámetros de consulta opcionales
   * @returns Observable con la lista de razas
   */
  getBreeds(query?: BreedQuery): Observable<CatBreed[]> {
    let params = new HttpParams();
    
    if (query?.q) {
      params = params.set('q', query.q);
    }
    
    if (query?.page) {
      params = params.set('page', query.page.toString());
    }
    
    if (query?.limit) {
      params = params.set('limit', query.limit.toString());
    }

    return this.http.get<CatBreed[]>(this.API_URL, { params })
      .pipe(
        catchError(error => {
          console.error('Error al obtener razas de gatos:', error);
          return of([]);
        })
      );
  }

  /**
   * Obtiene una raza específica por su ID
   * @param breedId - ID de la raza
   * @returns Observable con la información de la raza
   */
  getBreedById(breedId: string): Observable<CatBreed> {
    return this.http.get<CatBreed>(`${this.API_URL}/${breedId}`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener raza por ID:', error);
          throw error;
        })
      );
  }

  /**
   * Busca razas de gatos por término de búsqueda
   * @param searchTerm - Término de búsqueda
   * @returns Observable con las razas que coinciden
   */
  searchBreeds(searchTerm: string): Observable<CatBreed[]> {
    return this.http.get<CatBreed[]>(`${this.API_URL}/search/${encodeURIComponent(searchTerm)}`)
      .pipe(
        catchError(error => {
          console.error('Error al buscar razas:', error);
          return of([]);
        })
      );
  }

  /**
   * Obtiene razas de gatos con paginación
   * @param page - Número de página
   * @param limit - Límite de resultados por página
   * @returns Observable con la respuesta paginada
   */
  getBreedsPaginated(page: number = 1, limit: number = 10): Observable<PaginatedResponse<CatBreed>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<PaginatedResponse<CatBreed>>(this.API_URL, { params })
      .pipe(
        catchError(error => {
          console.error('Error al obtener razas paginadas:', error);
          return of({
            data: [],
            total: 0,
            page: 1,
            limit: 10,
            hasMore: false
          });
        })
      );
  }

  /**
   * Obtiene las razas más populares
   * @param limit - Número de razas a retornar
   * @returns Observable con las razas más populares
   */
  getPopularBreeds(limit: number = 5): Observable<CatBreed[]> {
    return this.getBreeds({ limit })
      .pipe(
        catchError(error => {
          console.error('Error al obtener razas populares:', error);
          return of([]);
        })
      );
  }

  /**
   * Filtra razas por características específicas
   * @param filters - Filtros a aplicar
   * @returns Observable con las razas filtradas
   */
  filterBreedsByCharacteristics(filters: {
    hypoallergenic?: boolean;
    child_friendly?: number;
    dog_friendly?: number;
    energy_level?: number;
    grooming?: number;
  }): Observable<CatBreed[]> {
    return this.getBreeds()
      .pipe(
        catchError(error => {
          console.error('Error al filtrar razas:', error);
          return of([]);
        })
      );
  }

  /**
   * Obtiene estadísticas de las razas
   * @returns Observable con estadísticas de las razas
   */
  getBreedStatistics(): Observable<{
    totalBreeds: number;
    hypoallergenicBreeds: number;
    averageWeight: number;
    mostCommonOrigin: string;
  }> {
    return this.getBreeds()
      .pipe(
        map(breeds => {
          const totalBreeds = breeds.length;
          const hypoallergenicBreeds = breeds.filter(breed => breed.hypoallergenic).length;
          
          // Calcular peso promedio
          const weightsWithValues = breeds
            .filter(breed => breed.weight?.metric)
            .map(breed => {
              const weightStr = breed.weight!.metric;
              const match = weightStr.match(/(\d+(?:\.\d+)?)/);
              return match ? parseFloat(match[1]) : 0;
            })
            .filter(weight => weight > 0);
          
          const averageWeight = weightsWithValues.length > 0 
            ? weightsWithValues.reduce((sum, weight) => sum + weight, 0) / weightsWithValues.length 
            : 0;
          
          // Encontrar origen más común
          const origins = breeds
            .filter(breed => breed.origin)
            .map(breed => breed.origin!);
          
          const originCounts = origins.reduce((acc, origin) => {
            acc[origin] = (acc[origin] || 0) + 1;
            return acc;
          }, {} as Record<string, number>);
          
          const mostCommonOrigin = Object.keys(originCounts).length > 0
            ? Object.keys(originCounts).reduce((a, b) => originCounts[a] > originCounts[b] ? a : b)
            : 'N/A';
          
          return {
            totalBreeds,
            hypoallergenicBreeds,
            averageWeight: Math.round(averageWeight * 10) / 10,
            mostCommonOrigin
          };
        }),
        catchError(error => {
          console.error('Error al obtener estadísticas:', error);
          return of({
            totalBreeds: 0,
            hypoallergenicBreeds: 0,
            averageWeight: 0,
            mostCommonOrigin: 'N/A'
          });
        })
      );
  }
}
