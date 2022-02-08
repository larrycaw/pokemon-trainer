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
    this.owned();

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

  //  Used for pagination, defines start of pokemonSlice
  get start(): number {
    return this.pokemonService.getStart();
  }

  // Used for pagination, defines end of pokemonSlice
  get end(): number {
    return this.pokemonService.getEnd();
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
    owned(){
    // this.pokemonService.setOwned(["bulbasaur","squirtle"])
  }

  catch(name: string){
    this.pokemonService.setOwned([name])
  }

  toTrainer(): void {
    this.router.navigateByUrl("/trainers");
  }
}
