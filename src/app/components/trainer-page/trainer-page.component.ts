import { Component,  OnInit } from '@angular/core';
import { TrainerService } from "src/app/services/trainer.service";
import { Trainer } from "../../models/trainer.model";

@Component({
    selector: 'app-trainer-page',
    templateUrl: './trainer-page.component.html'
})

export class TrainerPageComponent implements OnInit {
    constructor(
      private readonly trainerService: TrainerService,
    ) {}

    ngOnInit(): void {
        this.trainerService.fetchTrainer("ash");
      }
    
      get trainer(): Trainer[] {
        return this.trainerService.getTrainer();
      }
    }