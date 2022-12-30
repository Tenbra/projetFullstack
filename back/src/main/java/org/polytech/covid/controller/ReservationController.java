package org.polytech.covid.controller;

import java.time.LocalDate;
import java.util.List;
import io.github.bucket4j.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.polytech.covid.entities.Personnel;
import org.polytech.covid.entities.Reservation;
import org.polytech.covid.service.ReservationService;
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
import java.time.Duration;

@RequestMapping("api/public/")
@RestController
public class ReservationController {
    
    //rajoute 10 tokens toutes les minutes
    Refill refill = Refill.intervally(10, Duration.ofMinutes(1));
    //capacité max de 10 token
    Bandwidth limit = Bandwidth.classic(10, refill);
    Bucket bucket = Bucket.builder().addLimit(limit).build();

   

    @GetMapping(value = "/info")
    public ResponseEntity<String> infos() {

        ConsumptionProbe probe = bucket.tryConsumeAndReturnRemaining(1);
        if(probe.isConsumed()) {
            return ResponseEntity.ok()
                    .header("X-Rate-Limit-Remaining", Long.toString(probe.getRemainingTokens()))
                    .body("info");
        }
        long delaiEnSeconde = probe.getNanosToWaitForRefill() / 1_000_000_000;
        return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                .header("X-Rate-Limit-Retry-After-Seconds", String.valueOf(delaiEnSeconde))
                .build();
    }



    @Autowired
    private ReservationService reservationService;

    @GetMapping(path = "/reservations")
    public ResponseEntity<List<Reservation>> getAll(){
        if(bucket.tryConsume(1)) {
            return ResponseEntity.ok(reservationService.findAll());
        }
        ResponseEntity<List<Reservation>> response = ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).build();
        return response;
    }


    @GetMapping(path = "/reservation/{date}")
    public ResponseEntity<List<Reservation>> getReservation(@PathVariable String date){
        if(bucket.tryConsume(1)) {
            LocalDate date2 = LocalDate.parse(date);
            return ResponseEntity.ok(reservationService.getByDate(date2));
        }
        ResponseEntity<List<Reservation>> response = ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).build();
        return response;
    }

    @GetMapping(path = "/reservation/{date}/search")
    public ResponseEntity<List<Reservation>> getReservationByNom(@PathVariable String date, @RequestParam(name = "nom", required = false) String nom){
        if(bucket.tryConsume(1)) {
            LocalDate date2 = LocalDate.parse(date);
            if (nom !=null) return ResponseEntity.ok(reservationService.getByNom(date2, nom));
            return ResponseEntity.ok(reservationService.getByDate(date2));
        }
        ResponseEntity<List<Reservation>> response = ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).build();
        return response;
    }

    @PostMapping(path = "/reservation")
    public ResponseEntity<Reservation> save(@RequestBody Reservation reservation){
        if(bucket.tryConsume(1)) {
            return ResponseEntity.ok(reservationService.save(reservation));
        }
        ResponseEntity<Reservation> response = ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).build();
        return response;
    }

    @PutMapping(path = "/reservation/{id}")
    public ResponseEntity<Reservation> update(@PathVariable int id, @RequestBody Personnel personnel){
        if(bucket.tryConsume(1)) {
            return ResponseEntity.ok(reservationService.update(id, personnel));
        }
        ResponseEntity<Reservation> response = ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).build();
        return response;
    }

    @DeleteMapping(path = "/reservation/{id}")
    public void delete(@PathVariable int id){
        reservationService.delete(id);
    }
}
