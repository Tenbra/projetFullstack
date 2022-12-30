package org.polytech.covid.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.polytech.covid.dao.PersonnelRepository;
import org.polytech.covid.dao.RoleRepository;
import org.polytech.covid.entities.Personnel;
import org.polytech.covid.entities.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PersonnelService {
    
    private PersonnelRepository personnelDAO;
    
    @Autowired
    private RoleRepository roleDAO;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    public PersonnelService(PersonnelRepository personnelDAO , PasswordEncoder passwordEncoder) {
        this.personnelDAO = personnelDAO;
        this.passwordEncoder = passwordEncoder;
    }

    public PasswordEncoder getPasswordEncoder(){
        return passwordEncoder;
    }

    public List<Personnel> findAll(){
        return personnelDAO.findAll();
    }

    public Personnel getById(int id){
        return personnelDAO.findById(id).get();
    }

    public Optional<Personnel> getByEmail(String email){
        return personnelDAO.searchByEmail(email);
    }

    public Personnel save(Personnel personnel){
        ArrayList<Role> roles = new ArrayList<>();
        for (Role role : personnel.getRoles()) {
            roles.add(roleDAO.searchByRole(role.getRole()));
        }
        Personnel personnelNew = new Personnel(personnel.getNom(), personnel.getPrenom(),personnel.getEmail(),personnel.getPassword(),roles,personnel.getCentre());
        return personnelDAO.save(personnelNew);
    }

    public Personnel update(int id, Personnel personnel){
        Personnel personnelNew = personnelDAO.getReferenceById(id);
        personnelNew.setCentre(personnel.getCentre());
        personnelNew.setNom(personnel.getNom());
        personnelNew.setPrenom(personnel.getPrenom());
        personnelNew.setEmail(personnel.getEmail());
        personnelNew.setPassword(personnel.getPassword());
        personnelNew.setRole(List.of());
        ArrayList<Role> roles = new ArrayList<>();
        for (Role role : personnel.getRoles()) {
            roles.add(roleDAO.searchByRole(role.getRole()));
        }
        personnelNew.setRole(roles);
        
        return personnelDAO.save(personnelNew);
    }

    public List<Personnel> getByCentreId(int id){
        return personnelDAO.searchByCentreId(id);
    }

    public void delete(int id){
        personnelDAO.deleteById(id);
    }

}
