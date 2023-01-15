import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from '../service/admin.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private admin : AdminService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (route.url[0].path == "config" ||
        route.url[0].path == "centres" ||
        route.url[0].path.startsWith("centres")
        ) {
          if (this.admin.hasRole("SUPER_ADMIN")) return true;
          else{
            this.router.navigateByUrl('private/home')
            return false
          }
        }
    else if (route.url[0].path.startsWith("centre") ){                    
            if (this.admin.hasRole("ADMIN") && route.url[1].path =='0') return true;
            if (this.admin.hasRole("SUPER_ADMIN") && route.url[1].path !='0') return true;
            else{
              this.router.navigateByUrl('private/home')
              return false
            }
        }
    else if (route.url[0].path.startsWith("personnels")){
      return true
    }
    else{      
      if (this.admin.hasRole("MEDECIN") ||
          this.admin.hasRole("ADMIN")) return true;
      else{
        this.router.navigateByUrl('private/home')
        return false
      }
    }
    
  }
  
}
