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

import com.app.pojos.Product;
import com.app.service.ProductService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/product")
public class ProductController {
	
	@Autowired
	private ProductService prodService;
	@GetMapping("/allproducts")
	public List<Product> getAllProducts(){
		return prodService.getAllProducts();
	}
	
	@GetMapping("/{id}")
	public Product getProductById(@PathVariable Integer id) {
		return prodService.findProductById(id);
	}
	@PostMapping
	public Product addProduct(@RequestBody Product product) {
		return prodService.addProduct(product);
	}
	@PutMapping("/{id}")
	public Product updateProduct(@PathVariable Integer id,@RequestBody Product product) {
		return prodService.updateProduct(id, product);
	} 
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteProduct(@PathVariable Integer id) {
	Integer deletedProd=prodService.deleteProduct(id);
	if (deletedProd!=null)
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	else
		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}
	}

