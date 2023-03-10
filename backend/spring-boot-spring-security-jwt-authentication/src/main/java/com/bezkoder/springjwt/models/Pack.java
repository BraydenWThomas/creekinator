package com.bezkoder.springjwt.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnore;

import com.bezkoder.springjwt.repository.*;

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
	
	@OneToMany(mappedBy = "pack")
	@JsonIgnore
	private List<AssessmentCenter> assessmentCenters;
	
	public void addAssessmentCenter(AssessmentCenter assessmentCenter) {
		this.assessmentCenters.add(assessmentCenter);
		assessmentCenter.setPack(this);
	}
	public void removeAssessmentCenter(AssessmentCenter assessmentCenter) {
		// System.out.println("wadwadAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWdawd")
		
		this.assessmentCenters.remove(assessmentCenter);
		assessmentCenter.setPack(null);
		
	}
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
	public void setAssessmentCenters(List<AssessmentCenter> assessmentCenters) {
		this.assessmentCenters = assessmentCenters;
	}
	public List<AssessmentCenter> getAssessmentCenters() {
		return this.assessmentCenters;
	}
	/* --- End of Getters and setters --- */
}
