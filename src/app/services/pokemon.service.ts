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

  // Start and end index for pokemonSlice
  private _start = 0;
  private _end = 10;

  // Defines step used for pagination
  private _step = 10;

  // Complete list of all pokemon
  private _pokemonList: Pokemon[] = [];
  // Slices of the complete pokemon list, used for pagination
  private _pokemonSlice: Pokemon[] = [];

  constructor(private http: HttpClient) {}

  //   Fetches all Pokemon, but response contains NO DETAIL DATA. Only name of Pokemon and URL to detail request.
  public fetchPokemonList(): void {
    if (this._pokemonList.length < 1) {
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
            this._pokemonSlice = this._pokemonList.slice(this._start, this._end);
          },
        });
    }
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

  public setOwned(nameArray: string[]): void {
    for (let i = 0; i < nameArray.length; i++) {
      const element = nameArray[i];
      let pokeTemp = this._pokemonList.find(poke => poke.name == element)
      if (pokeTemp) {
        pokeTemp.owned = true;
      }
      
    }
  }

  public getPokemonList(): Pokemon[] {
    return this._pokemonList;
  }

  public getPokemonSlice(): Pokemon[] {
    return this._pokemonSlice;
  }

  public setPokemonSlice(): void {
    this._pokemonSlice = this._pokemonList.slice(this._start, this._end);
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

  public getStart(): number {
    return this._start;
  }

  public getEnd(): number {
    return this._end;
  }

  public setStart(num: number): void {
    this._start = num;
  }

  public setEnd(num: number): void {
    this._end = num;
  }

  // Represents user pressing 'prev' button. 
  public prev(){
    this.setStart((this._start - this._step));
    this.setEnd ((this._end - this._step));
    this.setPokemonSlice();
  }

  // Represents user pressing 'next' button
  public next(){
    this.setEnd ((this._end + this._step));
    this.setStart((this._start + this._step));
    this.setPokemonSlice();
  }

  public getStep():number {
    return this._step;
  }

  public setStep(num: number):void {
    this._step = num;
  }
}


