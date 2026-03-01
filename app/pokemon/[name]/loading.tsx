export default function LoadingPokemon() {
  return (
    <main className="min-h-screen p-8 bg-gray-50 flex justify-center items-center">
      <div className="flex flex-col items-center gap-4">
        {/* Un círculo girando animado con Tailwind */}
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
        <p className="text-gray-500 font-medium animate-pulse">
          Buscando en la Pokédex...
        </p>
      </div>
    </main>
  );
}