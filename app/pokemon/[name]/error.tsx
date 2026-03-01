"use client";

import Link from 'next/link';
import { useEffect } from 'react';

export default function PokemonError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error capturado por Next.js:", error);
  }, [error]);

  return (
    <main className="min-h-screen p-8 bg-gray-50 flex flex-col justify-center items-center">
      <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl border border-red-100 text-center">
        <div className="text-6xl mb-6">🕵️‍♂️</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          ¡Pokémon no encontrado!
        </h2>
        <p className="text-gray-500 mb-8">
          Parece que el nombre no es válido o no existe. Intenta buscar otro.
        </p>
        
        <div className="flex flex-col gap-3">
          <Link 
            href="/"
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors"
          >
            Volver a la Pokédex
          </Link>
        </div>
      </div>
    </main>
  );
}