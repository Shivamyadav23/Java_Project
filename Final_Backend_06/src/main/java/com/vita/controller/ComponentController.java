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

import com.vita.model.Component;
import com.vita.service.impl.ComponentServiceImpl;

@RestController
@CrossOrigin
@RequestMapping("/api/components")
public class ComponentController {
	
	@Autowired
    ComponentServiceImpl componentService;

   

    @GetMapping("/")
    public ResponseEntity<List<?>>  getAllComponents() {
        
        try {
			List<Component> components = componentService.getAllComponents();
			return new ResponseEntity<>(components,HttpStatus.OK);

		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
    }
    @GetMapping("/{id}")
public ResponseEntity<Component>  getComponentById(@PathVariable long id) {
        
        try {
			Component component = componentService.getComponentById(id);
			return new ResponseEntity<>(component,HttpStatus.OK);

		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
    }
}