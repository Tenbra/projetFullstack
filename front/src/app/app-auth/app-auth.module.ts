import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { AppAuthRoutingModule } from './app-auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AppAuthRoutingModule,
    ReactiveFormsModule
  ]
})
export class AppAuthModule { }
