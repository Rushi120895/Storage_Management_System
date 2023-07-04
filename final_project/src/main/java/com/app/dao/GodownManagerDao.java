package com.app.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.pojos.GodownManager;
import com.app.pojos.User;

@Repository
public interface GodownManagerDao extends JpaRepository<GodownManager, Integer>{
	Optional<GodownManager> findByEmailAndPassword(String email,String password);
}
