package com.app.service;

import java.util.List;

import com.app.pojos.Category;
import com.app.pojos.GodownManager;
import com.app.pojos.User;


public interface GodownManagerService {
//add B.L method for category validation
	GodownManager authenticateManager(String em,String pass);
	
	List<GodownManager> getAllGodownManager();
	
	GodownManager findGodownManagerById(Integer id);
	
	GodownManager addGodownManager(GodownManager godownManager);
	
	Integer deleteGodownManager(Integer id);
	
	GodownManager updateGodownManager(Integer id,GodownManager godownManager);
}
