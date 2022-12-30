package org.polytech.covid.controller;

import java.util.List;

import org.polytech.covid.entities.Personnel;
import org.polytech.covid.service.PersonnelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/private/")
public class PersonnelController {
    
    @Autowired
    private PersonnelService personnelService;

    @GetMapping(path = "/personnels")
    public List<Personnel> getAll(){
        return personnelService.findAll();
    }

    @GetMapping(path = "/personnels/{id}")
    public Personnel getPersonnel(@PathVariable int id){
        return personnelService.getById(id);
    }

    @GetMapping(path = "/personnels/centre/{id}")
    public List<Personnel> getPersonnelByCentreId(@PathVariable int id){
        return personnelService.getByCentreId(id);
    }

    @PostMapping(path = "/personnel")
    public Personnel save(@RequestBody Personnel personnel){
        return personnelService.save(personnel);
    }

    @PutMapping(path = "/personnel/{id}")
    public Personnel update(@PathVariable int id, @RequestBody Personnel personnel){
        return personnelService.update(id, personnel);
    }

    @DeleteMapping(path = "/personnel/{id}")
    public void delete(@PathVariable int id){
        personnelService.delete(id);
    }
}
