# 🐳 Frontend Docker Setup

## Prerrequisito

Primero debes levantar el backend para crear la red compartida:

```bash
cd ../backend
docker-compose up -d
```

## Comandos Básicos

```bash
# Construir y levantar frontend
docker-compose up -d --build

# Ver logs
docker-compose logs -f

# Ver estado
docker-compose ps

# Detener servicios
docker-compose down
```

## Acceso

- **Frontend**: http://localhost

## Nota

El frontend se conecta al backend usando la red compartida `cats-app-network`.
