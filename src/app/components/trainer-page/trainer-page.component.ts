import { Component,  OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { TrainerService } from "src/app/services/trainer.service";
import { Trainer } from "../../models/trainer.model";
import { PokemonService } from "../../services/pokemon.service";
import { Pokemon } from "src/app/models/pokemon.model";

// TODO fetch pokemons related to user in localStorage

@Component({
    selector: 'app-trainer-page',
    templateUrl: './trainer-page.component.html'
})

export class TrainerPageComponent implements OnInit {
  get trainer(): Trainer[] {
    return this.trainerService.getTrainer();
  }

  get pokemonList(): Pokemon[] {
    return this.pokemonService.getPokemonList();
  }

  constructor(
    private readonly trainerService: TrainerService,
    private readonly localStorage: LocalStorageService,
    private readonly pokemonService: PokemonService
  ) {}
      
  ngOnInit(): void {

    const Trainer = [{
      id: 0,
      username: 'isak',
      pokemon: ['bulbasaur', 'mordi'],
    }]
    
    let currentTrainer: string | any = this.localStorage.getUser();
    let userInAPI : Object[] | any = this.trainerService.fetchTrainer(currentTrainer);
    this.pokemonService.fetchPokemonList();
    console.log(userInAPI);
  }
}