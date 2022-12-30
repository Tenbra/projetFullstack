import { Patient } from "./patient";
import { Personnel } from "./personnel";
import { VaccinationCenter } from "./vaccination-center";

export interface Reservation{
    id : number|null;
    date : Date;
    patient : Patient;
    personnel : Personnel|null;
    centre : VaccinationCenter;
}