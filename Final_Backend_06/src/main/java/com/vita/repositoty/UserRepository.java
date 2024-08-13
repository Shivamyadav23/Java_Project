package com.vita.repositoty;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.vita.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    User findByEmail(String email);

	
    @Query("SELECT count(u)>0 FROM User u WHERE u.username = :username AND u.password = :password")
	 Optional<User> findByUsernameAndPassword(@Param("username") String username, @Param("password") String password);
	 
	 @Query(value="SELECT  * FROM User Where username=:username",nativeQuery=true)
	 User getUserByUsername(@Param("username")String username);


	 Optional<User> findByUsername(String username);
//
//	 @Query("SELECT count(u)>0 FROM User u WHERE u.username = :username AND u.password = :password")
//	boolean ValidateUser(String username, String password);
//	 
//	 @Query("SELECT count(u) > 0 FROM User u WHERE u.username = :username AND u.password = :password")
//	 boolean validateUser(@Param("username") String username, @Param("password") String password);
	 
	 @Query("SELECT count(u) > 0 FROM User u WHERE u.username = :username AND u.password = :password")
	    boolean validateUser(@Param("username") String username, @Param("password") String password);


}
