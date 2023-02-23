import {
  BaseAPIResource,
  Pokemon,
  PokemonBase,
  PokemonDetailsResponse,
  PokemonsByTypeResponse,
  PokemonTypeResponse,
} from "@/types";
import { getIdFromUrl, parsePokemonFromApi } from "@/utils";
import axios from "axios";

export async function getPokemonTypes(): Promise<BaseAPIResource[]> {
  const { data } = await axios.get<PokemonTypeResponse>(
    "https://pokeapi.co/api/v2/type"
  );
  return data.results;
}

export async function getPokemonsByType(id: string): Promise<PokemonBase[]> {
  const { data } = await axios.get<PokemonsByTypeResponse>(
    `https://pokeapi.co/api/v2/type/${id}`
  );

  const parsedData = data.pokemon.map(({ pokemon }) => ({
    id: getIdFromUrl(pokemon.url),
    ...pokemon,
  }));
  return parsedData;
}

export async function getPokemonById(id: string): Promise<Pokemon> {
  const { data } = await axios.get<PokemonDetailsResponse>(
    `https://pokeapi.co/api/v2/pokemon/${id}/`
  );
  const pokemon = parsePokemonFromApi(data, id);
  return pokemon;
}
