import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/core/service/admin.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    private service: AdminService
  ) { }

  ngOnInit(): void {
    this.service.getPersonnel().subscribe( personnel =>{
      this.service.Center = personnel.centre;
      this.service.Personnel = personnel;
    })
  }

}
