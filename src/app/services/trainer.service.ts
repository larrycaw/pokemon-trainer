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
  private _user = {}; //TEST
  private _trainer: Trainer[] = [];

  get trainer(): Trainer[] {
    return this._trainer;
  }

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {}

  public fetchTrainer(username: string): void {
    this.http.get<Trainer[]>(this._url + username).subscribe(
      (trainer: Trainer[]) => {
        this._trainer = trainer;
      },
      (error: HttpErrorResponse) => {
        this._error = error.message;
      }
    );
  }
  public getTrainer(): Trainer[] {
    return this.trainer;
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

  //post user to api if not already exist
  public postTrainer(username :string) {
      this.http.get<any>(`https://api-assignment-jt.herokuapp.com/trainers?username=${username}`).subscribe(data => {
      if(data[0] == undefined){
        //add to api
        const headers = this.createHeaders();
        const body = { username: username, pokemon: [] };
        this.http.post<any>('https://api-assignment-jt.herokuapp.com/trainers', 
        body, { headers }).subscribe(data => {
        });
      }  
    });
  }

}
