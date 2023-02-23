import { BaseAPIResource, PokemonDetailsResponse } from "./pokemon-api.types";

export interface Pokemon extends PokemonDetailsResponse {
  id: string;
}

export interface PokemonBase extends BaseAPIResource {
  id: string;
}

export interface MappedPokemon extends PokemonBase {
  isCatched: boolean;
}
