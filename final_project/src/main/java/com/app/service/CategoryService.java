package com.app.service;

import java.util.List;

import com.app.dto.CategoryDto;
import com.app.pojos.Category;


public interface CategoryService {
//add B.L method for category validation

	
	List<Category> getAllCategories();
	
	Category findCategoryById(Integer id);
	
	Category addCategory(Category category);
	
	Integer deleteCategory(Integer id);
	
	Category updateCategory(Integer id,Category category);
}
