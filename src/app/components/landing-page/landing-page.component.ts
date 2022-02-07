import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { LocalStorageService } from "src/app/services/local-storage.service";
import { TrainerService } from "src/app/services/trainer.service";


@Component({
  selector: "app-landing-page",
  templateUrl: "./landing-page.component.html",
})

// Initiates API calls for trainer and pokemon on page load.
export class LandingPageComponent implements OnInit {
  constructor(
    private localStorageService: LocalStorageService,
    private router : Router,
    private trainerService: TrainerService
  ) {}

  ngOnInit(): void {
    //if user redirect to katalog
    //console.log(this.localStorageService.getUser())
  }
  onLoginSubmit(form: NgForm): void{
    const {username} = form.value;
    //save to api
    //console.log(this.trainerService.fetchTrainer(username))
    this.trainerService.postTrainer(username);
    this.localStorageService.setUser(username);
    this.router.navigateByUrl("/catalogue") //to katalog
    
  }
}
