import { Component, OnInit } from '@angular/core';
import { TrainerService } from 'src/app/services/trainer.service';
import { Trainer } from '../../models/trainer.model'

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html'
})

export class LandingPageComponent implements OnInit{
    constructor(private readonly trainerService: TrainerService) {

    }

    ngOnInit(): void {
        this.trainerService.fetchTrainer
    }

    get trainer(): Trainer[] {
        return this.trainerService.getTrainer()
    }
    
}