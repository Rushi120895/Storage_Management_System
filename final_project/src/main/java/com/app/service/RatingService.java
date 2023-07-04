package com.app.service;

import java.util.List;

import com.app.pojos.Rating;





public interface RatingService {
//add B.L method for Product  validation

	
	List<Rating> getAllRating();
	
	Rating findRatingById(Integer id);
	
	Rating addRating(Rating rating);
	
	Integer deleteRating(Integer id);
	
	Rating updateRating(Integer id,Rating rating);
}
