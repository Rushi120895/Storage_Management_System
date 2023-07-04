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

import com.app.pojos.GodownManager;
import com.app.pojos.Request;
import com.app.pojos.User;
import com.app.pojos.Warehouse;
import com.app.service.GodownManagerServiceImpl;
import com.app.service.RequestService;
import com.app.service.WarehouseService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/manager")
public class ManagerController {

	@Autowired
	private GodownManagerServiceImpl mgrService;
	@Autowired
	private WarehouseService warehouseService;
//	@Autowired
//	private RequestService reqSservice;
	
	@PutMapping("/update/{id}")
	public GodownManager updateManager(@PathVariable Integer id,@RequestBody GodownManager manager) {
		return mgrService.updateGodownManager(id, manager);
	}
	
	@GetMapping("/{id}/mywarehouse")
	public Warehouse myWarehouse(@PathVariable Integer id) {
		return warehouseService.findWareHouseByManager(id);
	}
	@PostMapping("/auth")
	public GodownManager authenticateUser(@RequestBody User user) {
		System.err.println("User Validated");
			return mgrService.authenticateManager(user.getEmail(), user.getPassword());
	}
	@GetMapping("/{id}/mywarehouse/allrequests")
	public List<Request> allRequests(@PathVariable Integer id){
		return warehouseService.findWareHouseByManager(id).getAllRequests();
	}
}
