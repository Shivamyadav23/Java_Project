package com.vita.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vita.model.Vehicle;
import com.vita.repositoty.VehicleRepository;
import com.vita.service.VehicleService;


@Service
public class VehicleServiceImpl implements VehicleService {

	@Autowired
    private VehicleRepository vehicleRepository;

    @Override
    public List<?> getCompByModelID(long id, char compType) {
        return vehicleRepository.findCompByModelId(id, compType);
    }

    @Override
    public List<?> getConfigurableComponents(long id, String isConfigurable) {
        return vehicleRepository.findConfigurableComponents(id, isConfigurable);
    }

    @Override
    public List<Vehicle> getVehicleDataUsingModelId(int modId) {
        return vehicleRepository.findVehicleDataUsingModelId(modId);
    }
}
