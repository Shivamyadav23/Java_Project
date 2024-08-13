package com.vita.repositoty;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.vita.model.Vehicle;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

	
	@Query(nativeQuery = true, value = "SELECT * FROM vehicles v JOIN components c ON v.comp_id = c.id WHERE v.mod_id = :modelId AND v.comp_type = :compType")
	List<Map<String, Object>> findCompByModelId(@Param("modelId") long id, @Param("compType") char compType);

	@Query(nativeQuery = true, value = "SELECT * FROM vehicles v JOIN components c ON v.comp_id = c.id WHERE v.is_configurable = :isConfigurable AND v.mod_id = :modelId")
	List<Map<String, Object>> findConfigurableComponents(@Param("modelId") long id, @Param("isConfigurable") String isConfigurable);

//most imp api
	@Query(nativeQuery = true, value = "SELECT * FROM vehicles v WHERE v.mod_id = :modId")
	List<Vehicle> findVehicleDataUsingModelId(@Param("modId") int modId);
}
