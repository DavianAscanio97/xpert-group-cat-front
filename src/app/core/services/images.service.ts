import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

import { environment } from '@/environments/environment';
import { CatImage, ImageQuery, PaginatedResponse } from '@/shared/models/cat.model';

/**
 * Servicio para la gestión de imágenes de gatos
 * Consume la API del backend para obtener imágenes de gatos
 */
@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  private readonly API_URL = `${environment.apiUrl}/images`;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene imágenes de gatos con filtros opcionales
   * @param query - Parámetros de consulta para filtrar imágenes
   * @returns Observable con la lista de imágenes
   */
  getImages(query?: ImageQuery): Observable<CatImage[]> {
    let params = new HttpParams();
    
    if (query?.breed_id) {
      params = params.set('breed_id', query.breed_id);
    }
    
    if (query?.page) {
      params = params.set('page', query.page.toString());
    }
    
    if (query?.limit) {
      params = params.set('limit', query.limit.toString());
    }
    
    if (query?.size) {
      params = params.set('size', query.size);
    }
    
    if (query?.mime_types) {
      params = params.set('mime_types', query.mime_types);
    }

    return this.http.get<CatImage[]>(this.API_URL, { params })
      .pipe(
        catchError(error => {
          console.error('Error al obtener imágenes:', error);
          return of([]);
        })
      );
  }

  /**
   * Obtiene imágenes específicas de una raza por su ID
   * @param breedId - ID de la raza
   * @param limit - Número máximo de imágenes a retornar
   * @returns Observable con las imágenes de la raza
   */
  getImagesByBreedId(breedId: string, limit: number = 10): Observable<CatImage[]> {
    const params = new HttpParams()
      .set('breed_id', breedId)
      .set('limit', limit.toString());

    return this.http.get<CatImage[]>(`${this.API_URL}/bybreedid`, { params })
      .pipe(
        catchError(error => {
          console.error('Error al obtener imágenes por raza:', error);
          return of([]);
        })
      );
  }

  /**
   * Obtiene una imagen específica por su ID
   * @param imageId - ID de la imagen
   * @returns Observable con la información de la imagen
   */
  getImageById(imageId: string): Observable<CatImage> {
    return this.http.get<CatImage>(`${this.API_URL}/${imageId}`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener imagen por ID:', error);
          throw error;
        })
      );
  }

  /**
   * Obtiene imágenes aleatorias
   * @param limit - Número de imágenes aleatorias
   * @returns Observable con imágenes aleatorias
   */
  getRandomImages(limit: number = 10): Observable<CatImage[]> {
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('size', 'medium');

    return this.http.get<CatImage[]>(this.API_URL, { params })
      .pipe(
        catchError(error => {
          console.error('Error al obtener imágenes aleatorias:', error);
          return of([]);
        })
      );
  }

  /**
   * Obtiene imágenes con paginación
   * @param page - Número de página
   * @param limit - Límite de resultados por página
   * @returns Observable con la respuesta paginada
   */
  getImagesPaginated(page: number = 1, limit: number = 10): Observable<PaginatedResponse<CatImage>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<PaginatedResponse<CatImage>>(this.API_URL, { params })
      .pipe(
        catchError(error => {
          console.error('Error al obtener imágenes paginadas:', error);
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
   * Obtiene imágenes por tamaño específico
   * @param size - Tamaño de la imagen
   * @param limit - Número de imágenes
   * @returns Observable con imágenes del tamaño especificado
   */
  getImagesBySize(size: 'thumb' | 'small' | 'medium' | 'full', limit: number = 10): Observable<CatImage[]> {
    const params = new HttpParams()
      .set('size', size)
      .set('limit', limit.toString());

    return this.http.get<CatImage[]>(this.API_URL, { params })
      .pipe(
        catchError(error => {
          console.error('Error al obtener imágenes por tamaño:', error);
          return of([]);
        })
      );
  }

  /**
   * Obtiene imágenes por tipo de archivo
   * @param mimeType - Tipo de archivo (jpg, png, gif)
   * @param limit - Número de imágenes
   * @returns Observable con imágenes del tipo especificado
   */
  getImagesByMimeType(mimeType: 'jpg' | 'png' | 'gif', limit: number = 10): Observable<CatImage[]> {
    const params = new HttpParams()
      .set('mime_types', mimeType)
      .set('limit', limit.toString());

    return this.http.get<CatImage[]>(this.API_URL, { params })
      .pipe(
        catchError(error => {
          console.error('Error al obtener imágenes por tipo:', error);
          return of([]);
        })
      );
  }

  /**
   * Pre-carga una imagen para mejorar la experiencia del usuario
   * @param imageUrl - URL de la imagen a pre-cargar
   * @returns Promise que se resuelve cuando la imagen está cargada
   */
  preloadImage(imageUrl: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Error al cargar imagen: ${imageUrl}`));
      img.src = imageUrl;
    });
  }

  /**
   * Pre-carga múltiples imágenes
   * @param imageUrls - Array de URLs de imágenes
   * @returns Promise que se resuelve cuando todas las imágenes están cargadas
   */
  preloadImages(imageUrls: string[]): Promise<void[]> {
    return Promise.all(imageUrls.map(url => this.preloadImage(url)));
  }
}
