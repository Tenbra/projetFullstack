package org.polytech.covid.dao;

import org.polytech.covid.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
    Role searchByRole(String role);
}
