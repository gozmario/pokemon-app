import { Pokemon, PokemonDetailsResponse } from "@/types";

export function parsePokemonFromApi(
  data: PokemonDetailsResponse,
  id: string
): Pokemon {
  return {
    ...data,
    id,
  };
}

export function isPokemonCatched(pokemons: Pokemon[], id: string): boolean {
  return pokemons.map((p) => p.id).includes(id);
}
