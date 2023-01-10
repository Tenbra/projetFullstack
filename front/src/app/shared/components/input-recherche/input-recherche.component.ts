import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Personnel } from 'src/app/core/model/personnel';
import { AdminService } from 'src/app/core/service/admin.service';
import { VaccinationCenter } from '../../../core/model/vaccination-center';
import { VaccinationService } from '../../../core/service/vaccination.service';

@Component({
  selector: 'app-input-recherche',
  templateUrl: './input-recherche.component.html',
  styleUrls: ['./input-recherche.component.css']
})
export class InputRechercheComponent implements OnInit {

  ville="";
  centers! : VaccinationCenter[];
  personnel! : Personnel;

  constructor( 
    private service: VaccinationService,
    public admin: AdminService
    ) { }

  ngOnInit(): void {
    this.getVaccinationCenter();
    this.personnel = this.admin.User;

  }

  getVaccinationCenter(){
    this.service.getAllVaccinationCenter().subscribe(resp =>{
    this.service.all_center = resp.body;
    this.centers = resp.body;
    this.service.all_center_etag = resp.headers.get("etag");
    }, error => {
      this.centers = this.service.all_center;
    });
  }

  getVaccinationCenterByVille(villeSearched : string){
    if(villeSearched==""){
      this.getVaccinationCenter()
    }
    else{
      this.service.getVaccinationCenterByVille(villeSearched).subscribe(resp =>{
        this.service.center_by_ville = resp.body;
        this.centers = resp.body;
        this.service.center_by_ville_etag = resp.headers.get("etag");
        }, error => {
          this.centers = this.service.center_by_ville;
        });
    }
    
  }

  onDeleted(center : VaccinationCenter){
    this.admin.deleteCentre(center.id).subscribe(data =>{
      this.getVaccinationCenter();
    }, error => {
      alert("Operation impossible, verifiez que vous n'etes pas dans ce centre")
    })
    
  }

}
