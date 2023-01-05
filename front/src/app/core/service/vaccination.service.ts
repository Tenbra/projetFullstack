import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../model/reservation';
import { VaccinationCenter } from '../model/vaccination-center';

@Injectable({
  providedIn: 'root'
})
export class VaccinationService {

  public all_center_etag! : string;
  public all_center! : VaccinationCenter[];

  public center_by_id_etag! : string;
  public center_by_id! : VaccinationCenter;

  public center_by_ville_etag! : string;
  public center_by_ville! : VaccinationCenter[];

  public reservation_etag! : string;
  public reservation! : Reservation;



  constructor(private httpClient: HttpClient) { }

  getAllVaccinationCenter() : Observable<any>{    
    return this.httpClient.get<any>("api/public/centres", {
      observe: "response",
      headers : new HttpHeaders({'If-None-Match': String(this.all_center_etag)})
    });
  }

  getVaccinationCenterById(id : number) : Observable<any>{
    return this.httpClient.get<any>("api/public/centres/"+id, {
      observe: "response",
      headers : new HttpHeaders({'If-None-Match':String(this.center_by_id_etag)})
    });
  }

  getVaccinationCenterByVille(city: string) : Observable<any>{
    return this.httpClient.get<any>("api/public/centres/search", {
      params: {
        "ville": city
      },
      observe: "response",
      headers: new HttpHeaders({'If-None-Match': String(this.center_by_ville_etag)})
    });
  }

  createReservation(reservation: Reservation) : Observable<any>{
    return this.httpClient.post<any>("api/public/reservation", reservation, {observe: "response"});
  }
}
