import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppPrivateRoutingModule } from './app-private-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MonCentreComponent } from './components/mon-centre/mon-centre.component';
import { PlanningComponent } from './components/planning/planning.component';
import { EditPersonnelComponent } from './components/edit-personnel/edit-personnel.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ReservationListComponent } from './components/reservation-list/reservation-list.component';
import { CentersComponent } from './components/centers/centers.component';
import { CentersEditComponent } from './components/centers-edit/centers-edit.component';
import { PersonnelListComponent } from './components/personnel-list/personnel-list.component';
import { ConfigComponent } from './components/config/config.component';



@NgModule({
  declarations: [
    HomeComponent, 
    SidebarComponent,
    MonCentreComponent,
    PlanningComponent,
    EditPersonnelComponent,
    ReservationListComponent,
    CentersComponent,
    CentersEditComponent,
    PersonnelListComponent,
    ConfigComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppPrivateRoutingModule,
    SharedModule
  ],
  exports: []
})
export class AppPrivateModule { }
