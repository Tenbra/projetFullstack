package org.polytech.covid.dao;

import java.util.List;
import java.util.Optional;

import org.polytech.covid.entities.Personnel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonnelRepository extends JpaRepository<Personnel, Integer> {
    Optional<Personnel> searchByEmail(String email);
    List<Personnel> searchByCentreId(int id);
    Optional<Personnel> findByPassword(String password);
}
