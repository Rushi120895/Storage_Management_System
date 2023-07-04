package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.pojos.Rating;

@Repository
public interface RatingDao extends JpaRepository<Rating, Integer>{

}
