package com.vita.service.impl;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vita.model.AlternateComponent;
import com.vita.repositoty.AlternateComponentRepository;
import com.vita.service.AlternateComponentService;
@Service
public class AlternateComponentServiceImpl implements AlternateComponentService {
    
    @Autowired
    private AlternateComponentRepository repository;

    @Override
    public List<Map<String, Object>> findByModelIdAndAlternateCompId(int mod_id, int alt_comp_id) {
        return repository.findByModelIdAndCompId(mod_id, alt_comp_id);
    }

    
    public List<Integer> findByModelIdAndCompId(int mod_id, int comp_id) {
        return repository.findAlternateCompIdsByModelIdAndCompId(mod_id, comp_id);
    }

    @Override
    public List<AlternateComponent> getAllAltComp(int mod_id) {
        return repository.findAllUsingId(mod_id);
    }

    public List<Map<String, Object>> getDeltaPriceAndNameByArray(int mod_id, int comp_id) {
        List<Object[]> results = repository.findAlternateComponentsWithDetails(mod_id, comp_id);
        List<Map<String, Object>> formattedResults = new ArrayList<>();
        for (Object[] result : results) {
            Map<String, Object> map = new HashMap<>();
            map.put("alt_comp_id", result[0]);
            map.put("comp_name", result[1]);
            map.put("delta_price", result[2]);
            map.put("mod_id", result[3]);
            formattedResults.add(map);
        }
        return formattedResults;
    }
}



/*
@Override
public List<AlternateComponent> findByModelIdAndCompId(int mod_id, int comp_id) {
    List<AlternateComponent> componentlist = repository.findAlternateCompByModelIdAndCompId(mod_id, comp_id);
    // Handle or return the list as needed
    return componentlist;
}

*/

/*
@Service
public class AlternateComponentServiceimpl implements  AlternateComponentService {
	
	@Autowired
	private AlternateComponentRepository repository;

	
	public List<Map<String, Object>> findByModelIdAndAlternateCompId(int mod_id, int alt_comp_id) {
		List<Map<String, Object>> data = repository.findByModelIdAndCompId(mod_id, alt_comp_id);
		return data;
	}


	@Override
	public AlternateComponent findByModelIdAndCompId(int mod_id, int comp_id) {
		AlternateComponent component=repository.findAlternateCompByModelIdAndCompId(mod_id, comp_id);
		return component;
	}


	@Override
	public List<AlternateComponent> getAllAltComp(int mod_id) {
		
		return repository.findAllUsingId(mod_id);
	}
	
}*/