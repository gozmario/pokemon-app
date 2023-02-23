export interface BaseAPIResource {
  name: string;
  url: string;
}

export interface PokemonTypeResponse {
  count: number;
  next: number | null;
  previous: number | null;
  results: BaseAPIResource[];
}

export interface PokemonDetailsResponse {
  name: string;
  weight: number;
  height: number;

  sprites: {
    back_default: string;
    front_default: string;
  };

  // and many other props...
}

export interface PokemonsByTypeResponse {
  name: string;
  damage_relations: {
    double_damage_from: BaseAPIResource[];
    double_damage_to: BaseAPIResource[];
    half_damage_from: BaseAPIResource[];
    half_damage_to: BaseAPIResource[];
    no_damage_from: BaseAPIResource[];
    no_damage_to: BaseAPIResource[];
  };
  game_indices: {
    game_index: number;
    generation: BaseAPIResource;
  }[];
  generation: BaseAPIResource;
  id: number;
  move_damage_class: BaseAPIResource;
  moves: BaseAPIResource[];
  names: {
    language: BaseAPIResource;
    name: string;
  }[];
  pokemon: {
    pokemon: BaseAPIResource;
    slot: number;
  }[];
}
