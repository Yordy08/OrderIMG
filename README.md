# CopyLab COD

Aplicación fullstack para gestionar copywriting nutracéutico orientado a campañas COD (cash on delivery). Sustituye el banco estático anterior por una estructura editable de **nichos → ángulos → componentes de copy**.

## Stack

- Nuxt 3, Vue 3 y Nitro API Routes
- TailwindCSS
- MongoDB con Mongoose

## Arranque

1. Instala dependencias: `npm install`
2. Copia `.env.example` como `.env` y configura `MONGODB_URI` con la URI de MongoDB Atlas compartida por todos los entornos.
3. Ejecuta `npm run import:bank` para cargar el banco existente de `BancoCopy.html` (solo la primera vez).
4. Ejecuta `npm run dev` y abre `http://localhost:3000`.

## Rutas

- `/`: generador público con filtros por nicho y ángulo.
- `/admin`: resumen del panel.
- `/admin/angles`: CRUD de nichos y ángulos.
- `/admin/copies`: CRUD de componentes, carga masiva y restablecimiento de usados.

La importación convierte los campos heredados `afirm`, `preg`, `val`, `ben`, `promo` y `cta` a los tipos `affirmative_title`, `question_title`, `validation`, `benefit`, `promo` y `cta`. Es idempotente y no borra ediciones existentes.

## API

Los endpoints están en `server/api`: `niches`, `angles` y `copies`. Las operaciones validan IDs, campos requeridos, categorías permitidas y relaciones existentes. Los datos no se guardan en `localStorage`: cada lectura y escritura usa estas rutas API y MongoDB Atlas.

## MongoDB Atlas en local y Vercel

Configura exactamente la misma variable `MONGODB_URI` en el `.env` local y en Vercel, para los entornos Development, Preview y Production según corresponda. No uses una URI `mongodb://127.0.0.1` en ningún entorno desplegado. El servidor usa un singleton global de Mongoose para reutilizar la conexión entre invocaciones serverless; al conectar registra `[MongoDB Atlas] Conexión establecida`. Si falta la variable o Atlas rechaza la conexión, las rutas devuelven HTTP 500 con `{ error: "Error de conexión a MongoDB Atlas", detail: "..." }`.

Esta primera versión no incluye autenticación. Antes de exponer `/admin` en producción debe añadirse middleware de sesión/roles.
