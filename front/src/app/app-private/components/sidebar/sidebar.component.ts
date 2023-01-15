import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/core/service/admin.service';
import { AuthenticationService } from 'src/app/core/service/authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    private service: AdminService,
    private auth: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.service.getUser().subscribe( resp =>{
      this.service.User_etag = resp.headers.get("etag");      
      this.service.User = resp.body;
    }, error => {
      
    });
  }

  logout(){
    this.auth.logout();
  }

}
