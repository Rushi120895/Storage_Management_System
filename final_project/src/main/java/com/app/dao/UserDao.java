package com.app.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.pojos.User;
@Repository
public interface UserDao extends JpaRepository<User,Integer>{
//add a method for user validation
//	User validateUser(String email,String pass);
	Optional<User> findByEmailAndPassword(String em,String pass);
}
