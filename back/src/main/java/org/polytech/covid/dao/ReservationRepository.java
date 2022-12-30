package org.polytech.covid.dao;

import java.time.LocalDate;
import java.util.List;

import org.polytech.covid.entities.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Integer>{
    List<Reservation> searchByDate(LocalDate date);
    List<Reservation> searchByDateAndPatientNomStartingWithIgnoringCase(LocalDate date, String nom);
}
