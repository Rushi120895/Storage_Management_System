package com.app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.ProductDao;
import com.app.pojos.Product;

@Service 
@Transactional 
public class ProductServiceImpl implements ProductService {
	@Autowired
	private ProductDao productDao;
	@Override
	public List<Product> getAllProducts() {
		// TODO Auto-generated method stub
		List<Product> allProducts=productDao.findAll();
		
//		return allProducts;
		return allProducts;
	}

	@Override
	public Product findProductById(Integer id) {
		// TODO Auto-generated method stub
		Optional<Product> foundProduct = productDao.findById(id);
		Product existingProduct =foundProduct.orElseThrow(()->new ResourceNotFoundException("Invalid ID!"));
		return existingProduct;
	}

	@Override
	public Product addProduct(Product product) {
		// TODO Auto-generated method stub
		
		Product newProduct=productDao.save(product);
		return newProduct;
	}

	@Override
	public Integer deleteProduct(Integer id) {
		// TODO Auto-generated method stub
		
		if(productDao.existsById(id)) {
			productDao.deleteById(id);
			return id;
		}
		return null;
	}

	@Override
	public Product updateProduct(Integer id, Product product) {
		// TODO Auto-generated method stub
		Optional<Product> foundProduct = productDao.findById(id);
		Product existingProduct =foundProduct.orElse(null);
		if(existingProduct !=null) {
			existingProduct.setProductCategory(product.getProductCategory());
			existingProduct.setProductName(product.getProductName());
			existingProduct.setVolume(product.getVolume());
			return productDao.save(existingProduct);
		}
		return null;
	}
	



}
