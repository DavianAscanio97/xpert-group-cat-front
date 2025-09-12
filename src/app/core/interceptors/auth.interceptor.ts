import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { AuthService } from '@/core/services/auth.service';

/**
 * Interceptor de autenticación
 * Añade automáticamente el token JWT a las peticiones HTTP
 */
export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  
  // Si hay token y no es una petición de autenticación, añadir el header Authorization
  if (token && !isAuthRequest(request.url)) {
    const authRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    
    return next(authRequest);
  }
  
  return next(request);
};

/**
 * Verifica si la petición es de autenticación
 * @param url - URL de la petición
 * @returns true si es una petición de autenticación, false en caso contrario
 */
function isAuthRequest(url: string): boolean {
  return url.includes('/auth/login') || url.includes('/auth/register');
}
