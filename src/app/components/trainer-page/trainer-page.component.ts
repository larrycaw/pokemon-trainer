import { Component,  OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { TrainerService } from "src/app/services/trainer.service";
import { Trainer } from "../../models/trainer.model";
import { PokemonService } from "../../services/pokemon.service";
import { Pokemon } from "src/app/models/pokemon.model";
import { Router } from "@angular/router";

// TODO fetch pokemons related to user in localStorage

@Component({
    selector: 'app-trainer-page',
    templateUrl: './trainer-page.component.html',
    styleUrls: ['./trainer-page.component.css']
})

export class TrainerPageComponent implements OnInit {
  
  constructor(
    private readonly trainerService: TrainerService,
    private readonly localStorage: LocalStorageService,
    private readonly pokemonService: PokemonService,
    private readonly router : Router,
  ) {}

  get trainer(): Trainer {
    return this.trainerService.getTrainer();
  }
  
  get pokemonList(): Pokemon[] {
    return this.pokemonService.getPokemonList();
  }

  // True if avatar url has been loaded
  get avatarLoaded(): boolean {
    return this.pokemonService.getAvatarLoaded();
  }
  
  ngOnInit(): void {
    //get trainers collection of pokemon
    for (let i = 0; i < this.pokemonList.length; i++) {
      const element = this.pokemonList[i];
      if (element.owned) {
        this.pokemonService.fetchPokemonAvatar(element.name)
      }
    }
  }

  //  Fetches url to avatar images for the first 10 pokemon
  fetchAvatar(): void {
    for (let i = this.pokemonService.getStart(); i < this.pokemonService.getEnd(); i++) {
      const element = this.pokemonList[i];
      this.pokemonService.fetchPokemonAvatar(element.name);
    }
  }
  //delete pokemon from trainers collection
  deletePokemon(name: string): void {
    this.trainerService.DeleteTrainerPokemon(name);
    this.pokemonService.removePokemon(name);
  }
  
  //navigates to catalouge page
  toCatalogue(): void {
    this.router.navigateByUrl("/catalogue");
  }
//clears local storgare and navigates to laning page
  logout(){
    this.localStorage.clearLocalStorage();
    this.router.navigateByUrl("/");
  }
}