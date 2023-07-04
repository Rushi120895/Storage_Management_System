package com.app.pojos;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
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
@Table(name="warehouses")
@Getter
@Setter
@NoArgsConstructor
@ToString(exclude = {"manager","allRequests","warehouseLocation"})
public class Warehouse {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
@Column(name = "warehouse_id")
private Integer warehouseId;
@Column(name="total_capacity")
private long totalCapacity;
@Column(name="available_capacity")
private long availableCapacity;
@OneToOne
@JoinColumn(name="mgr_id")
@JsonIgnoreProperties(value="warehouse")
private GodownManager manager;
@OneToMany(mappedBy = "warehouse",cascade = CascadeType.ALL)
@JsonIgnoreProperties(value="warehouse")
private List<Request> allRequests=new ArrayList<Request>();
@OneToOne
@JoinColumn(name = "loc_id")
@JsonIgnoreProperties(value="warehouse")
private Location warehouseLocation;
}
