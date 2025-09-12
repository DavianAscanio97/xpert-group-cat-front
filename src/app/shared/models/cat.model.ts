/**
 * Modelo de raza de gato
 * Define la estructura de datos de una raza de gato
 */
export interface CatBreed {
  id: string;
  name: string;
  description?: string;
  temperament?: string;
  origin?: string;
  life_span?: string;
  adaptability?: number;
  affection_level?: number;
  child_friendly?: number;
  dog_friendly?: number;
  energy_level?: number;
  grooming?: number;
  health_issues?: number;
  intelligence?: number;
  shedding_level?: number;
  social_needs?: number;
  stranger_friendly?: number;
  vocalisation?: number;
  experimental?: number;
  hairless?: number;
  natural?: number;
  rare?: number;
  rex?: number;
  suppressed_tail?: number;
  short_legs?: number;
  hypoallergenic?: number;
  weight?: {
    imperial: string;
    metric: string;
  };
  wikipedia_url?: string;
  cfa_url?: string;
  vcahospitals_url?: string;
  vetstreet_url?: string;
}

/**
 * Modelo de imagen de gato
 * Define la estructura de datos de una imagen de gato
 */
export interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds?: CatBreed[];
  categories?: Array<{
    id: number;
    name: string;
  }>;
}

/**
 * Modelo para consultas de razas
 * Define los parámetros de búsqueda y filtrado
 */
export interface BreedQuery {
  q?: string;
  page?: number;
  limit?: number;
}

/**
 * Modelo para consultas de imágenes
 * Define los parámetros de búsqueda y filtrado de imágenes
 */
export interface ImageQuery {
  breed_id?: string;
  page?: number;
  limit?: number;
  size?: 'thumb' | 'small' | 'medium' | 'full';
  mime_types?: 'jpg' | 'png' | 'gif';
}

/**
 * Modelo para la respuesta paginada
 * Define la estructura de respuestas con paginación
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
