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
public class Interviewer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	
	// linked fields
	@OneToMany(mappedBy = "interviewer")
	@JsonIgnore
	private List<Interview> interviews; // an array list
	@ManyToMany
	@JoinTable(name = "assessmentCenter_interviewer", 
	       		joinColumns = @JoinColumn(name = "interviewer_id"), 
	       		inverseJoinColumns = @JoinColumn(name = "AC_id"))
	@JsonIgnore
	private List<AssessmentCenter> assessmentCenters;
	@OneToOne
	private User user;
	/* --- end of fields --- */
	
	
	
	
	
	
	
	
	/* --- contructors ---*/
	public Interviewer() {
		this.interviews = new ArrayList<Interview>();
		this.assessmentCenters = new ArrayList<AssessmentCenter>();
	}
	public Interviewer(String name) {
		this.name = name;
		this.interviews = new ArrayList<Interview>();
		this.assessmentCenters = new ArrayList<AssessmentCenter>();
	}
	/* --- end of constructor --- */
	
	
	
	
	
	
	
	
	
	/* --- getter and setter --- */
	public int getId() {
		return this.id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public String getName() {
		return this.name;
	}
	
	public void setName(String name) {
		this.name = name;
	}

	
	/*
	public void setAssessmentCenters(List<AssessmentCenter> assessmentCenters) {
		this.assessmentCenters = new ArrayList<AssessmentCenter>();
		for (AssessmentCenter assessmentCenter : assessmentCenters) {
			addAssessmentCenter(assessmentCenter);
		}
	}
	
	

	public void setInterviews(List<Interview> interviews) {
		this.interviews = new ArrayList<Interview>();
		for (Interview interview : interviews) {
			addInterview(interview);
		}
	}
	*/
	
	/*
	public void addAssessmentCenter(AssessmentCenter assessmentCenters) {
		List<AssessmentCenter> assessmentCentersList = new ArrayList<AssessmentCenter>();
		if (this.getAssessmentCenters() != null) {
			assessmentCentersList = this.getAssessmentCenters();
		}	
		assessmentCentersList.add(assessmentCenters);
		this.assessmentCenters = assessmentCentersList;
	}
	*/
	
	
	/* --- end of getter and setter --- */
	
	
	
	

	
	
	/* add, remove or get the linked reference --- */
	// interview
	public void addInterview(Interview interview) {
		this.interviews.add(interview);
		if (interview.getInterviewer() != null) {
			interview.removeInterviewer();
		}
		interview.setInterviewer(this);
	}
	public void removeInterview(Interview interview) {
		this.interviews.remove(interview);
		interview.setInterviewer(null);
	}
	public List<Interview> getInterviews() {
		return interviews;
	}
	public void setInterviews(List<Interview> interviews) {
		this.interviews = interviews;
	}
	
	// AC
	public void addAssessmentCenter(AssessmentCenter assessmentCenter) {
		this.assessmentCenters.add(assessmentCenter);
		assessmentCenter.getInterviewers().add(this);
	}
	public void removeAssessmentCenter(AssessmentCenter assessmentCenter) {
		this.assessmentCenters.remove(assessmentCenter);
		assessmentCenter.getInterviewers().remove(this);
	}
	public List<AssessmentCenter> getAssessmentCenters() {
		return assessmentCenters;
	}
	public void setAssessmentCenters(List<AssessmentCenter> assessmentCenters) {
		this.assessmentCenters = assessmentCenters;
	}
	
	//user
	public void addUser(User user) {
		// if interviewer is currently linking to another user, remove relationship first
		if (this.user != null) {
			removeUser();
		}
		// if the user is linking to another interviewer, remove the relationship first
		if (user.getInterviewer() != null) {
			user.removeInterviewer();
		}
		this.user = user;
		this.user.setInterviewer(this);
	}
	public void removeUser() {
		this.user = null;
		user.setInterviewer(null);
	}
	public void setUser(User user) {
		this.user = user;
	}
	public User getUser() {
		return this.user;
	}

}
