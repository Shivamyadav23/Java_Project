package com.vita.service;

import java.util.List;

import com.vita.model.Vehicle;

public interface VehicleService {

    List<?> getCompByModelID(long id, char compType);
    List<?> getConfigurableComponents(long id, String isConfigurable);
    List<Vehicle> getVehicleDataUsingModelId(int modId);

}