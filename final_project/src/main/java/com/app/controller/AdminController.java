package com.app.controller;

import java.util.ArrayList;
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

import com.app.pojos.AddressType;
import com.app.pojos.Category;
import com.app.pojos.GodownManager;
import com.app.pojos.Location;
import com.app.pojos.Product;
import com.app.pojos.Request;
import com.app.pojos.RequestStatus;
import com.app.pojos.RequestType;
import com.app.pojos.User;
import com.app.pojos.Warehouse;
import com.app.service.CategoryService;
import com.app.service.GodownManagerService;
import com.app.service.LocationService;
import com.app.service.ProductService;
import com.app.service.RequestService;
import com.app.service.UserService;
import com.app.service.WarehouseService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/admin")
public class AdminController {

	@Autowired
	private UserService userService;
	@Autowired
	private WarehouseService warehouseService;
	@Autowired
	private RequestService reqService;
	@Autowired
	private GodownManagerService mgrService;
	@Autowired
	private CategoryService categoryService;
	@Autowired
	private ProductService prodService;
	@Autowired
	private LocationService locservice;

//REQUEST FUNCTIONALITIES

@GetMapping("/allrequests")
public List<Request> allRequests(){
	return reqService.findAll();
}

@GetMapping("/allpendingrequests")
public List<Request> allPendingRequests(){
	return reqService.allPendingRequests();
}
@GetMapping("/allapprovedrequests")
public List<Request> approvedRequests(){
	return reqService.allApprovedRequests();
}
@GetMapping("/alldeclinedrequests")
public List<Request> allDeclineRequests(){
	return reqService.allDeclinedRequests();
}
@PutMapping("/allrequests/approve/{id}")
public Request approveRequest(@PathVariable Integer id) {
	return reqService.approveRequest(id);
}
@PutMapping("/allrequests/decline/{id}")
public Request declineRequest(@PathVariable Integer id) {
	return reqService.declineRequest(id);	
}

//WAREHOUSE FUNCTIONALITIES

@GetMapping("/allwarehouse")
public List<Warehouse> allWarehouse(){
	return warehouseService.getAllWarehouse();
}
@PostMapping("/allwarehouse/addwarehouse")
	public Warehouse addWarehouse(@RequestBody Warehouse warehouse) {
	return warehouseService.addWarehouse(warehouse);
}
 @PutMapping("/allwarehouse/updatewarehouse/{id}")
 public Warehouse updateWarehouse(@PathVariable Integer id,@RequestBody Warehouse warehouse) {
	 return warehouseService.updateWarehouse(id, warehouse);
 }
 
 @GetMapping("/nomanagerwarehouse")
 public List<Warehouse> unassignedWarehouses(){
	 List<Warehouse> allwarehouses=warehouseService.getAllWarehouse();
	 List<Warehouse> unassigned=new ArrayList<Warehouse>();
	 for (Warehouse warehouse : allwarehouses) {
		if(warehouse.getManager()==null)
			unassigned.add(warehouse);
	}
	 return unassigned;
 }
 @GetMapping("/nomanagerwarehouse/{id}/assignmanager")
 public List<GodownManager> unassignedManagers(){
	 List<GodownManager> allManagers=mgrService.getAllGodownManager();
	 List<GodownManager> unassigned=new ArrayList<GodownManager>();
	 for (GodownManager godownManager : allManagers) {
		if(godownManager.getWarehouse()==null)
			System.out.println(godownManager.getWarehouse().toString());
			unassigned.add(godownManager);
	}
	 return unassigned;
 }
 @PutMapping("/nomanagerwarehouse/{id}/assignmanager/{mgrid}")
 public Warehouse assignManager(@PathVariable Integer id,@PathVariable(name="mgrid")Integer id1) {
	 return warehouseService.assignManager(id, id1);
 }
 
@DeleteMapping("/allwarehouse/deletewarehouse/{id}")
public ResponseEntity<?> deleteWarehouse(@PathVariable Integer id){
	Integer deletedWarehouse=warehouseService.deleteWarehouse(id);
	if(deletedWarehouse!=null)
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	else
		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
}
@PutMapping("/allwarehouse/{id}/addlocation")
public Warehouse addLocation(@RequestBody Location location,@PathVariable Integer id) {
	Location newLocation=locservice.addLocation(location);
	newLocation.setType(AddressType.WAREHOUSE);
	Warehouse warehouse=warehouseService.addLocation(id, newLocation);
	return warehouse;
}


//CATEGORY FUNCTIONALITIES

@GetMapping("/allcategories")
public List<Category> allCategories(){
	return categoryService.getAllCategories();
}

@PostMapping("/allcategories/addcategory")
public Category addCategory(@RequestBody Category category) {
	Category newCategory=categoryService.addCategory(category);
	return newCategory;
}

@DeleteMapping("/allcategories/deletecategory/{id}")
public ResponseEntity<?> deleteCategory(@PathVariable Integer id){
	Integer deletedCategory=categoryService.deleteCategory(id);
	if(deletedCategory!=null)
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	else
		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();			
}

@PutMapping("/allcategories/updatecategory/{id}")
public Category updateCategory(@PathVariable Integer id,@RequestBody Category category) {
	return categoryService.updateCategory(id, category);
}
//PRODUCT FUNCTIONALITIES

@GetMapping("/allcategories/{id}/allproducts")
public List<Product> getAllProductsBycategory(@PathVariable Integer id){
	Category foundCategory=categoryService.findCategoryById(id);
	return foundCategory.getProducts();
}

@GetMapping("/{id}")
public Product getProductById(@PathVariable Integer id) {
	return prodService.findProductById(id);
}
@PostMapping("/allcategories/{id}/allproducts/addproduct")
public Product addProduct(@RequestBody Product product,@PathVariable Integer id) {
	product.setProductCategory(categoryService.findCategoryById(id));
	return prodService.addProduct(product);
}
@PutMapping("/allcategories/{cid}/allproducts/updateproduct/{pid}")
public Product updateProduct(@PathVariable(name="pid") Integer id,@PathVariable(name="cid") Integer id1,@RequestBody Product product) {
	product.setProductCategory(categoryService.findCategoryById(id1));
	return prodService.updateProduct(id, product);
} 

@DeleteMapping("/allcategories/{id}/allproducts/deleteproduct/{pid}")
public ResponseEntity<?> deleteProduct(@PathVariable(name="pid") Integer id) {
Integer deletedProd=prodService.deleteProduct(id);
if (deletedProd!=null)
	return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
else
	return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
}

//MANAGER FUNCTIONALITIES

@GetMapping("/allmanagers")
public List<GodownManager> allManagers(){
	return mgrService.getAllGodownManager();
}
@PostMapping("/allmanagers/addmanager")
public GodownManager addManager(@RequestBody GodownManager manager) {
	return mgrService.addGodownManager(manager);
}

@DeleteMapping("/allmanagers/deletemanager/{id}")
public ResponseEntity<?> deleteManager(@PathVariable Integer id){
	Integer deletedManager=mgrService.deleteGodownManager(id);
	if(deletedManager!=null)
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	else 
		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}

//USER FUNCTIONALITIES

@GetMapping("/allusers")
public List<User> allCustomers(){
	return userService.getAllCustomers();
}

@DeleteMapping("/allusers/deleteuser/{id}")
public ResponseEntity<?> deleteUser(@PathVariable Integer id){
	Integer deletedCustomerId=userService.deleteCustomer(id);
	if(deletedCustomerId!=null)
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	else
		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
}
}
