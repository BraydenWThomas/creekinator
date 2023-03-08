package com.bezkoder.springjwt.models;

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

	@Id
	@GeneratedValue
	private int id;
	private String title;
	private String first_name;
	private String middle_name;
	private String last_name;
	private String mobile_number;
	private String email;
	private LocalDateTime date_of_birth;
	private String address;
	private LocalDateTime graduation_year; 
	private String degree;
	private String university;
	private String resume;
	private String applied_stream;
	private String recruit_phase;
	private String past_ac_result;
	
	public Candidate() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public Candidate(String title, String first_name, String middle_name, String last_name, String mobile_number,
			String email, LocalDateTime date_of_birth, String address, LocalDateTime graduation_year, String degree,
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
	}
	
	@ManyToMany
	@JoinTable(name = "assessmentCenter_candidate", 
        joinColumns = @JoinColumn(name = "AC_id"), 
        inverseJoinColumns = @JoinColumn(name = "Candidate_id"))
	@JsonIgnore
	//@JsonIgnoreProperties("candidates")
	private List<AssessmentCenter> assessmentCenters;
	
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
	public LocalDateTime getDate_of_birth() {
		return date_of_birth;
	}
	public void setDate_of_birth(LocalDateTime date_of_birth) {
		this.date_of_birth = date_of_birth;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public LocalDateTime getGraduation_year() {
		return graduation_year;
	}
	public void setGraduation_year(LocalDateTime graduation_year) {
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