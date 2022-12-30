import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './app-private/components/home/home.component';
import { AuthGuard } from './core/guard/auth.guard';

const routes: Routes = [
  {
    path: "public", loadChildren: () => import('./app-public/app-public.module').then(m => m.AppPublicModule)
  },
  {path: "private", loadChildren: () => import('./app-private/app-private.module').then(m => m.AppPrivateModule),
    //canLoad: [AuthGuard]
  },
  {path: "", redirectTo: "/public", pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
