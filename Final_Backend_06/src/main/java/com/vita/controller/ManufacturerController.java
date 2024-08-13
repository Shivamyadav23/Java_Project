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

import com.vita.model.Manufacturer;
import com.vita.service.ManufacturerService;

@RestController
@CrossOrigin
@RequestMapping("/api/manufacturers")
public class ManufacturerController {

	@Autowired
	private ManufacturerService manu_service;

	@GetMapping("/{segId}")
	public ResponseEntity<List<Manufacturer>> fetchManufacturerFromDb(@PathVariable(value = "segId") Long segId) {
		try {

			List<Manufacturer> manufacurers = manu_service.getAllManufacturersById(segId);
			return new ResponseEntity<>(manufacurers, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
}
