import { prisma } from '@/lib/prisma';


export async function getPokemonList(page: number = 1, limit: number = 20) {
  // Calculamos desde dónde empezar a pedir según la página
  const offset = (page - 1) * limit;
  
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
  
  if (!res.ok) {
    throw new Error('Error al obtener la lista de Pokémon');
  }
  
  return res.json();
}


// Obtener detalle con caché de 24 horas
export async function getPokemonDetail(name: string) {
  // 1. Buscamos al Pokémon en nuestra base de datos
  const cachedPokemon = await prisma.pokemonCache.findUnique({
    where: { name },
  });

  // 2. Comprobamos si existe y si la caché es reciente (menos de 24 horas)
  const isCacheValid = 
    cachedPokemon && 
    (new Date().getTime() - cachedPokemon.updatedAt.getTime() < 24 * 60 * 60 * 1000);

  if (isCacheValid) {
    console.log(`[SUPABASE] Devolviendo datos de: ${name}`);
    // Prisma devuelve el payload como JSON, lo retornamos tal cual
    return cachedPokemon.payload; 
  }

  console.log(`[POKEAPI] Descargando datos de: ${name}...`);
  
  // 3. Si no hay caché o es vieja, llamamos a la PokeAPI
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  
  if (!res.ok) {
    throw new Error(`No se pudo encontrar el Pokémon: ${name}`);
  }
  
  const data = await res.json();

  // 4. Lo guardamos en nuestra base de datos para la próxima vez (Upsert)
  await prisma.pokemonCache.upsert({
    where: { name },
    update: { payload: data }, // Si ya existía pero era viejo, actualiza el JSON y la fecha
    create: { name, payload: data }, // Si no existía, lo crea
  });

  return data;
}