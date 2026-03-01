import { prisma } from '@/lib/prisma';
import { PokemonDetail } from '@/interfaces/pokemon';


export async function getPokemonList(page: number = 1, limit: number = 20) {
  // Calculamos desde dónde empezar a pedir según la página
  const offset = (page - 1) * limit;
  
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
  
  if (!res.ok) {
    throw new Error('Error al obtener la lista de Pokémon');
  }
  
  return res.json();
}


export async function getPokemonDetail(name: string): Promise<PokemonDetail> {
  const cachedPokemon = await prisma.pokemonCache.findUnique({
    where: { name },
  });

  const isCacheValid = 
    cachedPokemon && 
    (new Date().getTime() - cachedPokemon.updatedAt.getTime() < 24 * 60 * 60 * 1000);

  if (isCacheValid) {
    console.log(`[CACHÉ SUPABASE] Devolviendo datos de: ${name}`);
    return cachedPokemon.payload as unknown as PokemonDetail; 
  }

  console.log(`[POKEAPI] Descargando datos de: ${name}...`);
  
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  
  if (!res.ok) {
    throw new Error(`No se pudo encontrar el Pokémon: ${name}`);
  }
  
  const data = await res.json();

  await prisma.pokemonCache.upsert({
    where: { name },
    update: { payload: data }, 
    create: { name, payload: data }, 
  });

  return data as PokemonDetail;
}