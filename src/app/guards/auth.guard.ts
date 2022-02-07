import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { asapScheduler, Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(
    private localStorage: LocalStorageService,
    private router: Router 
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Conditional statement to see if user is set in localStorage.
    // Redirects user to LandingPage/Login page if the condition is met
    if(this.localStorage.getUser() === null) {
      return this.router.navigateByUrl('/');
    } else {
      return true;
    }
  }
}


