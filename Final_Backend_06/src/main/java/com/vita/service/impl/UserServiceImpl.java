package com.vita.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.vita.model.User;
import com.vita.repositoty.UserRepository;
import com.vita.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    private UserRepository userRepo;

    @PostMapping(value = "/register")
    public User createUser(@RequestBody User user) {
        logger.info("Creating user with email: {}", user.getEmail());
        logger.info("Randomly generated ID is: {}", user.getUsername());
        System.out.println(" Inside repo"+user);
        userRepo.save(user);
        logger.info("User created successfully: {}", user);
        return user;
    }

    public User getUserByEmail(String email) {
        logger.debug("Fetching user by email: {}", email);
        // TODO Auto-generated method stub
        return null;
    }

  
	@Override
	public User getUserByUserName(String username) {
		
		return  userRepo.getUserByUsername(username) ;
	}

	
//	
//    public boolean validateUser(User reg) {
//        // Trim and log inputs
//        String username = reg.getUsername().trim();
//        String password = reg.getPassword().trim();
//        
//        
////        System.out.print(username,password  );
//        System.out.printf(reg.getPassword().trim(),reg.getUsername().trim());
//        
//        logger.debug("Validating user with username: '{}' and password: '{}'", username, password);
//        
//        boolean isValid = userRepo.validateUser(username, password);
//        
//        logger.debug("Validatioresult: {}", isValid);
//        		 return isValid;
//}
	  public User getUserById(String userid) {
	        logger.debug("Fetching user by ID: {}", userid);
	        return userRepo.findById(userid).orElse(null);
	    }

@Override
public boolean validateUser(User reg) {
	// TODO Auto-generated method stub
	return false;
}

}
