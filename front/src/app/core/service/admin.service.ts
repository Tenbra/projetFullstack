import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Personnel } from '../model/personnel';
import { Reservation } from '../model/reservation';
import { VaccinationCenter } from '../model/vaccination-center';
import { VaccinationService } from './vaccination.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  message! : string;


  private user! : Personnel;
  private user_etag! : string;


  public reservations_by_date! : Reservation[];
  public reservations_by_date_etag! : string;

  public reservations_by_nom! : Reservation[];
  public reservations_by_nom_etag! : string;

  public reservation! : Reservation;
  public reservation_etag! : string;

  public personnel_by_centre_id! : Personnel[];
  public personnel_by_centre_id_etag! : string;
  
  public all_personnel! : Personnel[];
  public all_personnel_etag! : string;

  public personnel_by_id! : Personnel;
  public personnel_by_id_etag! : string;


  constructor(
    private httpClient: HttpClient,
    private service: VaccinationService
    ) { }

  public get User() : Personnel{
    return this.user;
  }
  
  public set User(user : Personnel) {
    this.user = user;
  }

  public get User_etag() : string{
    return this.user_etag;
  }
  
  public set User_etag(etag : string) {
    this.user_etag = etag;
  }

  getToken(){
    return localStorage.getItem('token');
  }

  hasRole(role : string){
    if (this.user == undefined) return false;
    else return this.user.roles.some(r => r.role == role)
  }

  getUser() : Observable<any>{
    return this.httpClient.get<any>("http://localhost:8080/api/user/", {
      observe: 'response',
      headers : new HttpHeaders({'If-None-Match': String(this.user_etag)})
    });
  }


  putCentre(centre: VaccinationCenter) : Observable<any>{
    return this.httpClient.put<any>("http://localhost:8080/api/public/centre/"+centre.id, centre,{
      observe: "response",
      headers : new HttpHeaders({'If-Match': String(this.service.center_by_id_etag)})
    });
  }

  deleteCentre(id : number|null) : Observable<void>{
    return this.httpClient.delete<void>("http://localhost:8080/api/public/centre/"+id);
  }

  saveCentre(centre: VaccinationCenter) : Observable<any>{
    return this.httpClient.post<any>("http://localhost:8080/api/public/centre", centre, {
      observe: "response"
    });
  }  
  
  getReservationByDay(date : string): Observable<any>{
    return this.httpClient.get<any>("http://localhost:8080/api/public/reservation/"+date, {
      observe: "response",
      headers : new HttpHeaders({'If-None-Match': String(this.reservations_by_date_etag)})
    });
  }

  getReservationByNom(date : string, nom : string): Observable<any>{
    return this.httpClient.get<any>("http://localhost:8080/api/public/reservation/"+date+"/search",{
      params: {
        "nom": nom
      },
      observe: "response",
      headers : new HttpHeaders({'If-None-Match': String(this.reservations_by_nom_etag)})
    });
  }

  putReservation(idReservation : number | null, personnel : Personnel): Observable<any>{
    return this.httpClient.put<any>("http://localhost:8080/api/public/reservation/"+idReservation,personnel,{
      observe: "response",
      headers : new HttpHeaders({'If-Match': String(this.reservation_etag)})
    });
  }

  getPersonnelByCentreId(id : number|null) : Observable<any>{
    return this.httpClient.get<any>("http://localhost:8080/api/private/personnels/centre/"+id, {
      observe: "response",
      headers : new HttpHeaders({'If-None-Match': String(this.personnel_by_centre_id_etag)})
    });
  }

  

  getPersonnelById(id : number ) : Observable<any>{
    return this.httpClient.get<any>("http://localhost:8080/api/private/personnels/"+id, {
      observe: "response",
      headers : new HttpHeaders({'If-None-Match': String(this.personnel_by_id_etag)})
    });
  }

  getAllPersonnel() : Observable<any>{
    return this.httpClient.get<any>("http://localhost:8080/api/private/personnels", {
      observe: "response",
      headers : new HttpHeaders({'If-None-Match': String(this.all_personnel_etag)})
    });
  }

  savePersonnel(personnel: Personnel) : Observable<any>{
    return this.httpClient.post<any>("http://localhost:8080/api/private/personnel", personnel, {
      observe: "response"
    });
  }
 
  putPersonnel(personnel: Personnel) : Observable<any>{
    return this.httpClient.put<any>("http://localhost:8080/api/private/personnel/"+personnel.id, personnel, {
      observe: "response",
      headers : new HttpHeaders({'If-Match': String(this.personnel_by_id_etag)})
    });
  }

  deletePersonnel(id : number|null) : Observable<void>{
    return this.httpClient.delete<void>("http://localhost:8080/api/private/personnel/"+id);
  }

}
