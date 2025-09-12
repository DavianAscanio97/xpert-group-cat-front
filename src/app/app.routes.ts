import { Routes } from '@angular/router';

import { AuthGuard } from '@/core/guards/auth.guard';
import { GuestGuard } from '@/core/guards/guest.guard';

/**
 * Configuración de rutas de la aplicación
 * Define todas las rutas y sus respectivos guards
 */
export const routes: Routes = [
  // Ruta por defecto - redirige al dashboard
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  
  // Rutas de autenticación (solo para usuarios no autenticados)
  {
    path: 'login',
    loadComponent: () => import('@/features/auth/login/login.component').then(m => m.LoginComponent),
    canActivate: [GuestGuard],
    title: 'Iniciar Sesión - Cats App'
  },
  {
    path: 'register',
    loadComponent: () => import('@/features/auth/register/register.component').then(m => m.RegisterComponent),
    canActivate: [GuestGuard],
    title: 'Registrarse - Cats App'
  },
  
  // Rutas principales (requieren autenticación)
  {
    path: 'dashboard',
    loadComponent: () => import('@/features/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [AuthGuard],
    title: 'Dashboard - Cats App'
  },
  {
    path: 'breeds',
    loadComponent: () => import('@/features/breeds/breeds.component').then(m => m.BreedsComponent),
    canActivate: [AuthGuard],
    title: 'Razas de Gatos - Cats App'
  },
  {
    path: 'breeds/:id',
    loadComponent: () => import('@/features/breeds/breed-detail/breed-detail.component').then(m => m.BreedDetailComponent),
    canActivate: [AuthGuard],
    title: 'Detalle de Raza - Cats App'
  },
  {
    path: 'images',
    loadComponent: () => import('@/features/images/images.component').then(m => m.ImagesComponent),
    canActivate: [AuthGuard],
    title: 'Imágenes de Gatos - Cats App'
  },
  {
    path: 'search',
    loadComponent: () => import('@/features/search/search.component').then(m => m.SearchComponent),
    canActivate: [AuthGuard],
    title: 'Búsqueda - Cats App'
  },
  {
    path: 'profile',
    loadComponent: () => import('@/features/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [AuthGuard],
    title: 'Perfil - Cats App'
  },
  {
    path: 'about',
    loadComponent: () => import('@/features/about/about.component').then(m => m.AboutComponent),
    title: 'Acerca de - Cats App'
  },
  
  // Ruta de error 404
  {
    path: '404',
    loadComponent: () => import('@/shared/components/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: 'Página no encontrada - Cats App'
  },
  
  // Ruta comodín - redirige a 404
  {
    path: '**',
    redirectTo: '/404'
  }
];
