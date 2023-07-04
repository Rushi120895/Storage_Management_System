package com.app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.LocationDao;
import com.app.pojos.Location;



@Service 
@Transactional 
public class LocationServiceImpl implements LocationService {
	
	@Autowired
	private LocationDao locationDao;


	@Override
	public List<Location> getAllLocation() {
		List<Location> allLocation=locationDao.findAll();
		return allLocation;
	}

	@Override
	public Location findLocationById(Integer id) {
		// TODO Auto-generated method stub
		Optional<Location> foundGodownManager =locationDao.findById(id);
		Location godownManager=  foundGodownManager.orElseThrow(()->new ResourceNotFoundException("Invalid ID!"));
		return godownManager;
	}

	@Override
	public Location addLocation(Location location) {
		// TODO Auto-generated method stub
		Location newLocation = locationDao.save(location);
		return newLocation;
	}

	@Override
	public Integer deleteLocation(Integer id) {
		if(locationDao.existsById(id)) {
			locationDao.deleteById(id);
			return id;
		}
			
		return null;
	}

	@Override
	public Location updateLocation(Integer id, Location location) {
		// find user By id
		Optional<Location> foundLocation = locationDao.findById(id);
		Location existingLocation=foundLocation.orElse(null);
		// check user exist or not
		if(existingLocation != null){
			existingLocation.setLine1(location.getLine1());
			existingLocation.setLine2(location.getLine2());
			existingLocation.setCity(location.getCity());
			existingLocation.setState(location.getState());
			existingLocation.setPincode(location.getPincode());
			existingLocation.setType(location.getType());
			existingLocation.setUser(location.getUser());
			existingLocation.setWarehouse(location.getWarehouse());
	return locationDao.save(existingLocation);
			}
		return null;
	}

}
