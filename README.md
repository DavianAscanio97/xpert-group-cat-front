# Cats App Frontend

Aplicación frontend para la gestión de gatos desarrollada con Angular 17, Tailwind CSS y TypeScript.

## 🚀 Características

- **Angular 17**: Framework moderno con standalone components
- **Tailwind CSS**: Framework de CSS utilitario para diseño responsivo
- **TypeScript**: Tipado estático para mayor robustez
- **Autenticación JWT**: Sistema de autenticación seguro
- **Arquitectura Limpia**: Separación de responsabilidades y principios SOLID
- **Componentes Reutilizables**: Componentes modulares y reutilizables
- **Interceptores HTTP**: Manejo centralizado de peticiones y errores
- **Guards de Rutas**: Protección de rutas basada en autenticación
- **Responsive Design**: Diseño adaptativo para todos los dispositivos

## 📋 Requisitos

- Node.js (v18 o superior)
- npm o yarn
- Angular CLI (v17 o superior)

## 🛠️ Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp src/environments/environment.ts src/environments/environment.local.ts
   ```
   
   Editar el archivo `environment.local.ts` con tus configuraciones:
   ```typescript
   export const environment = {
     production: false,
     apiUrl: 'http://localhost:3000',
     // ... otras configuraciones
   };
   ```

4. **Ejecutar la aplicación**
   ```bash
   # Desarrollo
   npm start
   
   # Build para producción
   npm run build
   
   # Servir build de producción
   npm run start:prod
   ```

## 🏗️ Estructura del Proyecto

```
src/
├── app/
│   ├── core/                    # Servicios y funcionalidades core
│   │   ├── guards/             # Guards de autenticación
│   │   ├── interceptors/       # Interceptores HTTP
│   │   └── services/           # Servicios principales
│   ├── features/               # Módulos de funcionalidades
│   │   ├── auth/              # Autenticación (login, register)
│   │   ├── dashboard/         # Dashboard principal
│   │   ├── breeds/            # Gestión de razas
│   │   ├── images/            # Gestión de imágenes
│   │   ├── search/            # Búsqueda
│   │   └── profile/           # Perfil de usuario
│   ├── shared/                # Componentes y utilidades compartidas
│   │   ├── components/        # Componentes reutilizables
│   │   ├── models/            # Interfaces y modelos TypeScript
│   │   └── pipes/             # Pipes personalizados
│   ├── app.component.ts       # Componente principal
│   └── app.routes.ts          # Configuración de rutas
├── environments/              # Configuraciones de entorno
└── styles.scss               # Estilos globales
```

## 🎨 Diseño y Estilos

### Tailwind CSS
La aplicación utiliza Tailwind CSS para el diseño, con configuración personalizada:

- **Colores primarios**: #E90D3B (rojo corporativo)
- **Tipografía**: Inter (Google Fonts)
- **Componentes**: Clases utilitarias personalizadas
- **Responsive**: Mobile-first approach

### Componentes de UI
- **Botones**: `.btn-primary`, `.btn-secondary`, `.btn-outline`
- **Formularios**: `.form-input`, `.form-label`, `.form-error`
- **Tarjetas**: `.card`, `.card-header`, `.card-body`, `.card-footer`
- **Loading**: Spinner personalizado con animaciones

## 🔐 Autenticación

### Flujo de Autenticación
1. **Login/Register**: Formularios con validación
2. **JWT Token**: Almacenado en localStorage
3. **Interceptores**: Añaden automáticamente el token a las peticiones
4. **Guards**: Protegen rutas que requieren autenticación
5. **Logout**: Limpia el token y redirige al login

### Guards Implementados
- **AuthGuard**: Protege rutas que requieren autenticación
- **GuestGuard**: Protege rutas solo para usuarios no autenticados

## 📱 Vistas Principales

### 1. Dashboard
- Resumen de la aplicación
- Estadísticas generales
- Razas populares
- Acciones rápidas

### 2. Razas de Gatos
- Lista de todas las razas
- Filtros y búsqueda
- Detalles de cada raza
- Características y niveles

### 3. Imágenes
- Galería de imágenes
- Filtros por raza
- Carrusel de imágenes
- Pre-carga de imágenes

### 4. Búsqueda
- Búsqueda por texto
- Filtros avanzados
- Resultados paginados
- Historial de búsquedas

### 5. Perfil
- Información del usuario
- Configuraciones
- Historial de actividad

## 🔧 Servicios Principales

### AuthService
- Login y registro
- Gestión del estado de autenticación
- Manejo de tokens JWT

### CatsService
- Gestión de razas de gatos
- Búsqueda y filtrado
- Estadísticas

### ImagesService
- Gestión de imágenes
- Pre-carga de imágenes
- Filtros por raza

### LoadingService
- Estado global de carga
- Indicadores de progreso
- Gestión de operaciones

## 🧪 Testing

```bash
# Ejecutar pruebas unitarias
npm test

# Ejecutar pruebas en modo watch
npm run test:watch

# Ejecutar pruebas con cobertura
npm run test:cov

# Ejecutar pruebas e2e
npm run e2e
```

## 📦 Scripts Disponibles

- `npm start` - Iniciar servidor de desarrollo
- `npm run build` - Compilar para producción
- `npm run watch` - Compilar en modo watch
- `npm test` - Ejecutar pruebas unitarias
- `npm run lint` - Ejecutar linter
- `npm run format` - Formatear código

## 🎯 Características Técnicas

### Arquitectura
- **Standalone Components**: Componentes independientes sin módulos
- **Lazy Loading**: Carga perezosa de rutas
- **Reactive Forms**: Formularios reactivos con validación
- **Observables**: Programación reactiva con RxJS

### Performance
- **OnPush Strategy**: Estrategia de detección de cambios optimizada
- **Lazy Loading**: Carga de componentes bajo demanda
- **Pre-loading**: Pre-carga de imágenes
- **Tree Shaking**: Eliminación de código no utilizado

### Accesibilidad
- **ARIA Labels**: Etiquetas de accesibilidad
- **Keyboard Navigation**: Navegación por teclado
- **Screen Reader**: Compatibilidad con lectores de pantalla
- **Color Contrast**: Contraste de colores adecuado

## 🚀 Despliegue

### Build de Producción
```bash
npm run build
```

### Variables de Entorno
Configurar las variables de entorno para producción:
- `apiUrl`: URL de la API backend
- `production`: true para modo producción

### Servidor Web
La aplicación se puede servir con cualquier servidor web estático:
- Nginx
- Apache
- Netlify
- Vercel
- GitHub Pages

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Si tienes problemas o preguntas:
1. Revisa la documentación
2. Busca en los issues existentes
3. Crea un nuevo issue con detalles del problema
4. Contacta al equipo de desarrollo

## 🔗 Enlaces Útiles

- [Angular Documentation](https://angular.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [RxJS Documentation](https://rxjs.dev/guide/overview)
