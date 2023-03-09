package com.bezkoder.springjwt.models;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import java.util.List;
//import java.util.ArrayList;

@Entity
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property="id")
public class Recruiter {
	/* --- fields --- */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String name;
	
	private boolean superRecruiter;
	
	@OneToMany(mappedBy = "recruiter")
	//@JsonIgnoreProperties("recruiter")
	@JsonIgnore
	private List<AssessmentCenter> assessmentCenters;
	
	public void addAssessmentCenter(AssessmentCenter assessmentCenter) {
		this.assessmentCenters.add(assessmentCenter);
		assessmentCenter.setRecruiter(this);
	}
	public void removeAssessmentCenter(AssessmentCenter assessmentCenter) {
		this.assessmentCenters.remove(assessmentCenter);
		assessmentCenter.setRecruiter(null);
	}
	/* --- End of Attributes --- */
	
	/* --- Constructors --- */
	public Recruiter() {
		
	}
	
	public Recruiter(String name, boolean superRecruiter) {
		// this.id = id;
		this.name = name;
		this.superRecruiter = superRecruiter;
	}
	/* --- End of Constructors --- */
	
	
	/* --- Getters and setters --- */
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public boolean isSuperRecruiter() {
		return superRecruiter;
	}

	public void setSuperRecruiter(boolean superRecruiter) {
		this.superRecruiter = superRecruiter;
	}

	public List<AssessmentCenter> getAssessmentCenters() {
		return assessmentCenters;
	}

	public void setAssessmentCenters(List<AssessmentCenter> assessementCenters) {
		this.assessmentCenters = assessementCenters;
	}
	/* --- End of Getters and setters --- */
	
	
}
