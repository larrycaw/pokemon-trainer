import { Component, OnInit } from '@angular/core';
import { PokemonService } from "../../services/pokemon.service";
import { Pokemon } from "src/app/models/pokemon.model";

@Component({
    selector: 'app-catalogue-page',
    templateUrl: './catalogue-page.component.html'
})

export class CataloguePageComponent implements OnInit {
    constructor(
      private readonly pokemonService: PokemonService
    ) {}
  
    ngOnInit(): void {
      this.pokemonService.fetchPokemonList();
    }
  
    get pokemonList(): Pokemon[] {
      return this.pokemonService.getPokemonList();
    }
  }