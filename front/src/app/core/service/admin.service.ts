import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Personnel } from '../model/personnel';
import { Reservation } from '../model/reservation';
import { VaccinationCenter } from '../model/vaccination-center';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private center! : VaccinationCenter;

  private personnel! : Personnel;

  constructor(private httpClient: HttpClient) { }

  public get Personnel() : Personnel{
    return this.personnel;
  }
  
  public set Personnel(personnel : Personnel) {
    this.personnel = personnel;
  }

  
  public get Center() : VaccinationCenter{
    return this.center;
  }
  
  public set Center(center : VaccinationCenter) {
    this.center = center;
  }

  getToken(){
    return localStorage.getItem('token');
  }


  putCentre(centre: VaccinationCenter) : Observable<VaccinationCenter>{
    return this.httpClient.put<VaccinationCenter>("api/public/centre/"+centre.id, centre);
  }

  deleteCentre(id : number|null) : Observable<void>{
    return this.httpClient.delete<void>("api/public/centre/"+id);
  }

  saveCentre(centre: VaccinationCenter) : Observable<VaccinationCenter>{
    return this.httpClient.post<VaccinationCenter>("api/public/centre", centre);
  }  
  
  getReservationByDay(date : string): Observable<Reservation[]>{
    return this.httpClient.get<Reservation[]>("api/public/reservation/"+date);
  }

  getReservationByNom(date : string, nom : string): Observable<Reservation[]>{
    return this.httpClient.get<Reservation[]>("api/public/reservation/"+date+"/search",{
      params: {
        "nom": nom
      }
    });
  }

  putReservation(idReservation : number | null, personnel : Personnel): Observable<Reservation[]>{
    return this.httpClient.put<Reservation[]>("api/public/reservation/"+idReservation,personnel);
  }

  getMedecinsByCentreId(id : number|null) : Observable<Personnel[]>{
    return this.httpClient.get<Personnel[]>("api/private/personnels/centre/"+id);
  }

  getPersonnel() : Observable<Personnel>{
    return this.httpClient.get<Personnel>("api/user/");
  }

  getPersonnelById(id : number ) : Observable<Personnel>{
    return this.httpClient.get<Personnel>("api/private/personnels/"+id);
  }

  getAllPersonnel() : Observable<Personnel[]>{
    return this.httpClient.get<Personnel[]>("api/private/personnels");
  }

  savePersonnel(personnel: Personnel) : Observable<Personnel>{
    return this.httpClient.post<Personnel>("api/private/personnel", personnel);
  }
 
  putPersonnel(personnel: Personnel) : Observable<Personnel>{
    return this.httpClient.put<Personnel>("api/private/personnel/"+personnel.id, personnel);
  }

  deletePersonnel(id : number|null) : Observable<void>{
    return this.httpClient.delete<void>("api/private/personnel/"+id);
  }

}
