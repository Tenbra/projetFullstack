import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guard/auth.guard';
import { RoleGuard } from '../core/guard/role.guard';
import { CentersEditComponent } from './components/centers-edit/centers-edit.component';
import { CentersComponent } from './components/centers/centers.component';
import { ConfigComponent } from './components/config/config.component';
import { EditPersonnelComponent } from './components/edit-personnel/edit-personnel.component';
import { HomeComponent } from './components/home/home.component';
import { MonCentreComponent } from './components/mon-centre/mon-centre.component';
import { PlanningComponent } from './components/planning/planning.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

const routes: Routes = [
  {
    path: "", 
    component: SidebarComponent,  
    children:[
      {path: "home", component: HomeComponent, canActivate: [AuthGuard]},
      {path: "centre/:id", component: MonCentreComponent, canActivate: [AuthGuard,RoleGuard],},
      {path: "centres", component: CentersComponent, canActivate: [AuthGuard,RoleGuard],},
      {path: "planning", component: PlanningComponent, canActivate: [AuthGuard,RoleGuard],},
      {path: "personnels/:id", component: EditPersonnelComponent, canActivate: [AuthGuard,RoleGuard],},
      {path: "centres/:id", component: CentersEditComponent, canActivate: [AuthGuard,RoleGuard],},
      {path: "config", component: ConfigComponent, canActivate: [AuthGuard,RoleGuard],},
      {path: "", redirectTo: "home", pathMatch: 'full'}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppPrivateRoutingModule { }
