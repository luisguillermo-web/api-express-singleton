# API REST & GraphQL con Express y Patrón Singleton

Este proyecto es una API construida con Node.js, Express y TypeScript. Ofrece endpoints tanto para REST como para GraphQL. La arquitectura del servidor sigue el patrón de diseño Singleton.

## Tecnologías Utilizadas
- **Node.js**
- **Express**
- **TypeScript**
- **Prisma** como ORM
- **SQLite** como base de datos
- **GraphQL** con Apollo Server
- **Swagger** para la documentación de la API REST

---

## Cómo Empezar

Sigue estos pasos para levantar el proyecto en una máquina local.

### 1. Pre-requisitos
- Tener instalado Node.js (v22.x LTS recomendado)
- Tener Git instalado

### 2. Instalación
```bash
# 1. Clona este repositorio
git clone [https://github.com/luisguillermo-web/api-express-singleton.git](https://github.com/luisguillermo-web/api-express-singleton.git)

# 2. Navega a la carpeta del proyecto
cd api-express-singleton

# 3. Instala las dependencias
npm install

# 4. Crea y aplica las migraciones de la base de datos
npx prisma migrate dev