# 🛒 Online Store API

Una RESTful API para una tienda en línea construida con **Node.js**, **Express**, **TypeScript**, **Prisma ORM** y **PostgreSQL**. Esta API permite manejar autenticación, productos, órdenes y usuarios.

---

## 📦 Tecnologías utilizadas

- Node.js
- Express
- TypeScript
- Prisma + PostgreSQL
- JWT para autenticación
- Jest para testing
- Docker para contenerización

---

## 🚀 Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/steven-dev1/online-store-api
cd online-store-api
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env` en la raíz y define las variables necesarias:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/store"
JWT_SECRET="supersecreto"
JWT_EXPIRES_IN=1h
PORT=3000
```

4. Ejecuta las migraciones y genera el cliente de Prisma:

```bash
npm run prisma:dev
```

5. (Opcional) Genera el cliente Prisma manualmente:

```bash
npm run prisma:generate
```

---

## 💻 Ejecución local

### Modo desarrollo:

```bash
npm run dev
```

### Modo producción:

```bash
npm run build
npm run start
```

---

## 🧪 Pruebas

Este proyecto usa **Jest** para pruebas unitarias.

```bash
npm run test
```

---

## 🐳 Docker

### Construir la imagen:

```bash
docker build -t online-store-api .
```

### Correr el contenedor:

```bash
docker run -p 3000:3000 --env-file .env online-store-api
```

---

## 📚 Endpoints principales

### 🧑 Auth
| Método | Ruta           | Descripción              |
|--------|----------------|--------------------------|
| POST   | `/auth/register` | Registro de usuario     |
| POST   | `/auth/login`    | Login y retorno de token JWT |

### 🛒 Products
| Método | Ruta             | Descripción              |
|--------|------------------|--------------------------|
| GET    | `/products`       | Obtener todos los productos |
| GET    | `/products/:id`   | Obtener un producto específico |

### 📦 Orders (requiere autenticación)
| Método | Ruta         | Descripción                 |
|--------|--------------|-----------------------------|
| POST   | `/orders`    | Crear orden para el usuario |
| GET    | `/orders`    | Ver órdenes del usuario     |

### 👤 User (requiere autenticación)
| Método | Ruta         | Descripción                 |
|--------|--------------|-----------------------------|
| GET    | `/me`        | Obtener información del usuario autenticado |

---

## 🔐 Autenticación

Las rutas protegidas requieren el uso de un token JWT en el header:

```http
Authorization: Bearer <token>
```

---

## 🧪 Estructura de Pruebas

Las pruebas se encuentran en la carpeta:

```
src/tests/services/
```

Se mockea Prisma con:

```ts
jest.mock('../../utils/prisma', () => ({ prisma: {/* mocks */} }));
```

---

## 📁 Estructura del proyecto

```
src/
├── controllers/       # Lógica HTTP
├── middlewares/       # Autenticación
├── routes/            # Rutas Express
├── services/          # Lógica de negocio
├── tests/             # Pruebas unitarias
├── utils/             # Utils como JWT, Prisma
└── types/             # Tipado extendido (JWT en req.user)
```

---
---