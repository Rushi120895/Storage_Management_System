package com.app.service;

import java.util.List;
import java.util.Optional;

import com.app.pojos.Request;

public interface RequestService {
 Request createRequest(Request request);
 
 Integer deleteRequest(Integer id);
 
 List<Request> findAll();
 
 Request findById(Integer id);
 
 List<Request> findRequestByUser(Integer id);
 
 List<Request> findRequestByWareouse(Integer id);
 
 Request approveRequest(Integer id);
 int rentOfRequest(Integer id);
 int volOfRequest( Integer rid);
 
 Request declineRequest(Integer id);
 
 List<Request> allApprovedRequests();
 List<Request> allPendingRequests();
 List<Request> allDeclinedRequests();

//Request updateRequest(Integer id, Request request);
}
