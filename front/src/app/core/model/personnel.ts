import { VaccinationCenter } from "./vaccination-center";

export interface Personnel{
    id : number|null;
    nom : string;
    prenom: string;
    email : string;
    password: string;
    centre : VaccinationCenter;
    roles : string[];
}