import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';

import { AppComponent } from '@/app/app.component';
import { routes } from '@/app/app.routes';
import { authInterceptor } from '@/core/interceptors/auth.interceptor';
import { errorInterceptor } from '@/core/interceptors/error.interceptor';
import { loadingInterceptor } from '@/core/interceptors/loading.interceptor';

/**
 * Configuración principal de la aplicación Angular
 * Bootstrap de la aplicación con providers y configuración de routing
 */
bootstrapApplication(AppComponent, {
  providers: [
    // Configuración de routing
    provideRouter(routes),
    
    // Configuración de HTTP client con interceptores
    provideHttpClient(
      withInterceptors([
        authInterceptor,
        errorInterceptor,
        loadingInterceptor
      ])
    ),
    
    // Configuración de animaciones
    provideAnimations(),
  ],
}).catch(err => console.error('Error al inicializar la aplicación:', err));
