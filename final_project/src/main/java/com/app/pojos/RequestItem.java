package com.app.pojos;

import javax.annotation.Generated;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="request_item")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class RequestItem {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Integer itemId;
private int quantity;
@OneToOne
@JoinColumn(name="prod_id")
private Product requstedProduct;
@ManyToOne
@JoinColumn(name="req_id")
@JsonIgnoreProperties(value="requestItems")
private Request request;
}
