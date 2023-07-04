package com.app.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.apache.jasper.tagplugins.jstl.core.ForEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.UserDao;
import com.app.pojos.Location;
import com.app.pojos.Role;
import com.app.pojos.User;

@Service 
@Transactional 
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserDao userDao;

	@Override
	public User authenticateCustomer(String em, String pass) {
		// currently no B.L
		System.out.println("in serv");
		User user = userDao.findByEmailAndPassword(em, pass)
				.orElseThrow(() -> 
				new ResourceNotFoundException("Invalid credentials !! , User not found!!!!"));
		System.out.println("in serv");
		return user;
	}

@Override
public List<User> getAllCustomers() {
	List<User> allUsers=userDao.findAll();
	List<User> allCustomers=new ArrayList<User>();
	for (User user : allUsers) {
		if(user.getUserRole().equals(Role.valueOf("CUSTOMER")))
			allCustomers.add(user);	
	}
	return allCustomers;
}

@Override
public User findCustomerById(Integer id) {
	Optional<User> foundUser=userDao.findById(id);
	User user =foundUser.orElseThrow(()->new ResourceNotFoundException("Invalid ID!"));
	return user;
}

@Override
public User addCustomer(User user) {
	User newUser=userDao.save(user);
	return newUser;
}

@Override
public Integer deleteCustomer(Integer id) {
	if(userDao.existsById(id)) {
		userDao.deleteById(id);
		return id;
	}
	return null;
}

@Override
public User updateCustomer(Integer id, User user) {
	Optional<User> foundUser=userDao.findById(id);
	User existingUser=foundUser.orElse(null);
	if(existingUser!=null && existingUser.getUserRole().equals(Role.valueOf("CUSTOMER"))) {
		existingUser.setCustomerRating(user.getCustomerRating());
		existingUser.setEmail(user.getEmail());
		existingUser.setPassword(user.getPassword());
		existingUser.setUserLocation(user.getUserLocation());
		existingUser.setUserName(user.getUserName());
		return userDao.save(existingUser);
	}
	return null;
}

@Override
public User addLocation(Integer id, Location location) {
	User user=userDao.findById(id).orElseThrow(()->new ResourceNotFoundException("Invalid User"));
	user.setUserLocation(location);
	return user;
}

}
