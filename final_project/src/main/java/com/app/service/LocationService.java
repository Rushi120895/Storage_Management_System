package com.app.service;

import java.util.List;

import com.app.pojos.Location;



public interface LocationService {
//add B.L method for Product  validation

	
	List<Location> getAllLocation();
	
	Location findLocationById(Integer id);
	
	Location addLocation(Location location);
	
	Integer deleteLocation(Integer id);
	
	Location updateLocation(Integer id,Location location);
}
