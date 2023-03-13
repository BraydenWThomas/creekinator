package com.bezkoder.springjwt.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import java.sql.Time;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

@Entity
@Table(name = "interviews")
// @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property="id")
public class Interview {
	/* --- fields --- */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String form;
<<<<<<< HEAD
	// for link to interviewer
=======
	private LocalTime interviewTime;
	
>>>>>>> bee0bfd7677a8992e78e8bd22af562a5e2d9151f
	@ManyToOne
	@JoinColumn(name = "FK_INTERVIEWER_NO")
	@JsonIgnore
	//@JsonIgnoreProperties("interviews")
	private Interviewer interviewer;
	// for link to AssessmentCenter
	@ManyToOne
	@JoinColumn(name = "FK_AC_NO")
	@JsonIgnore
	//@JsonIgnoreProperties("interviews")
	private AssessmentCenter assessmentCenter;
	// for link to Candidate
	@ManyToOne
	@JoinColumn(name = "FK_CANDIDATE_NO")
	@JsonIgnore
	//@JsonIgnoreProperties("interviews")
	private Candidate candidate;
	/* --- End of fields --- */
	
	
	/* --- Constructors --- */
	public Interview() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Interview(String form) {
		super();
		this.form = form; // comment should be included in form
	}
<<<<<<< HEAD
	
	public Interview(AssessmentCenter assessmentCenter,Interviewer interviewer,Candidate candidate,String form) {
=======
	public Interview(AssessmentCenter assessmentCenter,Interviewer interviewer,Candidate candidate, String form,LocalTime interviewTime) {
>>>>>>> bee0bfd7677a8992e78e8bd22af562a5e2d9151f
		super();
		this.form = form; // comment should be included in form
		this.assessmentCenter = assessmentCenter;
		this.interviewer = interviewer;
		this.candidate = candidate;	
<<<<<<< HEAD
=======
		this.packs = new ArrayList<Pack>();
		this.interviewTime = interviewTime;
	}
	public Interview(AssessmentCenter assessmentCenter,Interviewer interviewer,Candidate candidate, List<Pack> packs, String form,LocalTime interviewTime) {
		super();
		this.form = form; // comment should be included in form
		this.assessmentCenter = assessmentCenter;
		this.interviewer = interviewer;
		this.candidate = candidate;	
		this.packs = packs;
		this.interviewTime = interviewTime;
>>>>>>> bee0bfd7677a8992e78e8bd22af562a5e2d9151f
	}
	/* --- End of Constructors --- */
	
	
	/* --- Constructors --- */
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getForm() {
		return form;
	}
	public void setForm(String form) {
		this.form = form;
	}
<<<<<<< HEAD
=======
	/* --- End of unlinked getter and setter --- */
	
	
	
	
	
	
	/* --- linked reference --- */
	
	
	// interviewer
>>>>>>> bee0bfd7677a8992e78e8bd22af562a5e2d9151f
	public Interviewer getInterviewer() {
		return interviewer;
	}
	public LocalTime getInterviewTime() {
		return interviewTime;
	}
	public void setInterviewTime(LocalTime interviewTime) {
		this.interviewTime = interviewTime;
	}
	public void setInterviewer(Interviewer interviewer) {
		this.interviewer = interviewer;
	}
	public AssessmentCenter getAssessmentCenter() {
		return assessmentCenter;
	}
	public void setAssessmentCenter(AssessmentCenter assessmentCenter) {
		this.assessmentCenter = assessmentCenter;
	}
	public Candidate getCandidate() {
		return candidate;
	}
	public void setCandidate(Candidate candidate) {
		this.candidate = candidate;
	}
	/* --- End of Constructors --- */
	
	
}
