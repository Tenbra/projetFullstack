import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Reservation } from '../../../core/model/reservation';
import { VaccinationCenter } from '../../../core/model/vaccination-center';
import { VaccinationService } from '../../../core/service/vaccination.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  bookForm! : FormGroup;
  center! : VaccinationCenter;
  reservation! : Reservation;
  result!: Observable<Reservation>;


  constructor(
    private formbuilder: FormBuilder,
    private route: ActivatedRoute,
    private service: VaccinationService,
    private router: Router ) { }

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    this.service.getVaccinationCenterById(id).subscribe(resp =>{
      this.service.center_by_id = resp.body;
      this.center = resp.body
      this.service.center_by_id_etag = resp.headers.get("etag")
    }, error => {
      this.center = this.service.center_by_id;
    });
    
    this.bookForm = this.formbuilder.group({
      prenom : [null, [Validators.required]],
      nom : [null, [Validators.required]],
      email : [null, [Validators.required, Validators.email]],
      date: [null, [Validators.required]]
    })
    
  }


  reserver(){
    this.reservation = {
      id : null,
      centre : this.center,
      date : this.bookForm.value.date,
      patient : {
        id: null,
        email : this.bookForm.value.email,
        nom : this.bookForm.value.nom,
        prenom : this.bookForm.value.prenom,
      },
      personnel : null
    }
    
    this.service.createReservation(this.reservation).subscribe(result =>{
      this.router.navigate(['public/reservation'], {skipLocationChange: true})
    });
    
  }

}
