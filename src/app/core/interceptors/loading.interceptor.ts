import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { LoadingService } from '@/core/services/loading.service';

// Variable global para contar peticiones activas
let activeRequests = 0;

/**
 * Interceptor de carga
 * Maneja el estado de carga global de la aplicación
 */
export const loadingInterceptor: HttpInterceptorFn = (request, next) => {
  const loadingService = inject(LoadingService);
  
  // Incrementar contador de peticiones activas
  activeRequests++;
  
  // Mostrar loading si es la primera petición
  if (activeRequests === 1) {
    loadingService.setLoading(true);
  }

  return next(request).pipe(
    finalize(() => {
      // Decrementar contador de peticiones activas
      activeRequests--;
      
      // Ocultar loading si no hay peticiones activas
      if (activeRequests === 0) {
        loadingService.setLoading(false);
      }
    })
  );
};
