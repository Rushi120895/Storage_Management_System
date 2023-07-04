package com.app.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.RequestDao;
import com.app.pojos.Request;
import com.app.pojos.RequestItem;
import com.app.pojos.RequestStatus;
@Service
@Transactional
public class RequestServiceImpl implements RequestService
{
	@Autowired
	private RequestDao reqDao;
	@Override
	public Request createRequest(Request request) {
		Request newRequest=reqDao.save(request);
		return newRequest;
	}

	@Override
	public Integer deleteRequest(Integer id) {
		if(reqDao.existsById(id)) {
			reqDao.deleteById(id);
			return id;
		}
		return null;
	}

	@Override
	public List<Request> findAll() {
		List<Request> allRequests=reqDao.findAll();
		return allRequests;
	}

	@Override
	public Request findById(Integer id) {
		Optional<Request> foundRequest=reqDao.findById(id);
		Request req=foundRequest.orElseThrow(()->new ResourceNotFoundException("Request does not exist"));
		return req;
	}

	@Override
	public List<Request> findRequestByUser(Integer id) {
		List<Request> allRequests=reqDao.findAll();
		List<Request> usersRequests=new ArrayList<Request>();
		for (Request request : allRequests) {
			if(request.getRequestingUser().getUserId()==id)
				usersRequests.add(request);	
		}
		return usersRequests;
	}

	@Override
	public List<Request> findRequestByWareouse(Integer id) {
		List<Request> allRequests=reqDao.findAll();
		List<Request> foundRequests=new ArrayList<Request>();
		for (Request request : allRequests) {
			if(request.getWarehouse().getWarehouseId()==id)
				foundRequests.add(request);
		}
		return foundRequests;
	}

	@Override
	public Request approveRequest(Integer id) {
		Request request=reqDao.findById(id).orElseThrow(()->new ResourceNotFoundException("Invalid"));
		request.setReqStatus(RequestStatus.APPROVED);
		long totalCapacity=request.getWarehouse().getTotalCapacity();
		request.getWarehouse().setAvailableCapacity(totalCapacity-volOfRequest(id));
		System.out.println(volOfRequest(id));
		System.out.println(request.getWarehouse().getAvailableCapacity());
		return request;
	}

	@Override
	public Request declineRequest(Integer id) {
		Request request=reqDao.findById(id).orElseThrow(()->new ResourceNotFoundException("Invalid"));
		request.setReqStatus(RequestStatus.DECLINED);
		return request;
	}

	@Override
	public List<Request> allApprovedRequests() {
		List<Request> allRequests=reqDao.findAll();
		List<Request> approvedRequests=new ArrayList<Request>();
		for (Request request : allRequests) {
			if(request.getReqStatus().equals(RequestStatus.valueOf("APPROVED"))) {
			approvedRequests.add(request);
			System.out.println(request.getReqStatus());
			}
		}
		return approvedRequests;
	}

	@Override
	public List<Request> allPendingRequests() {
		List<Request> allRequests=reqDao.findAll();
		List<Request> pendingRequests=new ArrayList<Request>();
		for (Request request : allRequests) {
			if(request.getReqStatus().equals(RequestStatus.valueOf("PENDING"))) {
			pendingRequests.add(request);
			System.out.println(request.getReqStatus());
			}
		}
		return pendingRequests;
	
	}

	@Override
	public List<Request> allDeclinedRequests() {
		List<Request> allRequests=reqDao.findAll();
		List<Request> declinedRequests=new ArrayList<Request>();
		for (Request request : allRequests) {
			if(request.getReqStatus().equals(RequestStatus.valueOf("DECLINED"))) {
			declinedRequests.add(request);
			System.out.println(request.getReqStatus());
		}
			}
		return declinedRequests;
		
	}

	@Override
	public int rentOfRequest(Integer id) {

		int rent=0;
		Request request=reqDao.findById(id).orElseThrow(()->new ResourceNotFoundException("Request Not Found"));
		if(request !=null) {
		rent=volOfRequest(id)*2;
		}
		return rent;
	}

	@Override
	public int volOfRequest(Integer rid) {
		int totalVolume=0;
		
		Request request=reqDao.findById(rid).orElseThrow(()->new ResourceNotFoundException("Request Not Found"));
		if(request !=null) {
		List<RequestItem> allRequestItems=request.getRequestItems();
		for (RequestItem requestItem : allRequestItems) {
			totalVolume=(int) (totalVolume+(requestItem.getRequstedProduct().getVolume()*requestItem.getQuantity()));
		}
		}
		return totalVolume;
	}

//	@Override
//	public Request updateRequest(Integer id,Request request) {
//		Optional<Request> foundereq=reqDao.findById(id);
//		Request existingRequest=foundereq.orElse(null);
//		if(existingRequest!=null) {
//			
//		}
//		return null;
//	}

}
