// Definimos la forma de una estadística (HP, Attack...)
export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

// Definimos la forma de un tipo (Grass, Poison)
export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

// Definimos la forma de una habilidad
export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

// Juntamos todo en el Pokémon completo
export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
        front_shiny: string;
      };
    };
  };
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
}