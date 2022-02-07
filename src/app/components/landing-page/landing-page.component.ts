import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { LocalStorageService } from "src/app/services/local-storage.service";


@Component({
  selector: "app-landing-page",
  templateUrl: "./landing-page.component.html",
})

// Initiates API calls for trainer and pokemon on page load.
export class LandingPageComponent implements OnInit {
  constructor(
    private localStorageService: LocalStorageService,
    private router : Router
  ) {}

  ngOnInit(): void {

  }
  onLoginSubmit(form: NgForm): void{
    const {username} = form.value;
    this.localStorageService.setUser(username)
    //this.router.navigateByUrl("")
    //console.log(this.localStorageService.getUser())
  }
}
