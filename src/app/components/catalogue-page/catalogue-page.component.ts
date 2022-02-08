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
import { LocalStorageService } from "src/app/services/local-storage.service";
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
    private readonly router: Router,
    private readonly localStorageService: LocalStorageService
    ) {
  }

  ngOnInit(): void {
    this.pokemonService.fetchPokemonList();
  }
  //  Fetches url linking to avatar images for 10 pokemon at a time
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

  // A slice of all pokemon array, used for pagination
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

    //Get trainers pokemon
    fetchOwned(){
      if (this.trainerService.getTrainer() !== undefined) {
            this.pokemonService.initOwned(this.trainerService.getTrainer().pokemon) 
          } else
          this.pokemonService.initOwned(["none"])
  }

  //clears local storage and redirects to landing page
  logout(){
    this.localStorageService.clearLocalStorage();
    this.router.navigateByUrl("/");
  }

  //collect pokemon to trainer in api
  catch(name: string){
    this.trainerService.AddTrainerPokemon(name);
    this.pokemonService.initOwned(this.trainerService.getTrainer().pokemon);
    // this.pokemonService.initOwned([name]);
  }

  toTrainer(): void {
    this.router.navigateByUrl("/trainers");
  }
}
