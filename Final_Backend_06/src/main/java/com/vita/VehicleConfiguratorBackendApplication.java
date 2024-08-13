package com.vita;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class VehicleConfiguratorBackendApplication {
	 private static final Logger logger = LoggerFactory.getLogger(VehicleConfiguratorBackendApplication.class);
	public static void main(String[] args) {
		//SpringApplication.run(VehicleConfiguratorBackendApplication.class, args);
		
		//  set a your profile programmatically
		
	        SpringApplication app = new SpringApplication(VehicleConfiguratorBackendApplication.class);
	        app.setAdditionalProfiles("shivam");
	        app.run(args);

	       
	        
	   
	}

}
