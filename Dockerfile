# Dockerfile para el frontend de Cats App
# Etapa 1: Build
FROM node:20-alpine AS builder

# Instalar dependencias del sistema
RUN apk add --no-cache wget

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm ci

# Copia el código fuente
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Etapa 2: Servidor web
FROM nginx:alpine

# Instalar wget para health checks
RUN apk add --no-cache wget

# El usuario nginx ya existe en la imagen nginx:alpine
# Solo necesitamos asegurar que tenga los permisos correctos

# Copia la configuración personalizada de nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copia los archivos construidos desde la etapa anterior
COPY --from=builder /app/dist/cats-app /usr/share/nginx/html

# Cambia la propiedad de los archivos
RUN chown -R nginx:nginx /usr/share/nginx/html
RUN chown -R nginx:nginx /var/cache/nginx
RUN chown -R nginx:nginx /var/log/nginx
RUN chown -R nginx:nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid
RUN chown -R nginx:nginx /var/run/nginx.pid

# El usuario nginx ya es el usuario por defecto en nginx:alpine

# Expone el puerto 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/health || exit 1

# Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"]
