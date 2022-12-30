import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Personnel } from '../model/personnel';
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private token! : string 

  constructor(
    private httpClient: HttpClient,
    private service: AdminService) { }

  getToken(): string|null {
    return localStorage.getItem('token')
  }

  login(login : string, password : string){
    localStorage.setItem("token", window.btoa(login+':'+password));
  }

  getUser(){
    return this.service.Personnel;
  }

  sendCredentials(login: string, password: string) : Observable<Personnel>{
    return this.httpClient.post<Personnel>("api/auth/login", {
      email : login,
      password : password
    })
  }
}
