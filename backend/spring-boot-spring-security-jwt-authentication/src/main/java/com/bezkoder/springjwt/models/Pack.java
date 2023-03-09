package com.bezkoder.springjwt.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

// import javax.persistence.*;
import java.util.List;
import java.util.ArrayList;

@Entity
public class Pack {
	
	/* --- fields --- */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String pack_name;
	private String tech_pack;
	private String sales_pack;
	
	//@OneToMany(mappedBy = "pack")
	//@JsonIgnoreProperties("pack")
	//private List<AssessmentCenter> assessmentCenters;
	/* --- End of Attributes --- */
	
	/* --- Constructors --- */
	public Pack() {
		//super();
		// TODO Auto-generated constructor stub
	}
	
	public Pack(String pack_name, String tech_pack, String sales_pack) {
		//super();
		this.pack_name = pack_name;
		this.tech_pack = tech_pack;
		this.sales_pack = sales_pack;
	}
	/* --- End of Constructors --- */
	
	
	/* --- Getters and setters --- */
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getPack_name() {
		return pack_name;
	}
	public void setPack_name(String pack_name) {
		this.pack_name = pack_name;
	}
	public String getTech_pack() {
		return tech_pack;
	}
	public void setTech_pack(String tech_pack) {
		this.tech_pack = tech_pack;
	}
	public String getSales_pack() {
		return sales_pack;
	}
	public void setSales_pack(String sales_pack) {
		this.sales_pack = sales_pack;
	}
	/* --- End of Getters and setters --- */
}
