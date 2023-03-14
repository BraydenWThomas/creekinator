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

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.sql.Time;
import java.time.LocalDate;


@Entity
@Table(name = "assessmentCenters")
public class AssessmentCenter {
	/* --- fields --- */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	private String title;
	
	private LocalDate date;
	
	private LocalTime start_time;
	
	private LocalTime finish_time;
	
	private boolean completed;
	
	private int coordinatorId = -1;
	
	// linked fields
	@ManyToMany(mappedBy = "assessmentCenters")
	@JsonIgnore
	private List<Interviewer> interviewers;
	
	@OneToMany(mappedBy = "assessmentCenter")
	@JsonIgnore
	private List<Interview> interviews;
	
	@ManyToMany(mappedBy = "assessmentCenters")
	@JsonIgnore
	private List<Candidate> candidates;
	
	@ManyToMany
	@JoinTable(name = "assessmentCenter_recruiter",
				joinColumns = @JoinColumn(name = "recruiter_id"),
				inverseJoinColumns = @JoinColumn(name = "AC_id"))
	@JsonIgnore
	private List<Recruiter> recruiters;
	/* --- End of fields --- */
	
	
	
	
	
	
	
	/* --- Constructor --- */
	public AssessmentCenter() {
		this.interviewers = new ArrayList<Interviewer>();
		this.interviews = new ArrayList<Interview>();
		this.candidates = new ArrayList<Candidate>();
		this.recruiters = new ArrayList<Recruiter>();
	}
	public AssessmentCenter(String title, LocalDate date,
			LocalTime start_time, LocalTime finish_time, boolean completed, int coordinatorId) {
		this.title = title;
		this.date = date;
		this.start_time = start_time;
		this.finish_time = finish_time;
		this.completed = completed;
		this.coordinatorId = coordinatorId;
		
		this.interviewers = new ArrayList<Interviewer>();
		this.interviews = new ArrayList<Interview>();
		this.candidates = new ArrayList<Candidate>();
		this.recruiters = new ArrayList<Recruiter>();
	}
	
	public AssessmentCenter(String title, LocalDate date,
			LocalTime start_time, LocalTime finish_time, boolean completed) {
		this.title = title;
		this.date = date;
		this.start_time = start_time;
		this.finish_time = finish_time;
		this.completed = completed;
		
		this.interviewers = new ArrayList<Interviewer>();
		this.interviews = new ArrayList<Interview>();
		this.candidates = new ArrayList<Candidate>();
		this.recruiters = new ArrayList<Recruiter>();
	}
	/* --- End of Constructor --- */
	
	
	
	
	
	
	
	
	/* --- normal setter and getters --- */
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public LocalTime getStart_time() {
		return start_time;
	}

	public void setStart_time(LocalTime start_time) {
		this.start_time = start_time;
	}

	public LocalTime getFinish_time() {
		return finish_time;
	}

	public void setFinish_time(LocalTime finish_time) {
		this.finish_time = finish_time;
	}

	public boolean isCompleted() {
		return completed;
	}

	public void setCompleted(boolean completed) {
		this.completed = completed;
	}
	
	public void setCoordinatorId(int id) {
		this.coordinatorId = id;
	}
	
	public int getCoordinatorId() {
		return this.coordinatorId;
	}
	/* --- End of normal setter and getters --- */
	
	
	
	
	
	
	
	
	/* --- add and remove functions --- */
	// interviewer
	public List<Interviewer> getInterviewers() {
		return interviewers;
	}
	public void setInterviewers(List<Interviewer> interviewers) {
		this.interviewers = interviewers;
	}
	public void addInterviewer(Interviewer interviewer) {
		this.interviewers.add(interviewer);
		interviewer.getAssessmentCenters().add(this);
	}
	public void removeInterviewer(Interviewer interviewer) {
		this.interviewers.remove(interviewer);
		interviewer.getAssessmentCenters().remove(this);
	}
	
	// interview
	public List<Interview> getInterviews() {
		return interviews;
	}
	public void setInterviews(List<Interview> interviews) {
		this.interviews = interviews;
	}
	public void addInterview(Interview interview) {
		this.interviews.add(interview);
		// if interview has linked with other AC, unlink it first
		if (interview.getAssessmentCenter() != null) {
			interview.removeAssessmentCenter();
		}
		interview.setAssessmentCenter(this);
	}
	public void removeInterview(Interview interview) {
		this.interviews.remove(interview);
		interview.setAssessmentCenter(null);
	}
	
	// candidate
	public List<Candidate> getCandidates() {
		return candidates;
	}
	public void setCandidates(List<Candidate> candidates) {
		this.candidates = candidates;
	}
	public void addCandidate(Candidate candidate) {
		this.candidates.add(candidate);
		candidate.getAssessmentCenters().add(this);
	}
	public void removeCandidate(Candidate candidate) {
		this.candidates.remove(candidate);
		candidate.getAssessmentCenters().remove(this);
	}
	
	// Recruiter
	public List<Recruiter> getRecruiters() {
		return recruiters;
	}
	public void setRecruiters(List<Recruiter> recruiters) {
		this.recruiters = recruiters;
	}
	public void addRecruiter(Recruiter recruiter) {
		this.recruiters.add(recruiter);
		recruiter.getAssessmentCenters().add(this);
	}
	public void removeRecruiter(Recruiter recruiter) {
		this.recruiters.remove(recruiter);
		recruiter.getAssessmentCenters().remove(this);
	}
	
}
