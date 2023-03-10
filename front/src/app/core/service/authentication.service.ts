import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
    private service: AdminService,
    private router: Router
    ) { }

  getToken(): string|null {
    return localStorage.getItem('token')
  }

  login(login : string, password : string){
    localStorage.setItem("token", window.btoa(login+':'+password));
  }

  getUser(){
    return this.service.User;
  }

  sendCredentials(login: string, password: string) : Observable<Personnel>{
    return this.httpClient.post<Personnel>("http://localhost:8080/api/auth/login", {
      email : login,
      password : password
    })
  }

  disconnect() : Observable<Personnel>{
    return this.httpClient.get<Personnel>("http://localhost:8080/api/auth/logout")
  }

  logout(){
    localStorage.removeItem("token")
    this.disconnect().subscribe(data =>{
      this.router.navigateByUrl("/auth/login")
    })
  }
}
