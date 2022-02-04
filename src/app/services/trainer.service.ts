import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Trainer } from "../models/trainer.model";

@Injectable({
  providedIn: "root",
})
export class TrainerService {

  private _url = "https://api-assignment-jt.herokuapp.com/trainers?=";
  private _error = "";

  private _trainer: Trainer[] = [];

  get trainer(): Trainer[] {
    return this._trainer;
  }

  constructor(private http: HttpClient) {}

  public fetchTrainer(username: string): void {
    this.http.get<Trainer[]>(this._url+username).subscribe(
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

  public error(): string{
    return this._error;
    
  }
}
