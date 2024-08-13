package com.vita.service.impl;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vita.model.Manufacturer;
import com.vita.repositoty.ManufacturerRepository;
import com.vita.service.ManufacturerService;


@Service
public class ManufacturerServiceImpl implements ManufacturerService {

	@Autowired
	private ManufacturerRepository manufacturerRepository;

	@Override
	public List<Manufacturer> getAllManufacturersById(Long segId) {
		return manufacturerRepository.findBySegmentId(segId);
	}

}


