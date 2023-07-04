package com.app.pojos;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString(exclude="warehouse")
@Table(name="godown_managers")
public class GodownManager {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "mgr_id")
	private Integer mgrId;
	@Column(name="mgr_name",length = 20)
	private String mgrName;
	@Column(name="mgr_email",length = 50)
	private String email;
	@Column(name="mgr_pass",length = 50)
	private String password;
	@OneToOne(mappedBy = "manager",cascade = CascadeType.ALL)
	@JsonIgnoreProperties(value="manager")
	private Warehouse warehouse;
}
