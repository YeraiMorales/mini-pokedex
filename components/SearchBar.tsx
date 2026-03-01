"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // Evitamos que la página se recargue al enviar el formulario
    
    if (query.trim()) {
      router.push(`/pokemon/${query.trim().toLowerCase()}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex justify-center mb-10">
      <div className="flex w-full max-w-md shadow-sm rounded-xl overflow-hidden border border-gray-200 focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-blue-400 transition-all">
        <input
          type="text"
          placeholder="Ej: pikachu, ditto, mew..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-5 py-3 outline-none text-gray-700 bg-white"
        />
        <button
          type="submit"
          disabled={!query.trim()}
          className="px-6 py-3 bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Buscar
        </button>
      </div>
    </form>
  );
}