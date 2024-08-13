package com.vita.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vita.model.CarDescription;
import com.vita.repositoty.CarDescriptionRepository;

@Service
public class CarDescriptionService {

    @Autowired
    private CarDescriptionRepository repository;

    public List<CarDescription> getAllCars() {
        return repository.findAll();
    }

    public Optional<CarDescription> getCarById(Long id) {
        return repository.findById(id);
    }

}
