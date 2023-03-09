package com.bezkoder.springjwt.models;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name = "interviewers")
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property="id")
public class Interviewer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@OneToMany(mappedBy = "interviewer")
	//@JsonIgnoreProperties("interviewer")
	@JsonIgnore
	private List<Interview> interviews; // an array list
	
	@ManyToMany
	@JoinTable(name = "assessmentCenter_interviewer", 
	       		joinColumns = @JoinColumn(name = "interviewer_id"), 
	       		inverseJoinColumns = @JoinColumn(name = "AC_id"))
	//@JsonIgnoreProperties("interviewers")
	@JsonIgnore
	private List<AssessmentCenter> assessmentCenters;
	
	private String name;
	
	//#TODO Sales or Tech etc.. 
	//private String role;
	
//	@OneToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "user_id", referencedColumnName = "id")
//	private User user;
	
	public Interviewer() {
		
	}
	
	
	public Interviewer(String name) {
		this.name = name;
	}

	
	
	
//	public User getUser() {
//		return user;
//	}
//
//
//	public void setUser(User user) {
//		this.user = user;
//	}


	public int getId() {
		return this.id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public List<Interview> getInterviews() {
		return interviews;
	}

	public void setInterviews(List<Interview> interviews) {
		this.interviews = interviews;
	}
	
	public String getName() {
		return this.name;
	}
	
	public void setName(String name) {
		this.name = name;
	}

	public List<AssessmentCenter> getAssessmentCenters() {
		return assessmentCenters;
	}

	public void addAssessmentCenter(AssessmentCenter assessmentCenters) {
		List<AssessmentCenter> assessmentCentersList = new ArrayList<AssessmentCenter>();
		if (this.getAssessmentCenters() != null) {
			assessmentCentersList = this.getAssessmentCenters();
		}	
		assessmentCentersList.add(assessmentCenters);
		this.assessmentCenters = assessmentCentersList;
	}

	
	
	
}
