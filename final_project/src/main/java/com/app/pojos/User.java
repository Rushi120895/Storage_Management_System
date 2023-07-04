package com.app.pojos;
/*
 * userId (PK) ,first name,last name , email,password,confirmPassword,role(enum), regAmount;
	 LocalDate/Date regDate;
	 byte[] image;
 */

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
//will be importing all annotations from this pkg
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity 
@Table(name = "users_tbl")
@NoArgsConstructor
@Getter
@Setter
@ToString(exclude= {"allWarehouses","userLocation","customerRating","userRequests"})
public class User{
	@Id	
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer  userId;
	@Column(name = "user_name", length = 20)
	private String userName; 
	@Column(length = 25, nullable=false,unique=true)
	private String email;
	@Column(length = 20, nullable = false)
	private String password;
	@Enumerated(EnumType.STRING)
	@Column(name = "user_role", length = 30)
	private Role userRole;
	@Column(name="mob_no",length = 10)
	private String mobileNo;
	@OneToMany
	@JoinTable(name="admin_warehouse",joinColumns=@JoinColumn(name="warehouse_id"),inverseJoinColumns = @JoinColumn(name="admin_id"))
	private List<Warehouse> allWarehouses=new ArrayList<Warehouse>();
	@OneToOne
	@JoinColumn(name="loc_id")
	@JsonIgnoreProperties(value="user")
	private Location userLocation;
	@OneToOne(mappedBy = "user",cascade = CascadeType.ALL,orphanRemoval = true,fetch = FetchType.LAZY)
	@JsonIgnoreProperties(value="user")
	private Rating customerRating;
	@OneToMany(mappedBy = "requestingUser",cascade = CascadeType.ALL,orphanRemoval = true)
	@JsonIgnoreProperties(value="requestingUser")
	private List<Request> userRequests=new ArrayList<Request>();
}
