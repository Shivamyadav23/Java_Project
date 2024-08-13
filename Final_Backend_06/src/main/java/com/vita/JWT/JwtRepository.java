package com.vita.JWT;

import com.vita.repositoty.*;
import com.vita.model.User; // Adjust import if necessary
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public class JwtRepository {

	@Autowired
	private UserRepository userRepository;

	public boolean findUser(MyUser user) {
		// Fetch the user from the database
		Optional<User> foundUser = userRepository.findByUsername(user.getUsername());

		// Check if the user exists and the password matches
		if (foundUser.isPresent() && foundUser.get().getPassword().equals(user.getPassword())) {
			System.out.println("User found in the database");
			return true;
		} else {
			System.out.println("User not found in the database");
			return false;
		}
	}
}
