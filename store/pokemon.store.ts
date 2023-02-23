import { Pokemon } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PokemonStore {
  pokemons: Pokemon[];
  catchPokemon: (pokemon: Pokemon) => void;
  releasePokemon: (id: string) => void;
}

export const usePokemonStore = create(
  persist<PokemonStore>(
    (set) => ({
      pokemons: [],
      catchPokemon: (pokemon: Pokemon) => {
        set((state) => ({
          pokemons: [...state.pokemons, pokemon],
        }));
      },
      releasePokemon: (id: string) => {
        set((state) => ({
          pokemons: state.pokemons.filter((p) => p.id !== id),
        }));
      },
    }),
    { name: "pokemonStore" }
  )
);
