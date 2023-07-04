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

import com.app.pojos.Warehouse;
import com.app.service.WarehouseService;

@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/user/warehouse")
@RestController
public class WarehouseController {
	
	@Autowired
	private WarehouseService warehouseService;
@GetMapping("/allwarehouse")
public List<Warehouse> getAllWarehouse(){
	return warehouseService.getAllWarehouse();
}
}
