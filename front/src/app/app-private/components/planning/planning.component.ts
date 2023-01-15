import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from 'src/app/core/model/reservation';
import { VaccinationCenter } from 'src/app/core/model/vaccination-center';
import { AdminService } from 'src/app/core/service/admin.service';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {

  centre! : VaccinationCenter;
  patient! : string;
  reservations! : Reservation[];
  date! : Date;

  constructor(
    private service: AdminService
  ) { }

  ngOnInit(): void {
    this.centre = this.service.User.centre;
    this.date = new Date();
    this.getReservations(this.date);
  }

  getReservations(date : Date): void {
    let day = date.getDate() > 9 ? ""+date.getDate() : "0"+date.getDate();
    let month = date.getMonth()+1 > 9 ? ""+(date.getMonth()+1) : "0"+(date.getMonth()+1);
    this.service.getReservationByDay(date.getFullYear()+"-"+month+"-"+day).subscribe(resp =>{
      this.service.reservations_by_date = resp.body;
      this.reservations = resp.body;
      this.service.reservations_by_date_etag = resp.headers.get("etag");
      }, error => {
        this.reservations = this.service.reservations_by_date;
      });
  }

  getReservationsByName(date : Date, nom : string): void {
    let day = date.getDate() > 9 ? ""+date.getDate() : "0"+date.getDate();
    let month = date.getMonth()+1 > 9 ? ""+(date.getMonth()+1) : "0"+(date.getMonth()+1);
    this.service.getReservationByNom(date.getFullYear()+"-"+month+"-"+day, this.patient).subscribe(resp =>{
      this.service.reservations_by_nom = resp.body;
      this.reservations = resp.body;
      this.service.reservations_by_nom_etag = resp.headers.get("etag");
      }, error => {
        this.reservations = this.service.reservations_by_date;
      });;    
  }

  next(): void {
    let tomorrow = new Date();
    tomorrow.setDate(this.date.getDate()+1);
    this.date = tomorrow;
    this.getReservations(tomorrow);
    
  }

  prev(): void {
    let yesterday = new Date();
    yesterday.setDate(this.date.getDate()-1);
    this.date = yesterday;
    this.getReservations(yesterday);
  }
}
