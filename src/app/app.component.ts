import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Subject, takeUntil, filter } from 'rxjs';

import { AuthService } from '@/core/services/auth.service';
import { LoadingService } from '@/core/services/loading.service';
import { HeaderComponent } from '@/shared/components/header/header.component';
import { FooterComponent } from '@/shared/components/footer/footer.component';
import { LoadingSpinnerComponent } from '@/shared/components/loading-spinner/loading-spinner.component';

/**
 * Componente principal de la aplicación
 * Maneja el layout general y el estado global de la aplicación
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  isAuthenticated = false;
  userProfile: any = null;
  isLoading = false;
  loadingMessage = 'Cargando...';
  currentRoute = '';

  constructor(
    private authService: AuthService,
    private loadingService: LoadingService,
    private router: Router
  ) {}

  /**
   * Inicializa el componente
   * Suscribe a los observables de autenticación y carga
   */
  ngOnInit(): void {
    this.subscribeToAuthState();
    this.subscribeToLoadingState();
    this.subscribeToRouteChanges();
  }

  /**
   * Limpia las suscripciones al destruir el componente
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Suscribe al estado de autenticación
   */
  private subscribeToAuthState(): void {
    this.authService.isAuthenticated$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
      });

    this.authService.userProfile$
      .pipe(takeUntil(this.destroy$))
      .subscribe(profile => {
        this.userProfile = profile;
      });
  }

  /**
   * Suscribe al estado de carga
   */
  private subscribeToLoadingState(): void {
    this.loadingService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe(loading => {
        this.isLoading = loading;
      });
  }

  /**
   * Suscribe a los cambios de ruta
   */
  private subscribeToRouteChanges(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event) => {
        this.currentRoute = (event as NavigationEnd).url;
        this.updatePageTitle();
      });
  }

  /**
   * Actualiza el título de la página según la ruta actual
   */
  private updatePageTitle(): void {
    const routeTitle = this.getRouteTitle(this.currentRoute);
    document.title = routeTitle;
  }

  /**
   * Obtiene el título de la página según la ruta
   * @param route - Ruta actual
   * @returns Título de la página
   */
  private getRouteTitle(route: string): string {
    const titleMap: Record<string, string> = {
      '/dashboard': 'Dashboard - Cats App',
      '/breeds': 'Razas de Gatos - Cats App',
      '/images': 'Imágenes de Gatos - Cats App',
      '/search': 'Búsqueda - Cats App',
      '/profile': 'Perfil - Cats App',
      '/login': 'Iniciar Sesión - Cats App',
      '/register': 'Registrarse - Cats App',
      '/404': 'Página no encontrada - Cats App'
    };

    // Buscar coincidencia exacta
    if (titleMap[route]) {
      return titleMap[route];
    }

    // Buscar coincidencia parcial para rutas dinámicas
    for (const [path, title] of Object.entries(titleMap)) {
      if (route.startsWith(path) && path !== '/') {
        return title;
      }
    }

    return 'Cats App';
  }

  /**
   * Maneja el logout del usuario
   */
  onLogout(): void {
    this.authService.logout();
  }
}
