import { Injectable } from '@angular/core';
import { Trainer } from '../models/trainer.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() { }

  //sets user to local storage
  setUser(user: Trainer){
    localStorage.setItem("trainer", JSON.stringify(user));
}
//get user from local storage
  getUser(): Trainer{
    const user = localStorage.getItem("trainer")
    //console.log(JSON.parse(test!))
    return JSON.parse(user!)
}
//remove all from local storage
  clearLocalStorage(){
    localStorage.clear();
}
}
