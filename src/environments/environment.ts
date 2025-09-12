/**
 * Configuración del entorno de desarrollo
 * Define las variables de configuración para el entorno de desarrollo
 */
export const environment = {
  production: false,
  apiUrl: 'https://xpert-group-cat-backend.vercel.app/api',
  appName: 'Cats App',
  appVersion: '1.0.0',
  defaultLanguage: 'es',
  supportedLanguages: ['es', 'en'],
  features: {
    enableAnalytics: false,
    enableErrorReporting: false,
    enablePerformanceMonitoring: false,
  },
  api: {
    timeout: 30000, // 30 segundos
    retryAttempts: 3,
    retryDelay: 1000, // 1 segundo
  },
  ui: {
    itemsPerPage: 10,
    maxItemsPerPage: 100,
    defaultImageSize: 'medium',
    carouselAutoPlay: true,
    carouselAutoPlayInterval: 5000, // 5 segundos
  },
  storage: {
    tokenKey: 'auth_token',
    userKey: 'user_profile',
    themeKey: 'app_theme',
    languageKey: 'app_language',
  }
};
