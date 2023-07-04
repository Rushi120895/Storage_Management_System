package com.app.pojos;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.hibernate.annotations.FetchMode;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString(exclude= {"requestingUser","warehouse"})
public class Request {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
@Column(name="request_id")
private Integer reqId;

@Column(name = "request_type")
@Enumerated(EnumType.STRING)

private RequestType reqType;
@Enumerated(EnumType.STRING)

@Column(name="request_status",length=20)
private RequestStatus reqStatus;

@Column(name="reqd_space")
private long requiredSpace;

//@Column(name="total_rent")
//private long totalrent;

@ManyToOne
@JoinColumn(name="customer_id")
@JsonIgnoreProperties(value="userRequests")
private User requestingUser;

@ManyToOne()
@JoinColumn(name="warehouse_id",nullable=false)
@JsonIgnoreProperties(value="allrequests")
private Warehouse warehouse;

@Column(name="genereation_date")
private LocalDateTime generationDate;

@Column(name="service_date")
private LocalDate serviceDate;

@Column(name="actual_service_date")
private LocalDate actualServiceDate;

@OneToMany(mappedBy = "request",cascade = CascadeType.ALL,orphanRemoval = true)
@JsonIgnoreProperties(value = "request")
private List<RequestItem> requestItems=new ArrayList<RequestItem>();


}
