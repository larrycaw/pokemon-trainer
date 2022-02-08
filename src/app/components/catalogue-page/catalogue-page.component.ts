import {
  AfterViewInit,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { PokemonService } from "../../services/pokemon.service";
import { Pokemon } from "src/app/models/pokemon.model";
import { TrainerService } from "src/app/services/trainer.service";
import { Trainer } from "src/app/models/trainer.model"
import { Router } from "@angular/router";

@Component({
  selector: "app-catalogue-page",
  templateUrl: "./catalogue-page.component.html",
  styleUrls: ["./catalogue-page.component.css"] 
})


export class CataloguePageComponent implements OnInit {
  constructor(
    private readonly pokemonService: PokemonService,
    private readonly trainerService: TrainerService,
    private readonly router: Router
    ) {
  }

  ngOnInit(): void {
    this.pokemonService.fetchPokemonList();
  }
  //  Fetches url to avatar images for the first 10 pokemon
  fetchAvatar(): void {
    for (let i = this.pokemonService.getStart(); i < this.pokemonService.getEnd(); i++) {
      const element = this.pokemonList[i];
      this.pokemonService.fetchPokemonAvatar(element.name);
    }
    this.fetchOwned();

  }

  // All pokemon
  get pokemonList(): Pokemon[] {
    return this.pokemonService.getPokemonList();
  }

  // A slice of all pokemon array
  get pokemonSlice(): Pokemon[] {
    return this.pokemonService.getPokemonSlice()
  }

  //  True if pokemon data has been loaded
  get loaded(): boolean {
    return this.pokemonService.getLoaded();
  }

  // True if avatar url has been loaded
  get avatarLoaded(): boolean {
    return this.pokemonService.getAvatarLoaded();
  }

  get ownedLoaded(): boolean {
    console.log("ownedLoaded triggered")
    return this.pokemonService.getOwnedLoaded();
  }

  //  Used for pagination, defines start of pokemonSlice
  get start(): number {
    return this.pokemonService.getStart();
  }

  // Used for pagination, defines end of pokemonSlice
  get end(): number {
    return this.pokemonService.getEnd();
  }

  get trainer(): Trainer {
    return this.trainerService.getTrainer();
  }

    // Pagination, shows previous page
  prev(){
    this.pokemonService.prev();
    this.fetchAvatar();
  }

  // Pagination, shows next page
  next(){
    this.pokemonService.next();
    this.fetchAvatar();

  }

  // owned(){
  //   if (this.trainerService.getTrainer()[0] !== undefined) {
  //     this.pokemonService.setOwned(this.trainerService.getTrainer()[0].pokemon) 
  //   }
  // }

  // Test method, does not implement check
    fetchOwned(){
      console.log(this.trainerService.getTrainer())
      if (this.trainerService.getTrainer() !== undefined) {
            this.pokemonService.initOwned(this.trainerService.getTrainer().pokemon) 
          } else
          this.pokemonService.initOwned(["none"])
  }

  catch(name: string){
    this.trainerService.AddTrainerPokemon(name);
    console.log(this.trainerService.getTrainer().pokemon);
    this.pokemonService.initOwned(this.trainerService.getTrainer().pokemon);
    // this.pokemonService.initOwned([name]);
  }

  toTrainer(): void {
    this.router.navigateByUrl("/trainers");
  }
}
