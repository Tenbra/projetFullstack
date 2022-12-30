package org.polytech.covid.dao;

import java.util.List;

import org.polytech.covid.entities.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Integer>{
    List<Patient> searchByNom(String nom);
    Patient searchByEmail(String email);
}
