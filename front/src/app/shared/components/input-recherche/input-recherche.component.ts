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
  centers! : Observable<VaccinationCenter[]>;
  personnel! : Personnel;

  constructor( 
    private service: VaccinationService,
    private admin: AdminService
    ) { }

  ngOnInit(): void {
    this.getVaccinationCenter();
    this.personnel = this.admin.Personnel;

  }

  getVaccinationCenter(){
    this.centers = this.service.getAllVaccinationCenter();
  }

  getVaccinationCenterByVille(villeSearched : string){
    this.centers = this.service.getVaccinationCenterByVille(villeSearched);
  }

  onDeleted(center : VaccinationCenter){
    this.admin.deleteCentre(center.id).subscribe(data =>{
      this.getVaccinationCenter();
    })
    
  }

}
