package com.vita.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vita.model.Model;
import com.vita.service.ModelService;

@RestController
@CrossOrigin
@RequestMapping("/api/models")
public class ModelController {

    @Autowired
    private ModelService modelService;
    
    @GetMapping("/")
    public ResponseEntity<List<Model>> getAllModels() {
        try {
            List<Model> models = modelService.getAllModels();
            return new ResponseEntity<>(models, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{segId}/{manuId}")
    public ResponseEntity<List<Model>> fetchModelsBySegmentAndManufacturer(@PathVariable Long segId, @PathVariable Long manuId) {
        try {
            List<Model> models = modelService.getAllModelsByManuIdAndSegId(segId, manuId);
            return new ResponseEntity<>(models, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/details/{id}")
    public ResponseEntity<Model> fetchModelById(@PathVariable Long id) {
        try {
            Optional<Model> model = modelService.getModelById(id);
            return model.map(ResponseEntity::ok)
                        .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    //@GetMapping("/{id}")
    //public ResponseEntity<Model> fetchprice(@PathVariable Long id) 
    
}
