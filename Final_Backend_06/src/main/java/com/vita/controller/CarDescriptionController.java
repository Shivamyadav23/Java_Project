package com.vita.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vita.model.CarDescription;
import com.vita.service.CarDescriptionService;

@RestController
@RequestMapping("/api/cars")
public class CarDescriptionController {

    @Autowired
    private CarDescriptionService service;

    @GetMapping("/")
    public ResponseEntity<List<CarDescription>> getAllCars() {
        List<CarDescription> cars = service.getAllCars();
        return new ResponseEntity<>(cars, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CarDescription> getCarById(@PathVariable("id") Long id) {
        Optional<CarDescription> car = service.getCarById(id);
        return car.map(ResponseEntity::ok)
                  .orElseGet(() -> ResponseEntity.notFound().build());
    }

  
    
}
