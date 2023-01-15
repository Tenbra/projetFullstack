package org.polytech.covid;

import org.polytech.covid.dao.PersonnelRepository;

import java.util.List;

import org.polytech.covid.dao.AdresseRepository;
import org.polytech.covid.dao.CentreRepository;
import org.polytech.covid.dao.PatientRepository;

import org.polytech.covid.dao.ReservationRepository;
import org.polytech.covid.dao.RoleRepository;
import org.polytech.covid.entities.Personnel;
import org.polytech.covid.entities.Role;
import org.polytech.covid.entities.Adresse;
import org.polytech.covid.entities.Centre;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class CovidApiApplication {

    @Autowired
    PasswordEncoder passwordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(CovidApiApplication.class, args);
	}

	@Bean
    CommandLineRunner runner   (CentreRepository centreInterface, AdresseRepository adresseInterface, PatientRepository patientInterface, ReservationRepository reservationInterface, PersonnelRepository personnelInterface, RoleRepository roleRepository){
        return args -> {
            centreInterface.save(new Centre("CHRU Nancy Brabois",new Adresse("Nancy","54511","FRANCE","Rue de Morvan")));
            centreInterface.save(new Centre("CHR Thionville",new Adresse("Metz","57530","FRANCE","Allee du chateau")));
            centreInterface.save(new Centre("CHRU Strasbourg",new Adresse("Strasbourg","67000","FRANCE","place de l'hopitale")));
            roleRepository.save(new Role("MEDECIN"));
            roleRepository.save(new Role("ADMIN"));
            roleRepository.save(new Role("SUPER_ADMIN"));
            personnelInterface.save(new Personnel("Tenede", "Bryan", "tenede@bryan.com", passwordEncoder.encode("password"), List.of(roleRepository.searchByRole("ADMIN")), centreInterface.getReferenceById(1)));
            personnelInterface.save(new Personnel("Tenede", "Bryan", "tene@bryan.com", passwordEncoder.encode("password"), List.of(roleRepository.searchByRole("MEDECIN")), centreInterface.getReferenceById(1)));
            personnelInterface.save(new Personnel("Tenede", "Bryan", "gautier@klam.com", passwordEncoder.encode("password"), List.of(roleRepository.searchByRole("MEDECIN")), centreInterface.getReferenceById(1)));
            personnelInterface.save(new Personnel("Tenede", "Bryan", "klam@gautier.com", passwordEncoder.encode("password"), List.of(roleRepository.searchByRole("SUPER_ADMIN")), centreInterface.getReferenceById(1)));

        };
}
}
