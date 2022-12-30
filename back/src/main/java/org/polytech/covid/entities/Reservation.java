package org.polytech.covid.entities;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "t_reservation")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_reservation;

    private LocalDate date;

    @ManyToOne
    private Personnel personnel;

    @ManyToOne
    private Patient patient;

    @ManyToOne
    private Centre centre;


    public Reservation() {
    }

    public Reservation(LocalDate date, Patient patient) {
        this.date = date;
        this.patient = patient;
    }

    public int getId() {
        return id_reservation;
    }

    public LocalDate getDate() {
        return date;
    }

    public Patient getPatient() {
        return patient;
    }

    public Personnel getPersonnel() {
        return personnel;
    }

    public Centre getCentre() {
        return centre;
    }

    public void setId(int id){
        this.id_reservation = id;
    }

    public void setMedecin(Personnel personnel) {
        this.personnel = personnel;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public void setPersonnel(Personnel personnel) {
        this.personnel = personnel;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public void setCentre(Centre centre) {
        this.centre = centre;
    }


}
