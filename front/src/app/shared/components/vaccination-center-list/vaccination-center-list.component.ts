import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Personnel } from 'src/app/core/model/personnel';
import { AdminService } from 'src/app/core/service/admin.service';
import { VaccinationCenter } from '../../../core/model/vaccination-center';

@Component({
  selector: 'app-vaccination-center-list',
  templateUrl: './vaccination-center-list.component.html',
  styleUrls: ['./vaccination-center-list.component.css']
})
export class VaccinationCenterListComponent implements OnInit {

  @Output() deleted = new EventEmitter<VaccinationCenter>();
  @Input() centers! : VaccinationCenter[];
  personnel! : Personnel

  constructor(private admin: AdminService) { }

  ngOnInit(): void {
    this.personnel = this.admin.User;
  }

  onDelete(centre : VaccinationCenter){
    this.deleted.emit(centre);
  }

}
