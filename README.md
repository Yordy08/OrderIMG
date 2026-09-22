# CopyLab COD

Aplicación fullstack para gestionar copywriting nutracéutico orientado a campañas COD (cash on delivery). Sustituye el banco estático anterior por una estructura editable de **nichos → ángulos → componentes de copy**.

## Stack

- Nuxt 3, Vue 3 y Nitro API Routes
- TailwindCSS
- MongoDB con Mongoose

## Arranque

1. Instala dependencias: `npm install`
2. Copia `.env.example` como `.env` y configura `MONGODB_URI`.
3. Inicia MongoDB y ejecuta `npm run import:bank` para cargar el banco existente de `BancoCopy.html` (solo la primera vez).
4. Ejecuta `npm run dev` y abre `http://localhost:3000`.

## Rutas

- `/`: generador público con filtros por nicho y ángulo.
- `/admin`: resumen del panel.
- `/admin/angles`: CRUD de nichos y ángulos.
- `/admin/copies`: CRUD de componentes, carga masiva y restablecimiento de usados.

La importación convierte los campos heredados `afirm`, `preg`, `val`, `ben`, `promo` y `cta` a los tipos `affirmative_title`, `question_title`, `validation`, `benefit`, `promo` y `cta`. Es idempotente y no borra ediciones existentes.

## API

Los endpoints están en `server/api`: `niches`, `angles` y `copies`. Las operaciones validan IDs, campos requeridos, categorías permitidas y relaciones existentes. Los errores de conexión responden con HTTP 503.

Esta primera versión no incluye autenticación. Antes de exponer `/admin` en producción debe añadirse middleware de sesión/roles.
