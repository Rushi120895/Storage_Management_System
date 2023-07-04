package com.app.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.apache.jasper.tagplugins.jstl.core.ForEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.pojos.Request;
import com.app.pojos.RequestItem;
import com.app.pojos.RequestStatus;
import com.app.service.RequestItemService;
import com.app.service.RequestService;
import com.app.service.UserService;
import com.app.service.WarehouseService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/user/request")
public class RequestController {
	
	@Autowired
	private RequestService reqService;
	@Autowired
	private UserService userService;
	@Autowired
	private WarehouseService warehouseService;
	@Autowired
	private RequestItemService reqItemService;
	

@GetMapping("/allrequests/{id}")
public List<Request> getAllRequests(@PathVariable Integer id){
	List<Request> allRequests=reqService.findRequestByUser(id);
	return allRequests;
}
@PostMapping("/allrequests/{id}/createrequest/{wid}")
public int createRequest(@RequestBody Request request, @PathVariable Integer id,@PathVariable(name="wid") Integer id1){
	request.setReqStatus(RequestStatus.PENDING);
	request.setWarehouse(warehouseService.findWarehouseById(id1));
	request.setGenerationDate(LocalDateTime.now());
	request.setRequestingUser(userService.findCustomerById(id));
//	request.setTotalrent(reqService.rentOfRequest(request));
//	request.setRequestItems(reqItems);
	Request newRequest=reqService.createRequest(request);
	reqItemService.setRequestId(newRequest);
	//newRequest.setTotalrent(reqService.rentOfRequest(newRequest.getReqId()));
	return reqService.rentOfRequest(newRequest.getReqId());
}
@DeleteMapping("/allrequests/{id}/deleterequest/{rid}")
public ResponseEntity<?> deleteRequest(@PathVariable Integer id,@PathVariable(name="rid") Integer id1){
	List<Request> allRequests=reqService.findRequestByUser(id);
	Request reqTobeDeleted=new Request();
	for (Request request : allRequests) {
		if(request.getReqId()==id1)
			reqTobeDeleted=request;
	}
	Integer deletedReq=reqService.deleteRequest(reqTobeDeleted.getReqId());
	if(deletedReq!=null)
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	else
		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();			
}
}
