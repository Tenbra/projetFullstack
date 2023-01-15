import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Reservation } from 'src/app/core/model/reservation';
import { AdminService } from 'src/app/core/service/admin.service';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

  columnsDisplay: string[] = ["id","prenom","nom","action1"]

  @Input() reservations! : Reservation[];

  reservation! : Reservation;

  constructor(
    private service: AdminService,
    private router: Router,
    private dialog: MatDialog
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
        this.openDialog("La ressource n'est plus à jour, la page va etre rechargé")
      }
      else{
        this.openDialog("Votre role ne vous permet pas de valider cette reservation")
      }
    });
  }

  
  openDialog(text : string) {
    this.service.message = text
    this.dialog.open(DialogComponent);
  }
  

}
