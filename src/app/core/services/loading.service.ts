import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Servicio de estado de carga
 * Maneja el estado global de carga de la aplicación
 */
@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private loadingOperations = new Map<string, boolean>();

  public loading$ = this.loadingSubject.asObservable();

  /**
   * Establece el estado de carga global
   * @param loading - Estado de carga
   */
  setLoading(loading: boolean): void {
    this.loadingSubject.next(loading);
  }

  /**
   * Obtiene el estado actual de carga
   * @returns true si está cargando, false en caso contrario
   */
  isLoading(): boolean {
    return this.loadingSubject.value;
  }

  /**
   * Establece el estado de carga para una operación específica
   * @param operation - Nombre de la operación
   * @param loading - Estado de carga
   */
  setOperationLoading(operation: string, loading: boolean): void {
    this.loadingOperations.set(operation, loading);
    
    // Actualizar estado global si hay operaciones activas
    const hasActiveOperations = Array.from(this.loadingOperations.values()).some(isLoading => isLoading);
    this.setLoading(hasActiveOperations);
  }

  /**
   * Obtiene el estado de carga para una operación específica
   * @param operation - Nombre de la operación
   * @returns true si la operación está cargando, false en caso contrario
   */
  isOperationLoading(operation: string): boolean {
    return this.loadingOperations.get(operation) || false;
  }

  /**
   * Limpia el estado de carga de una operación específica
   * @param operation - Nombre de la operación
   */
  clearOperationLoading(operation: string): void {
    this.loadingOperations.delete(operation);
    
    // Actualizar estado global
    const hasActiveOperations = Array.from(this.loadingOperations.values()).some(isLoading => isLoading);
    this.setLoading(hasActiveOperations);
  }

  /**
   * Limpia todos los estados de carga
   */
  clearAllLoading(): void {
    this.loadingOperations.clear();
    this.setLoading(false);
  }

  /**
   * Obtiene el número de operaciones activas
   * @returns Número de operaciones en curso
   */
  getActiveOperationsCount(): number {
    return Array.from(this.loadingOperations.values()).filter(isLoading => isLoading).length;
  }

  /**
   * Obtiene la lista de operaciones activas
   * @returns Array con los nombres de las operaciones activas
   */
  getActiveOperations(): string[] {
    return Array.from(this.loadingOperations.entries())
      .filter(([_, isLoading]) => isLoading)
      .map(([operation, _]) => operation);
  }
}
