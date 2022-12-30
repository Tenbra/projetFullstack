import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../model/reservation';
import { VaccinationCenter } from '../model/vaccination-center';

@Injectable({
  providedIn: 'root'
})
export class VaccinationService {

  constructor(private httpClient: HttpClient) { }

  getAllVaccinationCenter() : Observable<VaccinationCenter[]>{
    return this.httpClient.get<VaccinationCenter[]>("api/public/centres");
  }

  getVaccinationCenterById(id : number) : Observable<VaccinationCenter>{
    return this.httpClient.get<VaccinationCenter>("api/public/centres/"+id);
  }

  getVaccinationCenterByVille(city: string) : Observable<VaccinationCenter[]>{
    return this.httpClient.get<VaccinationCenter[]>("api/public/centres/search", {
      params: {
        "ville": city
      }
    });
  }

  createReservation(reservation: Reservation) : Observable<Reservation>{
    return this.httpClient.post<Reservation>("api/public/reservation", reservation);
  }
}
