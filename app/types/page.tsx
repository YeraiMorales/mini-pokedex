import { getPokemonTypes } from '@/services/type.service';
import type { Type } from '@/app/generated/prisma/client';

export default async function TypesPage() {
  // Llamamos a nuestro servicio. La primera vez tardará un poco más (hace fetch y guarda),
  // las siguientes veces será instantáneo porque leerá de Supabase.
  const types = await getPokemonTypes();

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Tipos de Pokémon
        </h1>
        
        {/* Mostrarlos en la interfaz con estilos responsive básicos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {types.map((type: Type) => (
            <div 
              key={type.id} 
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 text-center capitalize font-semibold text-gray-700 hover:shadow-md transition-shadow"
            >
              {type.name}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}