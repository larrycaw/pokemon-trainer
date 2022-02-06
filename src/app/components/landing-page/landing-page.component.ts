import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";


@Component({
  selector: "app-landing-page",
  templateUrl: "./landing-page.component.html",
})

// Initiates API calls for trainer and pokemon on page load.
export class LandingPageComponent implements OnInit {
  constructor(
  ) {}

  ngOnInit(): void {

  }
  onLoginSubmit(form: NgForm): void{
    console.log(form.value.username)
  }
}
