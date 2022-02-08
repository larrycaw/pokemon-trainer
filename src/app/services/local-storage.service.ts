import { Injectable } from '@angular/core';
import { Trainer } from '../models/trainer.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() { }

  setUser(user: Trainer){
    localStorage.setItem("trainer", JSON.stringify(user));
}

  getUser(): Trainer{
    const user = localStorage.getItem("trainer")
    //console.log(JSON.parse(test!))
    return JSON.parse(user!)
}

  clearLocalStorage(){
    localStorage.clear();
}
}
