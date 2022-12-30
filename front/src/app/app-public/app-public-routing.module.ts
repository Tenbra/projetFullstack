import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationComponent } from './components/reservation/reservation.component';
import { EndReservationComponent } from './components/end-reservation/end-reservation.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: "centers/:id", component: ReservationComponent},
  {path: "reservation", component: EndReservationComponent},
  {path: "", component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppPublicRoutingModule { }
