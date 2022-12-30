import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthenticationService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.auth.getToken();
    const personnel = this.auth.getUser();     
    
      if (token != null && personnel){
        return true;
      } 
      else if (token != null && !personnel) {              
        if (route.url[0].path != 'home') {
          this.router.navigateByUrl('private/home')
          return true;
        }
        else return true;
      }
      else {      
        this.router.navigateByUrl('auth/login')
        return false;
      }
  }
  
}
