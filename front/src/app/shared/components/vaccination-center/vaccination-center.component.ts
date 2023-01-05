import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VaccinationCenter } from '../../../core/model/vaccination-center';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/core/service/admin.service';
import { Personnel } from 'src/app/core/model/personnel';

@Component({
  selector: 'app-vaccination-center',
  templateUrl: './vaccination-center.component.html',
  styleUrls: ['./vaccination-center.component.css']
})
export class VaccinationCenterComponent implements OnInit {

  @Output() deleted = new EventEmitter<VaccinationCenter>();
  @Input() selectedCentre! : VaccinationCenter;
  personnel! : Personnel

  constructor(    
    private admin: AdminService
    ) { }

  ngOnInit(): void {
    this.personnel = this.admin.User
  }

  supprimer(){
    this.deleted.emit(this.selectedCentre);
  }

}
