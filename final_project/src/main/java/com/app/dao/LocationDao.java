package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.pojos.Location;

@Repository
public interface LocationDao extends JpaRepository<Location, Integer>{

}
