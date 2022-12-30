import { Address } from "./adresse";
import { Reservation } from "./reservation";

export interface VaccinationCenter{
    id : number|null;
    nom : string;
    adresse : Address;
    reservations : Reservation[];

}