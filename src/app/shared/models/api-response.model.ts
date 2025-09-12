/**
 * Modelo base para respuestas de la API
 * Define la estructura común de todas las respuestas
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp: string;
}

/**
 * Modelo para respuestas de error de la API
 * Define la estructura de respuestas de error
 */
export interface ApiError {
  status: number;
  message: string;
  error: string;
  timestamp: string;
  path: string;
}

/**
 * Modelo para respuestas de validación
 * Define la estructura de errores de validación
 */
export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

/**
 * Modelo para respuestas con errores de validación
 * Define la estructura cuando hay errores de validación
 */
export interface ValidationErrorResponse extends ApiError {
  validationErrors: ValidationError[];
}

/**
 * Modelo para el estado de carga
 * Define el estado de las operaciones asíncronas
 */
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

/**
 * Modelo para el estado de la aplicación
 * Define el estado global de la aplicación
 */
export interface AppState {
  user: {
    isAuthenticated: boolean;
    profile: any | null;
    token: string | null;
  };
  loading: {
    global: boolean;
    operations: Record<string, boolean>;
  };
  error: {
    global: string | null;
    operations: Record<string, string | null>;
  };
}
