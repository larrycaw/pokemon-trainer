import {
  AfterViewInit,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { PokemonService } from "../../services/pokemon.service";
import { Pokemon } from "src/app/models/pokemon.model";

@Component({
  selector: "app-catalogue-page",
  templateUrl: "./catalogue-page.component.html",
})
export class CataloguePageComponent implements OnInit {
  constructor(private readonly pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonService.fetchPokemonList();
  }
  //  Fetches url to avatar images for the first 10 pokemon
  fetchAvatar(): void {
    for (let i = 0; i < 10; i++) {
      const element = this.pokemonList[i];
      this.pokemonService.fetchPokemonAvatar(element.name);
    }
  }

  get pokemonList(): Pokemon[] {
    return this.pokemonService.getPokemonList();
  }

  //  True if pokemon data has been loaded
  get loaded(): boolean {
    return this.pokemonService.getLoaded();
  }

  // True if avatar url has been loaded
  get avatarLoaded(): boolean {
    return this.pokemonService.getAvatarLoaded();
  }
}
