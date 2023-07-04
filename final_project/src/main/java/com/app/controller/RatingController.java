package com.app.controller;

import java.util.List;

import javax.persistence.SqlResultSetMapping;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.pojos.Rating;
import com.app.service.RatingService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/rating")
public class RatingController {

@Autowired
private RatingService ratingService;

@GetMapping("/allratings")
public List<Rating> getAllRatings() {
	return ratingService.getAllRating();
}

@PostMapping()
public Rating addRating(@RequestBody Rating rating) {
return ratingService.addRating(rating);
}
@PutMapping("/{id}")
public Rating updateRating(@PathVariable Integer id,@RequestBody Rating rating) {
	return ratingService.updateRating(id, rating);
}
@DeleteMapping("/{id}")
public ResponseEntity<?> deleteRating(@PathVariable Integer id){
	Integer deletedRating=ratingService.deleteRating(id);
	if(deletedRating!=null)
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	else
		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
}

}
