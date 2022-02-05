import { Component, OnInit } from "@angular/core";
import { TrainerService } from "src/app/services/trainer.service";
import { PokemonService } from "../../services/pokemon.service";
import { Pokemon } from "src/app/models/pokemon.model";
import { Trainer } from "../../models/trainer.model";


@Component({
  selector: "app-landing-page",
  templateUrl: "./landing-page.component.html",
})

// Initiates API calls for trainer and pokemon on page load.
export class LandingPageComponent implements OnInit {
  constructor(
    private readonly trainerService: TrainerService,
    private readonly pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    this.trainerService.fetchTrainer("ash");
    this.pokemonService.fetchPokemonList();
  }

  get trainer(): Trainer[] {
    return this.trainerService.getTrainer();
  }

  get pokemonList(): Pokemon[] {
    return this.pokemonService.getPokemonList();
  }
}
