package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.RequestItemDao;
import com.app.pojos.Request;
import com.app.pojos.RequestItem;
@Service
@Transactional
public class RequestItemServiceImpl implements RequestItemService{
	
	@Autowired
	private RequestItemDao reqItemDao;

	@Override
	public void setRequestId(Request request) {
		List<RequestItem> allitems=request.getRequestItems();
		for (RequestItem requestItem : allitems) {
			requestItem.setRequest(request);
		}
	}

}
