import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Personnel } from 'src/app/core/model/personnel';

import { VaccinationCenter } from 'src/app/core/model/vaccination-center';
import { AdminService } from 'src/app/core/service/admin.service';
import { VaccinationService } from 'src/app/core/service/vaccination.service';

@Component({
  selector: 'app-mon-centre',
  templateUrl: './mon-centre.component.html',
  styleUrls: ['./mon-centre.component.css']
})
export class MonCentreComponent implements OnInit {

  centre!: VaccinationCenter;
  id! : number;
  user! : Personnel;
  medecins! : Personnel[];
  admins! : Personnel[];
  

  constructor(
    private service: AdminService,
    private route: ActivatedRoute,
    private servicePublic: VaccinationService

  ) { }

  ngOnInit(): void {
    this.user = this.service.Personnel;
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id==0) this.centre = this.service.Center;
    else{
      this.servicePublic.getVaccinationCenterById(this.id).subscribe(centre =>{
        this.centre = centre;
      })
    }
    this.getPersonnels()
  }

  getPersonnels(){
    if (this.id !=0) this.service.getMedecinsByCentreId(this.id).subscribe(personnels =>{
      this.getMedecin(personnels)
      this.getAdmin(personnels)
    });
    else this.service.getMedecinsByCentreId(this.service.Center.id).subscribe(personnels =>{
      this.getMedecin(personnels)
    });
    
    
  }

  getMedecin(personnels : Personnel[]){
    this.medecins = personnels.filter(function (personnel) {
      return personnel.roles.length === 1;
    });
  }

  getAdmin(personnels : Personnel[]){
    this.admins = personnels.filter(function (personnel) {
      return personnel.roles.length === 2;
    });
  }

  onDeleted(personnel : Personnel){
    this.service.deletePersonnel(personnel.id).subscribe(msg =>{
      this.getPersonnels();
    });
  }


}
