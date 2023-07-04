package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.app.pojos.Location;
import com.app.service.LocationServiceImpl;
import com.app.service.UserService;

@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/user/location")
@RestController
public class LocationController {
@Autowired
private LocationServiceImpl locService;
private UserService userService;

@GetMapping("/{id}")
public Location getLocation(@PathVariable Integer id) {
	Location location=locService.findLocationById(id);
	return locService.findLocationById(id);
}
@GetMapping("/alllocations")
public List<Location> getAllLocations(){
	return locService.getAllLocation();
}
@PostMapping("addlocation/{uid}")
public Location addLocation(@RequestBody Location location, @PathVariable Integer Id){
	location.setUser(userService.findCustomerById(Id));
	return locService.addLocation(location);
}
@PutMapping
public Location updateLocation(@PathVariable Integer id,@RequestBody Location location) {
	return locService.updateLocation(id, location);
}
@DeleteMapping("/{id}")
public ResponseEntity<?> deleteLocation(@PathVariable Integer id){
	Integer deletedLoc=locService.deleteLocation(id);
	if(deletedLoc!=null)
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	else
		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
}
}
