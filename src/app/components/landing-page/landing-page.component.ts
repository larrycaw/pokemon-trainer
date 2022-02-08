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
    //if user redirect to catalouge
    if(this.localStorageService.getUser()!=null){
      this.router.navigateByUrl("/catalogue");
    }
  }
  onLoginSubmit(form: NgForm): void{
    const {username} = form.value;
    //save to api
    //in trainer service local storage sets
    this.trainerService.postTrainer(username);
    this.router.navigateByUrl("/catalogue") 
  }
}
