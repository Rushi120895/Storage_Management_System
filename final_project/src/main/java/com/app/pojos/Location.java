package com.app.pojos;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "locations")
@Getter
@Setter
@NoArgsConstructor
@ToString(exclude= {"user","warehouse"})
public class Location {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
@Column(name="loc_id")
private Integer locId;
@Column(length=100)
private String line1;
@Column(length=100)
private String line2;
@Column(length=20)
private String state;
@Column(length=20)
private String city;
private int pincode;
@Enumerated(EnumType.STRING)
@Column(name="address_type")
private AddressType type;
@OneToOne(mappedBy = "userLocation",cascade = CascadeType.ALL)
@JsonIgnoreProperties(value="userLocation")
private User user;
@OneToOne(mappedBy="warehouseLocation",cascade = CascadeType.ALL)
@JsonIgnoreProperties(value="warehouseLocation")
private Warehouse warehouse; 
}
