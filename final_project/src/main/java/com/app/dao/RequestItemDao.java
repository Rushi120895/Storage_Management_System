package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.RequestItem;

public interface RequestItemDao extends JpaRepository<RequestItem, Integer>{

}
