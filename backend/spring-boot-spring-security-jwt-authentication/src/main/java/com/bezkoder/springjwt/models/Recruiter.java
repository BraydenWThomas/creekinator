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
	@JsonIgnore
	private User user;
	@ManyToMany
	@JoinTable(name = "recruiter_candidate", 
		joinColumns = @JoinColumn(name = "recruiter_id"), 
		inverseJoinColumns = @JoinColumn(name = "candidate_id"))
	@JsonIgnore
	private List<Candidate> candidates;
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
	public Recruiter(String name) {
		this.name = name;
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
		// unlink previous relationship before link to the current relationship
		if (this.user != null) {
			removeUser();
		}
		if (user.getRecruiter() != null) {
			user.removeRecruiter();
		}
		
		this.user = user;
		user.setRecruiter(this);
	}
	public void removeUser() {
		this.user = null;
		user.setRecruiter(null);
	}
	
	// candidates
	public void setCandidates(List<Candidate> candidates) {
		this.candidates = candidates;
	}
	public List<Candidate> getCandidates(){
		return this.candidates;
	}
	public void removeCandidate(Candidate candidate) {
		this.getCandidates().remove(candidate);
		candidate.getRecruiters().remove(this);
	}
	public void addCandidate(Candidate candidate) {
		this.candidates.add(candidate);
		candidate.getRecruiters().add(this);
	}
}
