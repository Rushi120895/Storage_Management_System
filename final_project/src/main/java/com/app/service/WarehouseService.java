package com.app.service;

import java.util.List;

import com.app.pojos.Location;
import com.app.pojos.Warehouse;




public interface WarehouseService {
//add B.L method for category validation

	
	List<Warehouse> getAllWarehouse();
	
	Warehouse findWarehouseById(Integer id);
	Warehouse findWareHouseByManager(Integer id);
	
	Warehouse addWarehouse(Warehouse warehouse);
	
	Integer deleteWarehouse(Integer id);
	
	Warehouse updateWarehouse(Integer id,Warehouse warehouse);
	
	Warehouse addLocation(Integer id,Location location);
	Warehouse assignManager(Integer id,Integer id1);
}
