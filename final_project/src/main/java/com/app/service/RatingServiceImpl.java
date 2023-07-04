package com.app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.RatingDao;
import com.app.pojos.Rating;





@Service 
@Transactional 
public class RatingServiceImpl implements RatingService {
	
	@Autowired
	private RatingDao ratingDao;


	@Override
	public List<Rating> getAllRating() {
		List<Rating> allRating=ratingDao.findAll();
		return allRating;
	}

	@Override
	public Rating findRatingById(Integer id) {
		// TODO Auto-generated method stub
		Optional<Rating> foundRating =ratingDao.findById(id);
		Rating rating=  foundRating.orElseThrow(()->new ResourceNotFoundException("Invalid ID!"));
		return rating;
	}

	@Override
	public Rating addRating(Rating rating) {
		// TODO Auto-generated method stub
		Rating newRating = ratingDao.save(rating);
		return newRating;
	}

	@Override
	public Integer deleteRating(Integer id) {
		if(ratingDao.existsById(id)) {
			ratingDao.deleteById(id);
			return id;
		}
			
		return null;
	}

	@Override
	public Rating updateRating(Integer id, Rating rating) {
		// find user By id
		Optional<Rating> foundRating = ratingDao.findById(id);
		Rating existingRating=foundRating.orElse(null);
		// check user exist or not
		if(existingRating != null){
			existingRating.setRating(rating.getRating());
			existingRating.setUser(rating.getUser());
			
	return ratingDao.save(existingRating);
			}
		return null;
	}

}
