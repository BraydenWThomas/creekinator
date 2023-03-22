package com.bezkoder.springjwt.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnore;

import com.bezkoder.springjwt.repository.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

// import javax.persistence.*;
import java.util.List;
import java.util.ArrayList;

@Entity
@Table(name="PACK")
public class Pack {
	
	/* --- fields --- */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String pack_name;
	private String pack_type;
	private String stream;
	
	@OneToMany(mappedBy = "pack")
	private List<InterviewFeedback> feedback;
	
	@OneToMany(mappedBy = "pack")
	private List<Questions> questions;
	
	@OneToMany(mappedBy = "pack")
	private List<Interview> interviews;
	
	@ManyToMany
	@JoinTable(name = "assessmentCenter_pack", 
	       		joinColumns = @JoinColumn(name = "pack_id"), 
	       		inverseJoinColumns = @JoinColumn(name = "AC_id"))
	@JsonIgnore
	private List<AssessmentCenter> assessmentCenters;

	public Pack() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Pack(String pack_name, String pack_type, String stream, List<InterviewFeedback> feedback,
			List<Questions> questions, List<Interview> interviews, List<AssessmentCenter> assessmentCenters) {
		super();
		this.pack_name = pack_name;
		this.pack_type = pack_type;
		this.stream = stream;
		this.feedback = feedback;
		this.questions = questions;
		this.interviews = interviews;
		this.assessmentCenters = assessmentCenters;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getPack_name() {
		return pack_name;
	}

	public void setPack_name(String pack_name) {
		this.pack_name = pack_name;
	}

	public String getPack_type() {
		return pack_type;
	}

	public void setPack_type(String pack_type) {
		this.pack_type = pack_type;
	}

	public String getStream() {
		return stream;
	}

	public void setStream(String stream) {
		this.stream = stream;
	}

	public List<InterviewFeedback> getFeedback() {
		return feedback;
	}

	public void setFeedback(List<InterviewFeedback> feedback) {
		this.feedback = feedback;
	}

	public List<Questions> getQuestions() {
		return questions;
	}

	public void setQuestions(List<Questions> questions) {
		this.questions = questions;
	}

	public List<Interview> getInterviews() {
		return interviews;
	}

	public void setInterviews(List<Interview> interviews) {
		this.interviews = interviews;
	}

	public List<AssessmentCenter> getAssessmentCenters() {
		return assessmentCenters;
	}

	public void setAssessmentCenters(List<AssessmentCenter> assessmentCenters) {
		this.assessmentCenters = assessmentCenters;
	}

	@Override
	public String toString() {
		return "Pack [id=" + id + ", pack_name=" + pack_name + ", pack_type=" + pack_type + ", stream=" + stream
				+ ", feedback=" + feedback + ", questions=" + questions + ", interviews=" + interviews
				+ ", assessmentCenters=" + assessmentCenters + "]";
	}	
	
}
