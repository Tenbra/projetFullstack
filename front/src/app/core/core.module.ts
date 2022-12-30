import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { httpInterceptorProviders } from './intercepteur';
import { VaccinationCenterComponent } from '../shared/components/vaccination-center/vaccination-center.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule
    ],
  providers: [
    httpInterceptorProviders
  ],
  exports: [
  ]
})
export class CoreModule { }
