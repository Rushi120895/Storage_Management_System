package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.pojos.Warehouse;
@Repository
public interface WarehouseDao extends JpaRepository<Warehouse, Integer>{

}
