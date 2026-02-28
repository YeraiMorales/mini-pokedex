import { prisma } from '@/lib/prisma';

export async function getPokemonTypes() {
  // 1. Comprobamos si la tabla tiene datos
  const count = await prisma.type.count();

  if (count === 0) {
    console.log("Tabla vacía. Obteniendo datos de la PokeAPI...");
    
    // 2. Obtenemos los datos desde la PokeAPI
    const res = await fetch('https://pokeapi.co/api/v2/type');
    const data = await res.json();

    // 3. Guardamos en la base de datos usando upsert
    for (const type of data.results) {
      await prisma.type.upsert({
        where: { name: type.name },
        update: {}, // No actualizamos nada si ya existe
        create: { name: type.name }, // Lo creamos si no existe
      });
    }
  } else {
    console.log("Datos encontrados en caché (Supabase). No llamamos a PokeAPI.");
  }

  // 4. Devolvemos los datos desde la base de datos (Mostrarlos en la interfaz)
  return prisma.type.findMany();
}