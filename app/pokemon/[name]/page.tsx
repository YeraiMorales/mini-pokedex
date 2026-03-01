import { getPokemonDetail } from '@/services/pokemon.service';
import { PokemonDetail } from '@/interfaces/pokemon';
import Link from 'next/link';

export default async function PokemonDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ name: string }>;
  searchParams: Promise<{ page?: string }>; 
}) {
  const resolvedParams = await params;
  const { name } = resolvedParams;
  
  
  const resolvedSearchParams = await searchParams;
  const returnPage = resolvedSearchParams?.page || '1'; // Si no hay, asumimos la 1
  
  const pokemon: PokemonDetail = await getPokemonDetail(name);

  return (
    <main className="min-h-screen p-8 bg-gray-50 flex justify-center items-center py-12">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
        
        <Link 
          href={`/?page=${returnPage}`}
          className="text-blue-600 hover:text-blue-800 mb-6 inline-block font-semibold transition-colors"
        >
          &larr; Volver a la Pokédex
        </Link>

        {/* Imagen y Nombre */}
        <div className="flex flex-col items-center">
          <div className="relative w-48 h-48 bg-gray-50 rounded-full mb-4 flex justify-center items-center shadow-inner">
             <img 
              src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default} 
              alt={pokemon.name}
              className="w-44 h-44 object-contain drop-shadow-lg transform hover:scale-110 transition-transform"
            />
          </div>
          <h1 className="text-4xl font-extrabold capitalize text-gray-800 mb-1 tracking-tight">
            {pokemon.name}
          </h1>
          <p className="text-gray-400 font-bold mb-6 tracking-widest text-sm">
            N.º {pokemon.id.toString().padStart(3, '0')}
          </p>
        </div>

        {/* Tipos */}
        <div className="flex justify-center gap-3 mb-8">
          {pokemon.types.map((t) => (
            <span 
              key={t.type.name} 
              className="px-5 py-1.5 bg-gray-800 text-white rounded-full text-sm font-bold capitalize tracking-wide shadow-sm"
            >
              {t.type.name}
            </span>
          ))}
        </div>

        {/* Habilidades */}
        <div className="mb-8">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest text-center mb-3">
            Habilidades
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {pokemon.abilities.map((a) => (
              <span 
                key={a.ability.name}
                className={`px-3 py-1.5 text-sm font-semibold rounded-lg border ${
                  a.is_hidden 
                    ? 'bg-purple-50 text-purple-700 border-purple-200' 
                    : 'bg-gray-50 text-gray-700 border-gray-200'
                } capitalize flex items-center gap-1 shadow-sm`}
              >
                {a.ability.name.replace('-', ' ')}
                {a.is_hidden && (
                  <span className="text-[10px] uppercase tracking-wider opacity-70 ml-1">
                    (Oculta)
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Altura y Peso */}
        <div className="grid grid-cols-2 gap-4 bg-blue-50/50 p-4 rounded-2xl mb-8">
          <div className="text-center">
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Altura</p>
            <p className="text-xl font-black text-gray-800">{pokemon.height / 10} m</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Peso</p>
            <p className="text-xl font-black text-gray-800">{pokemon.weight / 10} kg</p>
          </div>
        </div>

        {/*Estadísticas Base */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Estadísticas Base</h3>
          <div className="space-y-3">
            {pokemon.stats.map((stat) => {
              // Calculamos un porcentaje para la barra (basado en un maximo aprox de 150)
              const percentage = Math.min((stat.base_stat / 150) * 100, 100);
              
              return (
                <div key={stat.stat.name} className="flex items-center text-sm">
                  {/* Nombre de la estadística */}
                  <span className="w-1/3 font-semibold text-gray-500 capitalize">
                    {stat.stat.name.replace('-', ' ')}
                  </span>
                  
                  {/* Valor numérico */}
                  <span className="w-8 font-black text-gray-700 text-right mr-3">
                    {stat.base_stat}
                  </span>
                  
                  {/* Barra de progreso visual */}
                  <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${stat.base_stat >= 80 ? 'bg-green-500' : stat.base_stat >= 50 ? 'bg-blue-500' : 'bg-red-400'}`} 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </main>
  );
}