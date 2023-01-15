import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VaccinationCenterComponent } from './components/vaccination-center/vaccination-center.component';
import { InputRechercheComponent } from './components/input-recherche/input-recherche.component';
import { VaccinationCenterListComponent } from './components/vaccination-center-list/vaccination-center-list.component';
import { FormsModule } from '@angular/forms';
import { AppPublicRoutingModule } from '../app-public/app-public-routing.module';
import { MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MatCommonModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import { DialogComponent } from './components/dialog/dialog.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
  ],
  declarations: [InputRechercheComponent,
    VaccinationCenterListComponent,
    VaccinationCenterComponent,
    DialogComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    MatMenuModule,
    MatCardModule,
    MatGridListModule,
    FormsModule,
    AppPublicRoutingModule,
    MatProgressBarModule,
    MatButtonModule,
    MatCommonModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDialogModule
  ],
  exports: [
    InputRechercheComponent,
    MatSelectModule,
    VaccinationCenterListComponent,
    MatTableModule,
    VaccinationCenterComponent,
    FormsModule,
    MatMenuModule,
    CommonModule,
    MatButtonModule,
    MatCommonModule,
    MatInputModule,
    MatListModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule
  ]
})
export class SharedModule { }
