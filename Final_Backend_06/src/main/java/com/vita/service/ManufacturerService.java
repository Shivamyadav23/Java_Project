package com.vita.service;

import java.util.List;

import com.vita.model.Manufacturer;




public interface ManufacturerService {

	List<Manufacturer> getAllManufacturersById(Long id);
}