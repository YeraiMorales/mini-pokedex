"use client";

import { useState } from 'react';

interface Props {
  normalUrl: string;
  shinyUrl: string;
  name: string;
}

export default function PokemonImage({ normalUrl, shinyUrl, name }: Props) {
  const [isShiny, setIsShiny] = useState(false);

  return (
    <div className="flex flex-col items-center">
      {/* Contenedor de la imagen (hacer clic en la foto también cambia el estado) */}
      <div 
        className="relative w-48 h-48 bg-gray-50 rounded-full mb-4 flex justify-center items-center shadow-inner cursor-pointer"
        onClick={() => setIsShiny(!isShiny)}
        title="Haz clic para ver su versión variocolor"
      >
        <img 
          src={isShiny ? shinyUrl : normalUrl} 
          alt={`${name} ${isShiny ? 'shiny' : ''}`}
          className="w-44 h-44 object-contain drop-shadow-lg transform hover:scale-110 transition-transform"
        />
      </div>
      
      
      <button 
        onClick={() => setIsShiny(!isShiny)}
        className="mb-4 px-4 py-1.5 text-xs font-bold rounded-full border border-yellow-400 text-yellow-700 bg-yellow-50 hover:bg-yellow-100 transition-colors shadow-sm"
      >
        ✨ {isShiny ? 'Ver versión Normal' : 'Ver versión Shiny'}
      </button>
    </div>
  );
}