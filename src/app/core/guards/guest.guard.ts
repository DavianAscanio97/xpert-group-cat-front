import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from '@/core/services/auth.service';

/**
 * Guard para usuarios no autenticados
 * Protege las rutas que solo pueden acceder usuarios no autenticados (login, register)
 */
@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Verifica si el usuario no autenticado puede acceder a la ruta
   * @returns Observable con el resultado de la verificación
   */
  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.isAuthenticated$.pipe(
      take(1),
      map(isAuthenticated => {
        if (!isAuthenticated) {
          return true;
        } else {
          // Redirigir al dashboard si ya está autenticado
          return this.router.createUrlTree(['/dashboard']);
        }
      })
    );
  }
}
