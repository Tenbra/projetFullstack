import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationComponent } from './components/reservation/reservation.component';
import { EndReservationComponent } from './components/end-reservation/end-reservation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './components/home/home.component';



@NgModule({
  declarations: [
    ReservationComponent,
    EndReservationComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
  ]
})
export class AppPublicModule { }
