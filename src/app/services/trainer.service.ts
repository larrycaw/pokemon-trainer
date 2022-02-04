import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Trainer } from "../models/trainer.model";

@Injectable({
  providedIn: "root",
})
export class TrainerService {
  // Hardcoded url
  private url = "https://api-assignment-jt.herokuapp.com/trainers?username=ash";
  private _error = "";

  private _trainer: Trainer[] = [];

  get trainer(): Trainer[] {
    return this._trainer;
  }

  constructor(private http: HttpClient) {}

  public fetchTrainer(): void {
    this.http.get<Trainer[]>(this.url).subscribe(
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
}
