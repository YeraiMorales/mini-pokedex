import { getPokemonDetail } from '@/services/pokemon.service';
import Link from 'next/link';
import Image from 'next/image';

export default async function PokemonDetailPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const resolvedParams = await params;
  const { name } = resolvedParams;
  
  // Obtenemos los datos a través de nuestro service con caché
  const pokemon: any = await getPokemonDetail(name);

  return (
    <main className="min-h-screen p-8 bg-gray-50 flex justify-center items-center">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        
        {/* Botón de volver */}
        <Link 
          href="/" 
          className="text-blue-600 hover:text-blue-800 mb-6 inline-block font-medium transition-colors"
        >
          &larr; Volver a la Pokédex
        </Link>

        {/* Imagen y Nombre */}
        <div className="flex flex-col items-center">
          {/* Usamos el sprite oficial de la PokeAPI */}
          <div className="relative w-48 h-48 bg-gray-100 rounded-full mb-4 flex justify-center items-center">
             <img 
              src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default} 
              alt={pokemon.name}
              className="w-40 h-40 object-contain drop-shadow-md"
            />
          </div>
          <h1 className="text-4xl font-bold capitalize text-gray-800 mb-2">
            {pokemon.name}
          </h1>
          <p className="text-gray-500 font-medium mb-6">
            N.º {pokemon.id}
          </p>
        </div>

        {/* Tipos */}
        <div className="flex justify-center gap-3 mb-8">
          {pokemon.types.map((t: any) => (
            <span 
              key={t.type.name} 
              className="px-4 py-1.5 bg-gray-800 text-white rounded-full text-sm font-semibold capitalize tracking-wide"
            >
              {t.type.name}
            </span>
          ))}
        </div>

        {/* Estadísticas Básicas */}
        <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl">
          <div className="text-center">
            <p className="text-gray-500 text-sm font-medium">Altura</p>
            <p className="text-xl font-bold text-gray-800">{pokemon.height / 10} m</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-sm font-medium">Peso</p>
            <p className="text-xl font-bold text-gray-800">{pokemon.weight / 10} kg</p>
          </div>
        </div>

      </div>
    </main>
  );
}