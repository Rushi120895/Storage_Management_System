package com.app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.GodownManagerDao;
import com.app.dao.WarehouseDao;
import com.app.pojos.Location;
import com.app.pojos.Warehouse;



@Service 
@Transactional 
public class WarehouseServiceImpl implements WarehouseService {
	@Autowired
	private WarehouseDao warehouseDao;
	
	@Autowired GodownManagerDao mgrDao;
	
	@Override
	public List<Warehouse> getAllWarehouse() {
		List<Warehouse> allWarehouse=warehouseDao.findAll();
		return allWarehouse;
	}

	@Override
	public Warehouse findWarehouseById(Integer id) {
		Optional<Warehouse> foundWarehouse = warehouseDao.findById(id);
		Warehouse existingWarehouse =foundWarehouse.orElseThrow(()->new ResourceNotFoundException("Invalid ID!"));
		return existingWarehouse;
	}

	@Override
	public Warehouse addWarehouse(Warehouse warehouse) {
		// TODO Auto-generated method stub
		
		Warehouse newWarehouse=warehouseDao.save(warehouse);
		return newWarehouse;
	}

	@Override
	public Integer deleteWarehouse(Integer id) {
		if(warehouseDao.existsById(id)) {
			warehouseDao.deleteById(id);
			return id;
		}
		return null;
	}

	@Override
	public Warehouse updateWarehouse(Integer id, Warehouse warehouse) {
		// TODO Auto-generated method stub
		Optional<Warehouse> foundWarehouse = warehouseDao.findById(id);
		Warehouse existingWarehouse =foundWarehouse.orElse(null);
		if(existingWarehouse !=null) {
			existingWarehouse.setAllRequests(warehouse.getAllRequests());
			existingWarehouse.setAvailableCapacity(warehouse.getAvailableCapacity());
			existingWarehouse.setManager(warehouse.getManager());
			existingWarehouse.setTotalCapacity(warehouse.getAvailableCapacity());
			existingWarehouse.setWarehouseLocation(warehouse.getWarehouseLocation());
			return warehouseDao.save(existingWarehouse);
		}
		return null;
	}

	@Override
	public Warehouse findWareHouseByManager(Integer id) {
		List<Warehouse> allWarehouses=warehouseDao.findAll();
		for (Warehouse warehouse : allWarehouses) {
			if(warehouse.getManager().getMgrId()==id)
				return warehouse;
		}
		return null;
	}

	@Override
	public Warehouse addLocation(Integer id,Location location) {
		Warehouse warehouse=warehouseDao.findById(id).orElseThrow(()->new ResourceNotFoundException("Warehouse does not exist"));
		warehouse.setWarehouseLocation(location);
		return warehouse;
	}

	@Override
	public Warehouse assignManager(Integer id, Integer id1) {
		Warehouse unassigned=warehouseDao.findById(id).orElseThrow(()->new ResourceNotFoundException("invalid Warehouse"));
		unassigned.setManager(mgrDao.findById(id1).orElseThrow(()->new ResourceNotFoundException("Invalid manager")));
		
		return unassigned;
	}
	



}
