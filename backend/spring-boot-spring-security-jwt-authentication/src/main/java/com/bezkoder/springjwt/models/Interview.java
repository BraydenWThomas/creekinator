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
public class Interview {
	/* --- fields --- */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String comment;
	private LocalTime interviewTime;
	private int score = -1;
	
	@ManyToOne
	@JoinColumn(name = "FK_INTERVIEWER_NO")
	@JsonIgnore
	private Interviewer interviewer;
	
	@ManyToOne
	@JoinColumn(name = "FK_AC_NO")
	@JsonIgnore
	private AssessmentCenter assessmentCenter;
	
	@ManyToOne
	@JoinColumn(name = "FK_CANDIDATE_NO")
	@JsonIgnore
	private Candidate candidate;
	
	/* --- End of fields --- */
	
	
	
	
	
	
	
	
	/* --- Constructors --- */
	public Interview() {
		super();
		// TODO Auto-generated constructor stub
	}
	/*
	public Interview(String form) {
		super();
		this.form = form; // comment should be included in form
		this.packs = new ArrayList<Pack>();
	}
	*/
	
	public Interview(AssessmentCenter assessmentCenter,Interviewer interviewer,Candidate candidate, String comment,LocalTime interviewTime, int score) {
		super();
		this.comment = comment; // comment should be included in form
		this.assessmentCenter = assessmentCenter;
		this.interviewer = interviewer;
		this.candidate = candidate;	
	
		this.interviewTime = interviewTime;
		this.score = score;
	}
	public Interview(AssessmentCenter assessmentCenter,Interviewer interviewer,Candidate candidate, List<Pack> packs, String comment,LocalTime interviewTime, int score) {
		super();
		this.comment = comment; // comment should be included in form
		this.assessmentCenter = assessmentCenter;
		this.interviewer = interviewer;
		this.candidate = candidate;	
		
		this.interviewTime = interviewTime;
		this.score = score;
	}
	/* --- End of Constructors --- */
	
	
	
	
	
	
	
	
	/* --- unlinked getter and setter --- */
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getComment() {
		return this.comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	/* --- End of unlinked getter and setter --- */
	
	
	
	
	
	
	/* --- linked reference --- */
	
	
	
	// interviewer
	public Interviewer getInterviewer() {
		return interviewer;
	}
	public int getScore() {
		return score;
	}
	public void setScore(int score) {
		this.score = score;
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
	public void addInterviewer(Interviewer interviewer) {
		// need to unlink first, otherwise the otherside's reference remain
		if (this.interviewer != null) {
			removeInterviewer();
		}
		this.interviewer = interviewer;
		interviewer.getInterviews().add(this);
	}
	public void removeInterviewer() {
		this.interviewer.getInterviews().remove(this);
		this.interviewer = null;
	}
	
	// AssessmentCenter
	public AssessmentCenter getAssessmentCenter() {
		return assessmentCenter;
	}
	public void setAssessmentCenter(AssessmentCenter assessmentCenter) {
		this.assessmentCenter = assessmentCenter;
	}
	public void addAssessmentCenter(AssessmentCenter assessmentCenter) {
		//  need to unlink first, otherwise the otherside's reference remain
		if (this.assessmentCenter != null) {
			removeAssessmentCenter();
		}
		this.assessmentCenter = assessmentCenter;
		assessmentCenter.getInterviews().add(this);
	}
	public void removeAssessmentCenter() {
		this.assessmentCenter.getInterviews().remove(this);
		this.assessmentCenter = null;
	}
	
	
	// Candidate
	public Candidate getCandidate() {
		return candidate;
	}
	public void setCandidate(Candidate candidate) {
		this.candidate = candidate;
	}
	public void addCandidate(Candidate candidate) {
		//  need to unlink first, otherwise the otherside's reference remain
		if (this.candidate != null) {
			removeCandidate();
		}
		this.candidate = candidate;
		candidate.getInterviews().add(this);
	}
	public void removeCandidate() {
		this.candidate.getInterviews().remove(this);
		this.candidate = null;
	}
	

}
