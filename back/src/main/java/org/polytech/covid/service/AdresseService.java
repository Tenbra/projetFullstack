package org.polytech.covid.service;

import java.util.List;

import org.polytech.covid.dao.AdresseRepository;
import org.polytech.covid.entities.Adresse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdresseService {
    
    @Autowired
    private AdresseRepository adresseDAO;

    public List<Adresse> findAll(){
        return adresseDAO.findAll();
    }

    public Adresse getById(int id){
        return adresseDAO.findById(id).get();
        
    }

    public Adresse save(Adresse adresse){
        return adresseDAO.save(adresse);
    }

    public Adresse update(int id, Adresse adresse){
        adresse.setId(id);
        return adresseDAO.save(adresse);
    }

    public void delete(int id){
        adresseDAO.deleteById(id);
    }
}
