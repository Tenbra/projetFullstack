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
    this.user = this.service.User;
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id==0) this.centre = this.service.User.centre;
    else{
      this.servicePublic.getVaccinationCenterById(this.id).subscribe(resp =>{
        this.servicePublic.center_by_id = resp.body;
        this.servicePublic.center_by_id_etag = resp.headers.get("etag")
        this.centre = resp.body;
      }, error => {
        this.centre = this.servicePublic.center_by_id;
      });
    }
    this.getPersonnels()
  }

  getPersonnels(){
    if (this.id !=0) this.service.getPersonnelByCentreId(this.id).subscribe(resp =>{
      this.service.personnel_by_centre_id = resp.body
      this.service.personnel_by_centre_id_etag = resp.headers.get("etag")
      this.getMedecin(resp.body)
      this.getAdmin(resp.body)
    }, error => {
      this.getMedecin(this.service.personnel_by_centre_id)
      this.getAdmin(this.service.personnel_by_centre_id)
    });    
    else this.service.getPersonnelByCentreId(this.service.User.centre.id).subscribe(resp =>{
      this.service.personnel_by_centre_id = resp.body
      this.service.personnel_by_centre_id_etag = resp.headers.get("etag")
      this.getMedecin(resp.body)
    }, error => {
      this.getMedecin(this.service.personnel_by_centre_id)
    });
  }

  getMedecin(personnels : Personnel[]){
    this.medecins = personnels.filter(function (personnel) {
      return personnel.roles.some(r => r.role=="MEDECIN");
    });
  }

  getAdmin(personnels : Personnel[]){
    this.admins = personnels.filter(function (personnel) {
      return personnel.roles.some(r => r.role=="ADMIN");
    });
  }

  onDeleted(personnel : Personnel){
    this.service.deletePersonnel(personnel.id).subscribe(msg =>{
      this.getPersonnels();
    }, error => {
      if (error.status==403){
        //Coder la modale qui demande d'actualiser
        alert("Vous n'avez pas les droits necessaires pour effectuer cette opération")
      }
      else alert("Operation impossible à realiser")
      this.getPersonnels();
    });
  }


}
