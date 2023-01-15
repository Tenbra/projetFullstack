package org.polytech.covid.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;


@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, UserDetailsService userDetailsService) throws Exception {
        http
        .cors().disable()
        .csrf().disable() //Desactivation de la protection csrf
        .authorizeHttpRequests()
            .antMatchers(HttpMethod.OPTIONS,"/**").permitAll()
            
            .antMatchers(HttpMethod.GET, "/api/public/**","/api/auth/**").permitAll()
            .antMatchers(HttpMethod.POST, "/api/public/**","/api/auth/**").permitAll()

            .antMatchers(HttpMethod.GET, "/api/public/reservation/**").hasAnyAuthority("MEDECIN","ADMIN")
            .antMatchers(HttpMethod.PUT, "/api/public/reservation/**").hasAuthority("MEDECIN")
            .antMatchers(HttpMethod.GET, "/api/private/personnels/**").hasAnyAuthority("MEDECIN","ADMIN","SUPER_ADMIN")

            .antMatchers(HttpMethod.DELETE, "/api/public/reservation/**").hasAuthority("ADMIN")            
            .antMatchers(HttpMethod.POST, "/api/private/personnel").hasAnyAuthority("ADMIN","SUPER_ADMIN")
            .antMatchers(HttpMethod.PUT, "/api/private/personnel/**").hasAnyAuthority("ADMIN","SUPER_ADMIN")
            
            .antMatchers(HttpMethod.PUT, "/api/public/centre/**").hasAuthority("SUPER_ADMIN")            
            .antMatchers(HttpMethod.POST, "/api/public/centre").hasAuthority("SUPER_ADMIN")
            .antMatchers(HttpMethod.DELETE, "/api/public/centre/**").hasAuthority("SUPER_ADMIN")
            .antMatchers(HttpMethod.DELETE, "/api/private/personnel/**").hasAuthority("SUPER_ADMIN")
            .antMatchers(HttpMethod.GET, "/api/private/**").hasAuthority("SUPER_ADMIN")
            .anyRequest().authenticated()
            .and()
        .httpBasic(withDefaults())
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        return http.build();
    }

    @Bean
    public PasswordEncoder PasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
