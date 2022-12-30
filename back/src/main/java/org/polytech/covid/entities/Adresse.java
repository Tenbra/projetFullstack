package org.polytech.covid.entities;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="t_adresse")
public class Adresse {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_adresse;
    private String ville;
    private String codepostal;
    private String pays;
    private String complement;


    public Adresse() {
    }

    public Adresse(String ville, String codepostal, String pays, String complement) {
        this.ville = ville;
        this.codepostal = codepostal;
        this.pays = pays;
        this.complement = complement;
    }


    public String getVille() {
        return ville;
    }

    public String getCodepostal() {
        return codepostal;
    }

    public String getPays() {
        return pays;
    }

    public String getComplement() {
        return complement;
    }

    public void setId(int id){
        this.id_adresse = id;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public void setCodepostal(String codepostal) {
        this.codepostal = codepostal;
    }

    public void setPays(String pays) {
        this.pays = pays;
    }
    
    public void setComplement(String complement) {
        this.complement = complement;
    }
    
}
