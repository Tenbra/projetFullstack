package org.polytech.covid.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "t_patient")
public class Patient extends Personne {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_patient;


    @ManyToOne
    private Personnel personnel;

    
    public Patient() {
    }

    public Patient(String nom, String prenom, String email, String password, Personnel personnel) {
        super(nom, prenom, email, password);
        this.personnel = personnel;
    }

    public int getId() {
        return id_patient;
    }


    public Personnel getMedecin() {
        return personnel;
    }

    public void setId(int id){
        this.id_patient = id;
    }


    public void setMedecin(Personnel personnel) {
        this.personnel = personnel;
    }
    
}
