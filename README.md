# CafeAndino

Aplicacion web para gestionar un catalogo de cafes. Incluye autenticacion de usuarios, dashboard, CRUD de productos, graficos y exportacion del catalogo en PDF.

## Tecnologias

- **Frontend:** React, Vite, React Router, Chart.js, jsPDF y Bootstrap Icons.
- **Backend:** Node.js, Express y Mongoose.
- **Base de datos:** MongoDB Atlas.
- **Seguridad:** JWT para sesiones y bcryptjs para contraseñas.

## Estructura

```text
CafeAndino/
├── Backend/
│   ├── index.js
│   ├── models/
│   └── routes/
└── Frontend/
    └── src/
        ├── components/
        └── pages/
```

## Configuracion

Crea `Backend/.env` con:

```env
MONGO_URI=mongodb://127.0.0.1:27017/cafeandino
JWT_SECRET=una-clave-secreta-y-larga
PORT=3000
FRONTEND_URL=http://localhost:5173
```

Crea `Frontend/.env` con:

```env
VITE_API_URL=http://localhost:3000/api
```

Usa en `MONGO_URI` la cadena de conexion de MongoDB Atlas cuando corresponda.

## Instalacion y ejecucion

Instala las dependencias en cada proyecto:

```bash
cd Backend
npm install
npm run dev
```

En otra terminal:

```bash
cd Frontend
npm install
npm run dev
```

La interfaz se ejecuta normalmente en `http://localhost:5173` y la API en `http://localhost:3000`.

## Funcionalidades

- Registro e inicio de sesion con JWT.
- Rutas protegidas en el frontend y backend.
- Gestion de cafes con nombre, precio, stock e ID.
- Productos asociados al usuario autenticado en MongoDB Atlas.
- Dashboard con metricas y graficos de inventario.
- Exportacion del catalogo a PDF.
- Interfaz responsive para escritorio, tablet y movil.

## API principal

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/products`
- `POST /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`

## Validacion

```bash
cd Frontend
npm run lint
npm run build
```
