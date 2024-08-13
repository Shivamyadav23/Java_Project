package com.vita.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vita.model.Vehicle;
import com.vita.service.VehicleService;

@RestController
@CrossOrigin
@RequestMapping("/api/vehicles")
public class VehicleController {
	@Autowired
    private VehicleService vehicleService;
    
    @GetMapping(value = "/{compType}/{id}")
    public ResponseEntity<List<?>> getVehicleByID(@PathVariable char compType, @PathVariable long id) {
        try {
            List<?> components = vehicleService.getCompByModelID(id, compType);
            return new ResponseEntity<>(components, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    
    @GetMapping(value = "/config/{id}/{isConfigurable}")
    public ResponseEntity<List<?>> getConfigurableComponentsByModId(@PathVariable long id, @PathVariable String isConfigurable) {
        try {
            List<?> components = vehicleService.getConfigurableComponents(id, isConfigurable);
            return new ResponseEntity<>(components, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    
    @GetMapping(value = "/{modId}")
    public ResponseEntity<List<Vehicle>> getVehicleDataUsingModelId(@PathVariable int modId) {
        try {
            List<Vehicle> vehicleDetails = vehicleService.getVehicleDataUsingModelId(modId);
            return new ResponseEntity<>(vehicleDetails, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
