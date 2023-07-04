package com.app.service;

import java.util.List;

import com.app.pojos.Location;
import com.app.pojos.User;

public interface UserService {
//add B.L method for user validation
	User authenticateCustomer(String em,String pass);
	
	List<User> getAllCustomers();
	
	User findCustomerById(Integer id);
	
	User addCustomer(User user);
	
	Integer deleteCustomer(Integer id);
	
	User updateCustomer(Integer id,User user);
	
	User addLocation(Integer id,Location location);
}
