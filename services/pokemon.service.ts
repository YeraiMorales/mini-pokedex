export async function getPokemonList(page: number = 1, limit: number = 20) {
  // Calculamos desde dónde empezar a pedir según la página
  const offset = (page - 1) * limit;
  
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
  
  if (!res.ok) {
    throw new Error('Error al obtener la lista de Pokémon');
  }
  
  return res.json();
}