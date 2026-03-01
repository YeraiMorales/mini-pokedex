
# Mini Pokédex Full-Stack

Aplicación web Full-Stack. Consume la PokeAPI y utiliza una base de datos PostgreSQL (Supabase) mediante Prisma para implementar un sistema de caché bajo demanda.

## Tecnologías Utilizadas

- **Framework:** Next.js (App Router)
- **Estilos:** Tailwind CSS
- **Base de Datos:** PostgreSQL (alojada en Supabase)
- **ORM:** Prisma
- **Lenguaje:** TypeScript

## Funcionalidades Principales

- **Listado y Paginación:** Visualización de los primeros 20 Pokémon con controles de paginación.
- **Búsqueda Directa:** Barra de búsqueda para navegar directamente al detalle de un Pokémon.
- **Detalle Completo:** Muestra de imagen (incluyendo interactividad para versión *Shiny*), nombre, estadísticas, habilidades y tipos.
- **Caché Bajo Demanda:**
  - **Tabla `types`:** Obtiene los datos de la PokeAPI si está vacía y los persiste (upsert) para futuras consultas.
  - **Tabla `pokemon_cache`:** Guarda el payload JSON completo del detalle del Pokémon. Si la caché tiene menos de 24 horas, la sirve directamente desde la base de datos, evitando llamadas innecesarias a la PokeAPI.
- **UX/UI:** Estados de carga (Loading) y error (Error Boundaries) manejados nativamente con Next.js. Diseño responsive básico.

## Instalación y Despliegue Local

Sigue estos pasos para ejecutar el proyecto en tu máquina local:

1. **Clonar el repositorio:**
```bash
git clone https://github.com/YeraiMorales/mini-pokedex.git
cd mini-pokedex
```
2. **Instalar dependencias:**
```bash
npm install
```


3. **Configurar Variables de Entorno:**
* Copia el archivo `.env.example` y renómbralo a `.env.local`.


* Sustituye el valor de `DATABASE_URL` por tu cadena de conexión real de PostgreSQL/Supabase.


4. **Sincronizar la Base de Datos (Prisma):**
```bash
npx prisma db push
```


5. **Iniciar el servidor de desarrollo:**
```bash
npm run dev
```


6. Abre [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) en tu navegador para ver la aplicación.