package com.app.service;

import java.util.List;


import com.app.pojos.Product;


public interface ProductService {
//add B.L method for Product  validation

	
	List<Product> getAllProducts();
	
	Product findProductById(Integer id);
	
	Product addProduct(Product product);
	
	Integer deleteProduct(Integer id);
	
	Product updateProduct(Integer id,Product product);
}
