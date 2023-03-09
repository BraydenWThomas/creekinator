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

import java.util.List;

import java.time.LocalDateTime;
import java.time.LocalDate;


@Entity
@Table(name = "assessmentCenters")
// @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property="id")
public class AssessmentCenter {
	/* --- fields --- */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	
	@ManyToMany(mappedBy = "assessmentCenters")
	@JsonIgnore
	//@JsonIgnoreProperties("assessmentCenters")
	private List<Interviewer> interviewers;
	
	public void addInterviewer(Interviewer interviewer) {
		this.interviewers.add(interviewer);
		interviewer.getAssessmentCenters().add(this);
	}
	public void removeInterviewer(Interviewer interviewer) {
		this.interviewers.remove(interviewer);
		interviewer.getAssessmentCenters().remove(this);
	}
	
	@OneToMany(mappedBy = "assessmentCenter")
	//@JsonIgnoreProperties("assessmentCenter")
	@JsonIgnore
	private List<Interview> interviews;
	
	public void addInterview(Interview interview) {
		this.interviews.add(interview);
		interview.setAssessmentCenter(this);
	}
	public void removeInterview(Interview interview) {
		this.interviews.remove(interview);
		interview.setAssessmentCenter(null);
	}
	
	@ManyToMany(mappedBy = "assessmentCenters")
	//@JsonIgnoreProperties("assessmentCenters")
	@JsonIgnore
	private List<Candidate> candidates;
	
	public void addCandidate(Candidate candidate) {
		this.candidates.add(candidate);
		candidate.getAssessmentCenters().add(this);
	}
	public void removeCandidate(Candidate candidate) {
		this.candidates.remove(candidate);
		candidate.getAssessmentCenters().remove(this);
	}
	
	@ManyToOne
	@JoinColumn(name = "FK_PACK_NO")
	//@JsonIgnoreProperties("assessmentCenters")
	@JsonIgnore
	private Pack pack;
	
	@ManyToOne
	@JoinColumn(name = "FK_RECRUITER_NO")
	//@JsonIgnoreProperties("assessmentCenters")
	@JsonIgnore
	private Recruiter recruiter;
	
	private String title;
	
	private LocalDate date;
	
	private LocalDateTime start_time;
	
	private LocalDateTime finish_time;
	
	private boolean completed;
	/* --- End of fields --- */
	
	
	
	/* --- Constructor --- */
	public AssessmentCenter() {
		// pass
	}

	public AssessmentCenter(String title, LocalDate date,
			LocalDateTime start_time, LocalDateTime finish_time, boolean completed) {
		// super();
		this.title = title;
		this.date = date;
		this.start_time = start_time;
		this.finish_time = finish_time;
		this.completed = completed;
	}
	public AssessmentCenter(String title, LocalDate date,
			LocalDateTime start_time, LocalDateTime finish_time, boolean completed,Pack pack) {
		// super();
		this.title = title;
		this.date = date;
		this.start_time = start_time;
		this.finish_time = finish_time;
		this.completed = completed;
		this.pack = pack;
	}
	
	/* --- End of Constructor --- */
	
	
	/* --- setter and getters --- */
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public List<Interviewer> getInterviewers() {
		return interviewers;
	}

	public void setInterviewers(List<Interviewer> interviewers) {
		this.interviewers = interviewers;
	}

	public List<Interview> getInterviews() {
		return interviews;
	}

	public void setInterviews(List<Interview> interviews) {
		this.interviews = interviews;
	}

	public List<Candidate> getCandidates() {
		return candidates;
	}

	public void setCandidates(List<Candidate> candidates) {
		this.candidates = candidates;
	}

	public Pack getPack() {
		return pack;
	}

	public void setPack(Pack pack) {
		this.pack = pack;
	}

	public Recruiter getRecruiter() {
		return recruiter;
	}

	public void setRecruiter(Recruiter recruiter) {
		this.recruiter = recruiter;
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

	public LocalDateTime getStart_time() {
		return start_time;
	}

	public void setStart_time(LocalDateTime start_time) {
		this.start_time = start_time;
	}

	public LocalDateTime getFinish_time() {
		return finish_time;
	}

	public void setFinish_time(LocalDateTime finish_time) {
		this.finish_time = finish_time;
	}

	public boolean isCompleted() {
		return completed;
	}

	public void setCompleted(boolean completed) {
		this.completed = completed;
	}
	/* --- End of setter and getters --- */
}
