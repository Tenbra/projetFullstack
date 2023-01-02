import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/service/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: AuthenticationService,
    ) { }

  ngOnInit(): void {
  }
 
  logout(){
    this.service.logout();
  }
}
