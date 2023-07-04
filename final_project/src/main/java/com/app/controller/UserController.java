package com.app.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.BeanDefinitionDsl.Role;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.service.LocationService;
import com.app.service.UserService;
import com.app.pojos.*;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService userService;
	@Autowired
	private LocationService locService;
	
	@GetMapping("/allusers")
	public List<User> getAllCustomers(){
		List<User> allCustomers=userService.getAllCustomers();
		return allCustomers;
	}
	@GetMapping("/{id}")
	public User getUserById(@PathVariable Integer id ) {
		return userService.findCustomerById(id);
	}
	@PostMapping("/auth")
	public User authenticateUser(@RequestBody User user) {
		System.err.println("User Validated");
			return userService.authenticateCustomer(user.getEmail(), user.getPassword());
	}
	
	
	
	
	@PostMapping("/adduser")
	public User registerCustomer(@RequestBody User user) {
		User createdCustomer=userService.addCustomer(user);
		return createdCustomer;
	}
	@PutMapping("/{id}")
	public User updateCustomer(@PathVariable Integer id,@RequestBody User user) {
		User updatedUser=userService.updateCustomer(id, user);
		return updatedUser;
	}
	@PutMapping("/{id}/addlocation")
	public User addLocation(@PathVariable Integer id,@RequestBody Location location) {
		Location newLocation=locService.addLocation(location);
		newLocation.setType(AddressType.CUSTOMER);
		return userService.addLocation(id, newLocation);
	}
	
	@DeleteMapping("/{id}")
		public ResponseEntity<?> deleteUser(@PathVariable Integer id){
			Integer deletedCustomerId=userService.deleteCustomer(id);
			if(deletedCustomerId!=null)
				return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
			else
				return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}

