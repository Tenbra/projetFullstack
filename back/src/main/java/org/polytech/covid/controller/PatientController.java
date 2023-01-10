package org.polytech.covid.controller;

import java.util.ArrayList;
import java.util.List;

import org.polytech.covid.entities.Patient;
import org.polytech.covid.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("api/private/")
@RestController
public class PatientController {
    
    @Autowired
    private PatientService patientService;

    @GetMapping(path = "/patients")
    public List<Patient> getAll(){
        return patientService.findAll();
    }

    @GetMapping(path = "/patients/search")
    public List<Patient> getAllSearch(
        @RequestParam(name = "nom", required = false) String nom
        ){
        if (nom != null) return patientService.getByNom(nom);
        else return new ArrayList<Patient>();
    }


    @GetMapping(path = "/patients/{id}")
    public Patient getPatient(@PathVariable int id){
        return patientService.getById(id);
    }

    @PostMapping(path = "/patient")
    public Patient save(@RequestBody Patient patient){
        return patientService.save(patient);
    }

    @PutMapping(path = "/patient/{id}")
    public Patient update(@PathVariable int id, @RequestBody Patient patient){
        return patientService.update(id, patient);
    }

    @DeleteMapping(path = "/patient/{id}")
    public void delete(@PathVariable int id){
        patientService.delete(id);
    }
}
