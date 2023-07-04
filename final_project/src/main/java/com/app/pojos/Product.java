package com.app.pojos;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="products")
@NoArgsConstructor
@Getter
@Setter
@ToString(exclude = {"productCategory"} )
public class Product{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="product_id")
	private Integer productId;
	@Column(name="product_name",length = 20,unique = true)
	private String productName;
//	private double price;
	private long volume;
	@ManyToOne
	@JoinColumn(name="category_id",nullable = false) //to specify FK col name
	@JsonIgnoreProperties(value = "products")
	private Category productCategory;
	
	public Product(String productName , long volume) {
		super();
		this.productName = productName;
//		this.price = price;
		this.volume=volume;
	}
		
}
