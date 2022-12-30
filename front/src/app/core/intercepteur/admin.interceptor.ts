import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminService } from '../service/admin.service';

@Injectable()
export class AdminInterceptor implements HttpInterceptor {

  constructor(private admin: AdminService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if (this.admin.getToken()) {
      const headers = new HttpHeaders()      
      .append('Authorization', 'Basic '+this.admin.getToken())
      .append('X-Requested-With','XMLHttpRequest');
      const modifiedRequest = request.clone({headers});
      return next.handle(modifiedRequest);
    }
        return next.handle(request);
  }
}
