package com.bezkoder.springjwt.models;

import java.sql.Blob;
import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import java.util.ArrayList;
import java.util.List;

@Entity
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property="id")
public class Candidate {
	
	/* --- fields --- */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String title;
	private String first_name;
	private String middle_name;
	private String last_name;
	private String mobile_number;
	private String email;
	private LocalDate date_of_birth;
	private String address;
	private int graduation_year; 
	private String degree;
	private String university;
	private String resume; //#TODO Blob
	private String applied_stream;
	private String recruit_phase; //#TODO delete ??
	private String past_ac_result;
	
	// linked fields
	@ManyToMany
	@JoinTable(name = "assessmentCenter_candidate", 
        joinColumns = @JoinColumn(name = "Candidate_id"), 
        inverseJoinColumns = @JoinColumn(name = "AC_id"))
	@JsonIgnore
	private List<AssessmentCenter> assessmentCenters;
	@OneToMany(mappedBy = "candidate")
	@JsonIgnore
	private List<Interview> interviews;
	@OneToOne
	@JsonIgnore
	private User user;
	@ManyToMany(mappedBy = "candidates")
	@JsonIgnore
	private List<Recruiter> recruiters;
	/* --- end of fields --- */
	
	
	
	
	
	
	
	
	/* --- constructors --- */
	public Candidate() {
		super();
		this.assessmentCenters = new ArrayList<AssessmentCenter>();
		this.interviews = new ArrayList<Interview>();
		this.recruiters = new ArrayList<Recruiter>();
	}
	
	public Candidate(String title, String first_name, String middle_name, String last_name, String mobile_number,
			String email, LocalDate date_of_birth, String address, int graduation_year, String degree,
			String university, String resume, String applied_stream, String recruit_phase, String past_ac_result) {
		super();
		this.title = title;
		this.first_name = first_name;
		this.middle_name = middle_name;
		this.last_name = last_name;
		this.mobile_number = mobile_number;
		this.email = email;
		this.date_of_birth = date_of_birth;
		this.address = address;
		this.graduation_year = graduation_year;
		this.degree = degree;
		this.university = university;
		this.resume = resume;
		this.applied_stream = applied_stream;
		this.recruit_phase = recruit_phase;
		this.past_ac_result = past_ac_result;
		this.assessmentCenters = new ArrayList<AssessmentCenter>();
		this.interviews = new ArrayList<Interview>();
		this.recruiters = new ArrayList<Recruiter>();
	}
	/* --- end of constructor --- */
	
	
	
	
	
	
	
	
	
	/* --- normal getter and setter --- */
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getFirst_name() {
		return first_name;
	}
	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}
	public String getMiddle_name() {
		return middle_name;
	}
	public void setMiddle_name(String middle_name) {
		this.middle_name = middle_name;
	}
	public String getLast_name() {
		return last_name;
	}
	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}
	public String getMobile_number() {
		return mobile_number;
	}
	public void setMobile_number(String mobile_number) {
		this.mobile_number = mobile_number;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public LocalDate getDate_of_birth() {
		return date_of_birth;
	}
	public void setDate_of_birth(LocalDate date_of_birth) {
		this.date_of_birth = date_of_birth;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public int getGraduation_year() {
		return graduation_year;
	}
	public void setGraduation_year(int graduation_year) {
		this.graduation_year = graduation_year;
	}
	public String getDegree() {
		return degree;
	}
	public void setDegree(String degree) {
		this.degree = degree;
	}
	public String getUniversity() {
		return university;
	}
	public void setUniversity(String university) {
		this.university = university;
	}
	public String getResume() {
		return resume;
	}
	public void setResume(String resume) {
		this.resume = resume;
	}
	public String getApplied_stream() {
		return applied_stream;
	}
	public void setApplied_stream(String applied_stream) {
		this.applied_stream = applied_stream;
	}
	public String getRecruit_phase() {
		return recruit_phase;
	}
	public void setRecruit_phase(String recruit_phase) {
		this.recruit_phase = recruit_phase;
	}
	public String getPast_ac_result() {
		return past_ac_result;
	}
	public void setPast_ac_result(String past_ac_result) {
		this.past_ac_result = past_ac_result;
	}
	/*--- end of normal getter and setter ---*/
	
	
	
	
	
	
	
	
	
	
	/* --- linked --- */
	// interview
	public List<Interview> getInterviews() {
		return this.interviews;
	}
	public void setInterviews(List<Interview> interviews) {
		this.interviews = interviews;
	}
	public void addInterview(Interview interview) {
		this.interviews.add(interview);
		// if the interview already linked to other candidate, remove relationship first
		if (interview.getCandidate() != null) {
			interview.removeCandidate();
		}
		interview.setCandidate(this);
	}
	public void removeInterview(Interview interview) {
		this.interviews.remove(interview);
		interview.setCandidate(null);
	}

	// AC
	public List<AssessmentCenter> getAssessmentCenters() {
		return assessmentCenters;
	}
	public void setAssessmentCenter(List<AssessmentCenter> assessmentCenters) {
		this.assessmentCenters = assessmentCenters;
	}
	public void addAssessmentCenter(AssessmentCenter assessmentCenter) {
		this.assessmentCenters.add(assessmentCenter);
		assessmentCenter.getCandidates().add(this);
	}
	public void removeAssessmentCenter(AssessmentCenter assessmentCenter) {
		this.assessmentCenters.remove(assessmentCenter);
		assessmentCenter.getCandidates().remove(this);
	}
	
	// user
	public User getUser() {
		return this.user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public void addUser(User user) {
		if (this.user != null) {
			this.removeUser();
		}
		this.user = user;
		user.setCandidate(this);
	}
	public void removeUser() {
		this.user.setCandidate(null);
		this.user = null;
	}
	
	// recruiters
	public List<Recruiter> getRecruiters() {
		return this.recruiters;
	}
	public void setRecruiters(List<Recruiter> recruiters) {
		this.recruiters = recruiters;
	}
	
	public void removeRecruiter(Recruiter recruiter) {
		this.recruiters.remove(recruiter);
		recruiter.getCandidates().remove(this);
		// recruiter.removeCandidate(this);
	}
	public void addRecruiter(Recruiter recruiter) {
		this.recruiters.add(recruiter);
		recruiter.getCandidates().add(this);
	}
	
	
}
