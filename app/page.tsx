import Link from 'next/link';
import { getPokemonList } from '@/services/pokemon.service';
import SearchBar from '@/components/SearchBar';

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  // 1. Obtenemos el número de página de la URL (ej: /?page=2). Si no hay, es la 1.
  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams?.page) || 1;
  
  // 2. Llamamos a nuestro servicio
  const data = await getPokemonList(currentPage);
  
  // 3. Calculamos si hay página siguiente o anterior
  const totalPages = Math.ceil(data.count / 20);
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Pokédex Full-Stack
        </h1>
        
        {/* Barra de búsqueda */}
        <SearchBar />

        {/* Cuadrícula responsive para el listado */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
          {data.results.map((pokemon: { name: string, url: string }) => (
            <Link 
              href={`/pokemon/${pokemon.name}?page=${currentPage}`} 
              key={pokemon.name}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 text-center capitalize font-semibold text-gray-700 hover:shadow-md hover:border-blue-400 hover:text-blue-600 transition-all"
            >
              {pokemon.name}
            </Link>
          ))}
        </div>

        {/* Controles de Paginación */}
        <div className="flex justify-center gap-4">
          {hasPrevPage ? (
            <Link 
              href={`/?page=${currentPage - 1}`}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Anterior
            </Link>
          ) : (
            <button disabled className="px-6 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed">
              Anterior
            </button>
          )}

          <span className="flex items-center font-medium text-gray-600">
            Página {currentPage}
          </span>

          {hasNextPage ? (
            <Link 
              href={`/?page=${currentPage + 1}`}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Siguiente
            </Link>
          ) : (
            <button disabled className="px-6 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed">
              Siguiente
            </button>
          )}
        </div>
      </div>
    </main>
  );
}