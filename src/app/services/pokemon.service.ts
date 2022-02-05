import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { Pokemon, PokemonResponse } from "../models/pokemon.model";

@Injectable({
  providedIn: "root",
})
export class PokemonService {
  // Url to pokeapi. Limit 1200 parameter ensures all pokemon are fetched (currently 1118)
  private _url = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1200";
  private _error = "";

  private _pokemonList: Pokemon[] = [];

  get PokemonList(): Pokemon[] {
    return this._pokemonList;
  }

  constructor(private http: HttpClient) {}

  //   Fetches all Pokemon, but respones contains NO DETAIL DATA. Only name of Pokemon and URL to detail request.
  public fetchPokemonList(): void {
    this.http
      .get<PokemonResponse>(this._url)
      .pipe(
        map((response: PokemonResponse) => {
          return response.results;
        })
      )
      .subscribe({
        next: (pokemon: Pokemon[]) => {
          this._pokemonList = pokemon;
        },
      });
  }
  public getPokemonList(): Pokemon[] {
    return this._pokemonList;
  }

  public error(): string {
    return this._error;
  }
}
