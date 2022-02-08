import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Trainer } from "../models/trainer.model";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
  providedIn: "root",
})
export class TrainerService {
  private _url = "https://api-assignment-jt.herokuapp.com/trainers?=";
  private _error = "";
  // private _trainer: Trainer[] = [];
  private _trainer: Trainer | any;

  get trainer(): Trainer {
    return this._trainer;
  }

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {}

  public fetchTrainer(username: string): void {
    if (this.localStorageService.getUser().username == username) {
      this._trainer = this.localStorageService.getUser();
    } else {
      this.http.get<Trainer[]>(this._url + username).subscribe(
        (trainer: Trainer[]) => {
          this._trainer = trainer[0];
          this.localStorageService.setUser(trainer[0]);
        },
        (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      );
    }

  }
  public getTrainer(): Trainer {
    return this._trainer;
  }

  public setTrainer(trainer: Trainer): void {
    this._trainer = trainer;
  }
  

  public error(): string {
    return this._error;
  }
  private createHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': 'apiKey',
    });
  }
  //check if its possible to not get deleted to local storage
  //post user to api if not already exist
  public postTrainer(username :string) {
      this.http.get<any>(`https://api-assignment-jt.herokuapp.com/trainers?username=${username}`).subscribe(data => {
      if(data[0] == undefined){
        //add to api only if the user not exists in api
        const headers = this.createHeaders();
        const body = { username: username, pokemon: [] };
        this.http.post<any>('https://api-assignment-jt.herokuapp.com/trainers', 
        body, { headers }).subscribe(data => {
          this.localStorageService.setUser(data)
          this.setTrainer(this.localStorageService.getUser());
        });
      } 
      else{
        this.localStorageService.setUser(data[0])
        this.setTrainer(this.localStorageService.getUser());
      }
    });
  }
    //guess you could get the user from localstorage here instead of when calling it?
  public AddTrainerPokemon(addedPokemon :string) {
    let trainer = this.localStorageService.getUser()
    trainer.pokemon.push(addedPokemon);
    this.localStorageService.setUser(trainer);
    this.setTrainer(trainer);
    
    let username = this.localStorageService.getUser().username;

    let pokemon = this.localStorageService.getUser().pokemon;
    const headers = this.createHeaders();
    const body = { pokemon };
    this.http.patch<any>(`https://api-assignment-jt.herokuapp.com/trainers/${trainer.id}`, 
    body, { headers }).subscribe(data => {
      this.localStorageService.setUser(data)
      });

    // this.http.get<any>(`https://api-assignment-jt.herokuapp.com/trainers?username=${username}`).
    //   subscribe(trainer => {
    //     let pokemon = trainer[0].pokemon;
    //     pokemon.push(addedPokemon) //push the pokemons name

    // });

  }
  //guess you could get the user from localstorage here instead of when calling it?
  //delete from api and update local storage
  public DeleteTrainerPokemon(deletedPokemon: string){

    let user = this.localStorageService.getUser();

    for (let i = 0; i < user.pokemon.length; i++) {
      const element = user.pokemon[i];
      if (element == deletedPokemon) {
        user.pokemon.splice(i,1);
      }
    }

    this.localStorageService.setUser(user);
    this._trainer = user;
    let pokemon = this.localStorageService.getUser().pokemon;

    const headers = this.createHeaders();
    const body = { pokemon };  
    this.http.patch<any>(`https://api-assignment-jt.herokuapp.com/trainers/${this.localStorageService.getUser().id}`, 
    body, { headers }).subscribe(data => {
        this.localStorageService.setUser(data)
      });

  }
}
