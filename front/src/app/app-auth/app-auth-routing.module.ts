import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '../core/guard/login.guard';

const routes: Routes = [
  { path: 'auth/login', component: LoginComponent, canActivate: [LoginGuard]}
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AppAuthRoutingModule { }
