import { Component } from '@angular/core';
import { Personnel } from 'src/app/core/model/personnel';
import { AdminService } from 'src/app/core/service/admin.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent {

  superAdmins! : Personnel[];

  constructor(private service: AdminService
    ) { }
  
  ngOnInit(): void {
    this.getPersonnels()
  }

  getPersonnels(){
    this.service.getAllPersonnel().subscribe(resp =>{
      this.service.all_personnel = resp.body
      this.service.all_personnel_etag = resp.headers.get("etag")
      this.getSuperAdmin(resp.body)
    }, error => {
      this.getSuperAdmin(this.service.all_personnel)
    });
  }

  getSuperAdmin(personnels : Personnel[]){
    this.superAdmins = personnels.filter(function (personnel) {
      return personnel.roles.some(r => r.role=="SUPER_ADMIN");
    });
  }

  onDeleted(personnel : Personnel){
    this.service.deletePersonnel(personnel.id).subscribe(msg =>{
      this.getPersonnels();
    });
  }

}
