package com.app.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.CategoryDao;
import com.app.dto.CategoryDto;
import com.app.pojos.Category;
import com.app.pojos.User;

@Service 
@Transactional 
public class CategoryServiceImpl implements CategoryService {
	
	@Autowired
	private CategoryDao categoryDao;
	
	@Autowired
	ModelMapper modelMapper;


	@Override
	public List<Category> getAllCategories() {
		List<Category> allCategories=categoryDao.findAll();
		return allCategories;
	}

	@Override
	public Category findCategoryById(Integer id) {
		// TODO Auto-generated method stub
		Optional<Category> foundCategory =categoryDao.findById(id);
		Category category=  foundCategory.orElseThrow(()->new ResourceNotFoundException("Invalid ID!"));
		return category;
	}

	@Override
	public Category addCategory(Category category) {
		// TODO Auto-generated method stub
		Category newCategory = categoryDao.save(category);
		return newCategory;
	}

	@Override
	public Integer deleteCategory(Integer id) {
		if(categoryDao.existsById(id)) {
			categoryDao.deleteById(id);
			return id;
		}
			
		return null;
	}

	@Override
	public Category updateCategory(Integer id, Category category) {
		// find user By id
		Optional<Category> foundCategory = categoryDao.findById(id);
		Category existingCategory=foundCategory.orElse(null);
		// check user exist or not
		if(existingCategory != null){
			existingCategory.setCategoryName(category.getCategoryName());
			existingCategory.setDescription(category.getDescription());
			existingCategory.setProducts(category.getProducts());
	return categoryDao.save(existingCategory);
			}
		return null;
	}
	
//	public Category dtoToPojo(CategoryDto categoryDto) {
//	return this.modelMapper.map(categoryDto,Category.class);
//	}
//
//public CategoryDto PojoToDto(Category category) {
//	return this.modelMapper.map(category, CategoryDto.class);
//}
//
//
//@Override
//public List<CategoryDto> getAllCategories() {
//	List<Category> allCategories=categoryDao.findAll();
//	return allCategories.stream().map(category->PojoToDto(category)).collect(Collectors.toList());
//}
//
//
//@Override
//public CategoryDto findCategoryById(Integer id) {
//	Optional<Category> foundCategory=categoryDao.findById(id);
//	Category category=foundCategory.orElseThrow(()->new ResourceNotFoundException("Category not found"));
//	return this.modelMapper.map(category, CategoryDto.class);
//}
//
//
//@Override
//public CategoryDto addCategory(CategoryDto categoryDto) {
//	Category category=dtoToPojo(categoryDto);
//	Category saved=categoryDao.save(category);
//	return PojoToDto(saved);
//}
//
//
//@Override
//public Integer deleteCategory(Integer id) {
//	Category category=categoryDao.findById(id).orElseThrow(()->new ResourceNotFoundException("Category not found"));
//	categoryDao.delete(category);
//	return id;
//}
//
//
//@Override
//public CategoryDto updateCategory(Integer id, CategoryDto categoryDto) {
//	Category category=categoryDao.findById(id).orElseThrow(()->new ResourceNotFoundException("Invalid Category"));
//	category.setCategoryName(categoryDto.getCategoryName());
//	category.setDescription(categoryDto.getDescription());
//	return PojoToDto(categoryDao.save(category));
//}
}
