package com.app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.GodownManagerDao;
import com.app.pojos.GodownManager;
import com.app.pojos.User;

@Service 
@Transactional 
public class GodownManagerServiceImpl implements GodownManagerService {
	
	@Autowired
	private GodownManagerDao godownManagerDao;


	@Override
	public List<GodownManager> getAllGodownManager() {
		List<GodownManager> allGodownManager=godownManagerDao.findAll();
		return allGodownManager;
	}

	@Override
	public GodownManager findGodownManagerById(Integer id) {
		// TODO Auto-generated method stub
		Optional<GodownManager> foundGodownManager =godownManagerDao.findById(id);
		GodownManager godownManager=  foundGodownManager.orElseThrow(()->new ResourceNotFoundException("Invalid ID!"));
		return godownManager;
	}

	@Override
	public GodownManager addGodownManager(GodownManager godownManager) {
		// TODO Auto-generated method stub
		GodownManager newGodownManager = godownManagerDao.save(godownManager);
		return newGodownManager;
	}

	@Override
	public Integer deleteGodownManager(Integer id) {
		if(godownManagerDao.existsById(id)) {
			godownManagerDao.deleteById(id);
			return id;
		}
			
		return null;
	}

	@Override
	public GodownManager updateGodownManager(Integer id, GodownManager godownManager) {
		// find user By id
		Optional<GodownManager> foundGodownManager = godownManagerDao.findById(id);
		GodownManager existingGodownManager=foundGodownManager.orElse(null);
		// check user exist or not
		if(existingGodownManager != null){
			existingGodownManager.setMgrName(godownManager.getMgrName());
			existingGodownManager.setEmail(godownManager.getEmail());  
			existingGodownManager.setPassword(godownManager.getPassword());
			existingGodownManager.setWarehouse(godownManager.getWarehouse());
	return godownManagerDao.save(existingGodownManager);
			}
		return null;
	}

	@Override
	public GodownManager authenticateManager(String em, String pass) {
		GodownManager mgr =godownManagerDao.findByEmailAndPassword(em, pass)
				.orElseThrow(() -> 
				new ResourceNotFoundException("Invalid credentials !! , User not found!!!!"));
		return mgr;
	}
	}


