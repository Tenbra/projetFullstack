import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Reservation } from 'src/app/core/model/reservation';
import { AdminService } from 'src/app/core/service/admin.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

  @Input() reservations! : Observable<Reservation[]>;

  reservation! : Reservation;

  constructor(
    private service: AdminService,
    private router: Router
    ) { }

  ngOnInit(): void {

  }

  validate(id : number | null): void {
    this.service.putReservation(id,this.service.Personnel).subscribe( reservation =>{
      this.router.navigateByUrl('private/home');
    })
  }

}
