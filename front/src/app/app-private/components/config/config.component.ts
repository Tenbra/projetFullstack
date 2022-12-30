import { Component } from '@angular/core';
import { Personnel } from 'src/app/core/model/personnel';
import { AdminService } from 'src/app/core/service/admin.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent {

  super! : Personnel[];

  constructor(private service: AdminService
    ) { }
  
  ngOnInit(): void {
    this.getPersonnels()
  }

  getPersonnels(){
    this.service.getAllPersonnel().subscribe(personnels =>{
      this.getSuper(personnels)
    });
  }

  getSuper(personnels : Personnel[]){
    this.super = personnels.filter(function (personnel) {
      return personnel.roles.length === 3;
    });
  }

  onDeleted(personnel : Personnel){
    this.service.deletePersonnel(personnel.id).subscribe(msg =>{
      this.getPersonnels();
    });
  }

}
