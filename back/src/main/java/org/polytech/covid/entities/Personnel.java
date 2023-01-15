package org.polytech.covid.entities;

import java.util.Collection;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Table(name = "t_administrateur")
public class Personnel extends Personne implements UserDetails {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_admin;

    @ManyToOne
    private Centre centre;

    private boolean accountNonExpired;
    private boolean accountNonLocked;
    private boolean credentialsNonExpired;
    private boolean enabled;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            joinColumns = @JoinColumn(referencedColumnName = "id_admin"), 
            inverseJoinColumns = @JoinColumn(referencedColumnName = "id_role") 
    )
    private List<Role> roles;

    public Personnel() {
    }

    public Personnel(String nom, String prenom, String email, String password, List<Role> roles, Centre centre) {
        super(nom, prenom, email, password);
        this.centre = centre;
        this.roles = roles;
        this.accountNonExpired = true;
        this.accountNonLocked = true;
        this.credentialsNonExpired = true;
        this.enabled = true;
    }

    public int getId(){
        return id_admin;
    }

    public Centre getCentre(){
        return centre;
    }

    public void setCentre(Centre centre) {
        this.centre = centre;
    }

    public List<Role> getRoles() {
        return roles;
    }
    
    public void setRole(List<Role> roles) {
        this.roles = roles;
    }

    public void login(){
        this.credentialsNonExpired = true;
    }

    public void logout(){
        this.credentialsNonExpired = false;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<SimpleGrantedAuthority> grantedAuthority = getRoles().stream().map( role -> new SimpleGrantedAuthority(role.getRole())).toList();
        return grantedAuthority;
    }

    @Override
    public String getUsername() {
        return this.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return this.accountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return this.accountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return this.credentialsNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return this.enabled;
    }
    
}
