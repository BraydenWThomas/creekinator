package com.bezkoder.springjwt.models;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import java.util.ArrayList;
import java.util.List;
//import java.util.ArrayList;

@Entity
public class Recruiter {
	/* --- fields --- */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	private boolean superRecruiter;
	
	// linked field
	@ManyToMany(mappedBy = "recruiters")
	@JsonIgnore
	private List<AssessmentCenter> assessmentCenters;
	@OneToOne
	private User user;
	/* --- End of Attributes --- */
	
	
	
	
	
	
	
	/* --- Constructors --- */
	public Recruiter() {
		this.assessmentCenters = new ArrayList<AssessmentCenter>();
	}
	public Recruiter(String name, boolean superRecruiter) {
		this.name = name;
		this.superRecruiter = superRecruiter;
		this.assessmentCenters = new ArrayList<AssessmentCenter>();
	}
	/* --- End of Constructors --- */
	
	
	
	
	
	
	
	/* --- Normal getters and setters --- */
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
	/* --- End of Getters and setters --- */
	
	/* --- linked --- */
	// AssessmentCenter
	public List<AssessmentCenter> getAssessmentCenters() {
		return assessmentCenters;
	}
	public void setAssessmentCenters(List<AssessmentCenter> assessementCenters) {
		this.assessmentCenters = assessementCenters;
	}
	public void addAssessmentCenter(AssessmentCenter assessmentCenter) {
		this.assessmentCenters.add(assessmentCenter);
		assessmentCenter.getRecruiters().add(this);
	}
	public void removeAssessmentCenter(AssessmentCenter assessmentCenter) {
		this.assessmentCenters.remove(assessmentCenter);
		assessmentCenter.getRecruiters().remove(this);
	}
	
	// user
	public void setUser(User user) {
		this.user = user;
	}
	public User getUser() {
		return this.user;
	}
	public void addUser(User user) {
		if (this.user != null) {
			removeUser();
		}
		this.user = user;
		user.setRecruiter(this);
	}
	public void removeUser() {
		this.user = null;
		user.setRecruiter(null);
	}
}
