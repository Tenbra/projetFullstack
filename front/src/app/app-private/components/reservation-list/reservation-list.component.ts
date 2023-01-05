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

  @Input() reservations! : Reservation[];

  reservation! : Reservation;

  constructor(
    private service: AdminService,
    private router: Router
    ) { }

  ngOnInit(): void {

  }

  validate(id : number | null): void {
    this.service.putReservation(id,this.service.User).subscribe( resp=>{
      this.service.reservation = resp.body;
      this.service.reservation_etag = resp.headers.get("etag");
      this.router.navigateByUrl('private/home');
    }, error => {
      if (error.status==412){
        //Coder la modale qui demande d'actualiser
        alert("La ressource n'est plus à jour, veuillez la recharger avant de la modifier")
      }
    });
  }



  

}
