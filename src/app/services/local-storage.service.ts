import { Injectable } from "@angular/core";


@Injectable({
  providedIn: "root",
})
export class LocalStorageService{
    constructor(){}
    setUser(username: string){
        localStorage.setItem('username', username);
    }
    getUser(){
        let currentUser = localStorage.getItem('username');
        return currentUser;
    }
    clearLocalStorage(){
        localStorage.clear();
    }
}