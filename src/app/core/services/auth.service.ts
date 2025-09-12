import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, of } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '@/environments/environment';
import { User, AuthResponse, LoginRequest, RegisterRequest, UserProfile } from '@/shared/models/user.model';

/**
 * Servicio de autenticación
 * Maneja el login, registro y gestión del estado de autenticación
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = `${environment.apiUrl}/auth`;
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'user_profile';

  // Estado de autenticación
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private userProfileSubject = new BehaviorSubject<UserProfile | null>(null);

  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  public userProfile$ = this.userProfileSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.initializeAuth();
  }

  /**
   * Inicializa el estado de autenticación desde el localStorage
   */
  private initializeAuth(): void {
    const token = this.getToken();
    const userProfile = this.getUserProfile();
    
    if (token && userProfile) {
      this.isAuthenticatedSubject.next(true);
      this.userProfileSubject.next(userProfile);
    }
  }

  /**
   * Realiza el login del usuario
   * @param credentials - Credenciales de login
   * @returns Observable con la respuesta de autenticación
   */
  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials)
      .pipe(
        tap(response => {
          this.setAuthData(response);
        }),
        catchError(error => {
          console.error('Error en login:', error);
          throw error;
        })
      );
  }

  /**
   * Registra un nuevo usuario
   * @param userData - Datos del usuario a registrar
   * @returns Observable con la respuesta de autenticación
   */
  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/register`, userData)
      .pipe(
        tap(response => {
          this.setAuthData(response);
        }),
        catchError(error => {
          console.error('Error en registro:', error);
          throw error;
        })
      );
  }

  /**
   * Obtiene el perfil del usuario autenticado
   * @returns Observable con el perfil del usuario
   */
  getProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.API_URL}/profile`)
      .pipe(
        tap(profile => {
          this.userProfileSubject.next(profile);
        }),
        catchError(error => {
          console.error('Error al obtener perfil:', error);
          this.logout();
          throw error;
        })
      );
  }

  /**
   * Cierra la sesión del usuario
   */
  logout(): void {
    this.clearAuthData();
    this.router.navigate(['/login']);
  }

  /**
   * Verifica si el usuario está autenticado
   * @returns true si está autenticado, false en caso contrario
   */
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  /**
   * Obtiene el token de autenticación
   * @returns Token JWT o null si no existe
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Obtiene el perfil del usuario desde el localStorage
   * @returns Perfil del usuario o null si no existe
   */
  getUserProfile(): UserProfile | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    if (userStr) {
      const user = JSON.parse(userStr);
      return {
        userId: user._id,
        name: user.name,
        email: user.email
      };
    }
    return null;
  }

  /**
   * Establece los datos de autenticación
   * @param authResponse - Respuesta de autenticación
   */
  private setAuthData(authResponse: AuthResponse): void {
    localStorage.setItem(this.TOKEN_KEY, authResponse.access_token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(authResponse.user));
    
    this.isAuthenticatedSubject.next(true);
    this.userProfileSubject.next({
      userId: authResponse.user._id,
      name: authResponse.user.name,
      email: authResponse.user.email
    });
  }

  /**
   * Limpia los datos de autenticación
   */
  private clearAuthData(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    
    this.isAuthenticatedSubject.next(false);
    this.userProfileSubject.next(null);
  }

  /**
   * Verifica si el token está expirado
   * @returns true si está expirado, false en caso contrario
   */
  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch (error) {
      return true;
    }
  }

  /**
   * Refresca el token si es necesario
   * @returns Observable con el nuevo token o null si no es necesario
   */
  refreshTokenIfNeeded(): Observable<string | null> {
    if (this.isTokenExpired()) {
      this.logout();
      return of(null);
    }
    return of(this.getToken());
  }
}
