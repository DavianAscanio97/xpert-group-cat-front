/**
 * Modelo de usuario para la aplicación
 * Define la estructura de datos de un usuario
 */
export interface User {
  _id: string;
  name: string;
  email: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Modelo para la respuesta de autenticación
 * Contiene el token JWT y la información del usuario
 */
export interface AuthResponse {
  access_token: string;
  user: User;
}

/**
 * Modelo para el login de usuario
 * Define los datos requeridos para autenticación
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Modelo para el registro de usuario
 * Define los datos requeridos para crear un nuevo usuario
 */
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

/**
 * Modelo para el perfil de usuario
 * Información del usuario autenticado
 */
export interface UserProfile {
  userId: string;
  name: string;
  email: string;
}
