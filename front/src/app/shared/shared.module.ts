import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VaccinationCenterComponent } from './components/vaccination-center/vaccination-center.component';
import { InputRechercheComponent } from './components/input-recherche/input-recherche.component';
import { VaccinationCenterListComponent } from './components/vaccination-center-list/vaccination-center-list.component';
import { FormsModule } from '@angular/forms';
import { AppPublicRoutingModule } from '../app-public/app-public-routing.module';



@NgModule({
  declarations: [
    InputRechercheComponent,
    VaccinationCenterListComponent,
    VaccinationCenterComponent]
    ,
  imports: [
    CommonModule,
    FormsModule,
    AppPublicRoutingModule
  ],
  exports: [
    InputRechercheComponent,
    VaccinationCenterComponent,
    FormsModule,
    AppPublicRoutingModule
  ]
})
export class SharedModule { }
