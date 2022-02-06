import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import {
  Pokemon,
  PokemonResponse,
  PokemonDetailsResponse,
  Sprite,
} from "../models/pokemon.model";

@Injectable({
  providedIn: "root",
})
export class PokemonService {
  // Url to pokeapi. Limit 1200 parameter ensures all pokemon are fetched (currently 1118)
  private _url = "https://pokeapi.co/api/v2/pokemon?limit=1200";
  private _error = "";
  private _loaded = false;
  private _AvatarLoaded = false;

  private _pokemonList: Pokemon[] = [];

  get PokemonList(): Pokemon[] {
    return this._pokemonList;
  }

  constructor(private http: HttpClient) {}

  //   Fetches all Pokemon, but response contains NO DETAIL DATA. Only name of Pokemon and URL to detail request.
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
          this._loaded = true;
        },
      });
  }
  // Fetches url for image of pokemon and sets it in the pokemonList
  public fetchPokemonAvatar(name: string): void {
    let poke = this._pokemonList.find((element) => element.name == name);
    if (poke !== undefined) {
      this.http
        .get<PokemonDetailsResponse>(poke.url)
        .pipe(
          map((response: PokemonDetailsResponse) => {
            return response.sprites;
          })
        )
        .subscribe({
          next: (sprite: Sprite) => {
            if (poke !== undefined) {
              poke.imgUrl = sprite.front_default;
              this._AvatarLoaded = true;
            }
          },
        });
    }
  }

  public getPokemonList(): Pokemon[] {
    return this._pokemonList;
  }

  public getLoaded(): boolean {
    return this._loaded;
  }

  public getAvatarLoaded(): boolean {
    return this._AvatarLoaded;
  }

  public error(): string {
    return this._error;
  }
}
