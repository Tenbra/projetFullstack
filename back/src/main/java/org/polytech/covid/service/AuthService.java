package org.polytech.covid.service;

import java.util.List;
import java.util.Optional;

import org.polytech.covid.entities.Personnel;
import org.polytech.covid.entities.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AuthService implements UserDetailsService {

    @Autowired
    private PersonnelService personnelService;

    public Personnel login(String email, String password){
        Personnel personnel = personnelService.getByEmail(email).get();
        if (personnelService.getPasswordEncoder().matches(password, personnel.getPassword())){
            return personnel;
        } 
        else return null;
    }

    public void logout() {
        SecurityContext context = SecurityContextHolder.createEmptyContext();            
        SecurityContextHolder.setContext(context);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Personnel> optionalPersonnel = personnelService.getByEmail(username);
        if (optionalPersonnel.isPresent()) {
            UserDetails personnel = optionalPersonnel.get();
            return personnel;
        } else {
            throw new UsernameNotFoundException("l'utilisateur "+username+" n'existe pas");
        }
    }
}
