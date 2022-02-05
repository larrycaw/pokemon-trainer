export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonResponse {
  count: number;
  next: any;
  previous: any;
  results: Pokemon[];
}
