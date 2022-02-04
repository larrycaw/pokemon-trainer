import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CataloguePageComponent } from './components/catalogue-page/catalogue-page.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { TrainerPageComponent } from './components/trainer-page/trainer-page.component';

const routes: Routes = [{
  path: '',
  component: LandingPageComponent
}, {
  path: 'trainers',
  component: TrainerPageComponent
}, {
  path: 'catalogue',
  component: CataloguePageComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }