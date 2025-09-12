import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '@/core/services/auth.service';

/**
 * Interceptor de manejo de errores
 * Maneja errores HTTP globales y redirige según el tipo de error
 */
export const errorInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Ha ocurrido un error inesperado';
      
      if (error.error instanceof ErrorEvent) {
        // Error del lado del cliente
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Error del lado del servidor
        switch (error.status) {
          case 400:
            errorMessage = 'Solicitud inválida. Verifica los datos enviados.';
            break;
          case 401:
            errorMessage = 'No autorizado. Por favor, inicia sesión nuevamente.';
            handleUnauthorized(authService, router);
            break;
          case 403:
            errorMessage = 'Acceso denegado. No tienes permisos para realizar esta acción.';
            break;
          case 404:
            errorMessage = 'Recurso no encontrado.';
            break;
          case 409:
            errorMessage = 'Conflicto. El recurso ya existe o está en uso.';
            break;
          case 422:
            errorMessage = 'Datos de entrada inválidos.';
            break;
          case 500:
            errorMessage = 'Error interno del servidor. Inténtalo más tarde.';
            break;
          case 503:
            errorMessage = 'Servicio no disponible temporalmente.';
            break;
          default:
            errorMessage = `Error ${error.status}: ${error.message}`;
        }
      }
      
      // Log del error para debugging
      console.error('Error HTTP:', {
        url: request.url,
        method: request.method,
        status: error.status,
        message: errorMessage,
        error: error.error
      });
      
      return throwError(() => new Error(errorMessage));
    })
  );
};

/**
 * Maneja errores de autorización (401)
 * Cierra la sesión y redirige al login
 */
function handleUnauthorized(authService: AuthService, router: Router): void {
  authService.logout();
  router.navigate(['/login']);
}
