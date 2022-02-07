import { Injectable } from '@angular/core';
import { Trainer } from '../models/trainer.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() { }
  setUser(user: Trainer){
    // currently setting this in trainerservice
}
  getUser(){
    var test = localStorage.getItem("trainer")
    console.log(JSON.parse(test!))
    return JSON.parse(test!)
}
//not done
  clearLocalStorage(){
    localStorage.clear();
}
}
