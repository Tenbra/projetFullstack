import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/core/service/admin.service';
import { AuthenticationService } from 'src/app/core/service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm! : FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private service: AuthenticationService,
    private router: Router,
    private admin: AdminService
  ) { }

  ngOnInit(): void {

    this.loginForm = this.formbuilder.group({
      login : [null, [Validators.required, Validators.email]],
      password : [null, [Validators.required]]
    })
  }

  login(){
    const login = this.loginForm.value.login
    const password = this.loginForm.value.password

    this.service.sendCredentials(login, password).subscribe(personnel =>{
      if (personnel!==null){
        this.service.login(login, password);
        this.admin.User = personnel;          
        this.router.navigateByUrl('private/home');
        
      }
      else{
        this.router.navigateByUrl('auth/login');
      }
      
    })

    
  }

}
