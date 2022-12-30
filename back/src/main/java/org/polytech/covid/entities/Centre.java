package org.polytech.covid.entities;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "t_centre")
public class Centre {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String nom;

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    @JoinColumn(name = "id_adresse",
    foreignKey =  @ForeignKey(name = "adresse_fk"),
    nullable = false)
    private Adresse adresse;
    
    public Centre() {
    }

    public Centre(String nom, Adresse adresse) {
        this.nom = nom;
        this.adresse = adresse;
    }

    public int getId() {
        return id;
    }
    
    public String getNom() {
        return nom;
    }

    public Adresse getAdresse() {
        return adresse;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public void setAdresse(Adresse adresse) {
        this.adresse = adresse;
    }    

    

}
