import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  private _username: string ="";

  set username(username: string){
    this._username = username;
}
  get username(): string{
    return this._username;
}
//change
  clearLocalStorage(){
    localStorage.clear();
}
}
