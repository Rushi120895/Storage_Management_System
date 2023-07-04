package com.app.controller;

import java.util.List;

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

import com.app.dto.CategoryDto;
import com.app.pojos.Category;
import com.app.pojos.Request;
import com.app.service.CategoryService;
import com.app.service.RequestService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/user/category")
public class CategoryController {
	
	@Autowired
	private CategoryService categoryService;

@GetMapping("/allcategories")
public List<Category> getAllRequests(){
	List<Category> allCategories=categoryService.getAllCategories();
	return allCategories;
}

}

