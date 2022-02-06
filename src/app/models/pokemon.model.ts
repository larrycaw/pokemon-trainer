export interface Pokemon {
  name: string;
  url: string;
  imgUrl: string;
}

export interface PokemonResponse {
  count: number;
  next: any;
  previous: any;
  results: Pokemon[];
}

export interface PokemonDetailsResponse {
  sprites: any;
}

export interface Sprite {
  front_default: string;
}
