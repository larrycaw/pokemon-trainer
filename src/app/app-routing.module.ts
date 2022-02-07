import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CataloguePageComponent } from './components/catalogue-page/catalogue-page.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { TrainerPageComponent } from './components/trainer-page/trainer-page.component';
import { AuthGuard } from './guards/auth.guard';

// Routes for Landing Page(Login page), Trainer Page and Pokémon Catalogue Page
const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  component: LandingPageComponent
}, {
  path: 'trainers',
  component: TrainerPageComponent,
  //canActivate: [ AuthGuard ] // AuthGuard for Trainer Page (protects it from non-trainers)
}, {
  path: 'catalogue',
  component: CataloguePageComponent,
  //canActivate: [ AuthGuard ] // AuthGuard for Pokémon Catalogue Page (protects it from non-trainers)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }