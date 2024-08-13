package com.vita.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vita.model.Component;
import com.vita.repositoty.ComponentRepository;

@Service
public class ComponentServiceImpl {
	@Autowired
    private ComponentRepository componentRepository;
 
   /* public ComponentService(ComponentRepository componentRepository) {
        this.componentRepository = componentRepository;
    }*/

	public List<Component> getAllComponents() {
		// TODO Auto-generated method stub
		  return componentRepository.findAll();
	}
	public Component getComponentById(long id) {
		return componentRepository.findById(id).get();
	}

    // Other methods as needed
}
