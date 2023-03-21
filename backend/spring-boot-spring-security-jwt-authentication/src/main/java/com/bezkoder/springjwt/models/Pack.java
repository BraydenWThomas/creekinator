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
	
	@OneToMany(mappedBy = "packId")
	private List<InterviewFeedback> feedback;
	
	@OneToMany(mappedBy = "packId")
	private List<Questions> questions;
	
	@OneToMany(mappedBy = "packId")
	private List<Interview> interviews;
	
	@ManyToMany
	@JoinTable(name = "assessmentCenter_pack", 
	       		joinColumns = @JoinColumn(name = "pack_id"), 
	       		inverseJoinColumns = @JoinColumn(name = "AC_id"))
	@JsonIgnore
	private List<AssessmentCenter> assessmentCenters;
	
	

	
	
	
	/* --- Constructors --- */

	public Pack() {
		super();
	}

	

	public Pack(String pack_name, String pack_type, String stream, List<Questions> questions,
			List<AssessmentCenter> assessmentCenters, List<Interview> interviews) {
		super();
		this.pack_name = pack_name;
		this.pack_type = pack_type;
		this.stream = stream;
		this.questions = questions;
		this.assessmentCenters = assessmentCenters;
		this.interviews = interviews;
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



	public List<Questions> getQuestions() {
		return questions;
	}



	public void setQuestions(List<Questions> questions) {
		this.questions = questions;
	}



	public List<AssessmentCenter> getAssessmentCenters() {
		return assessmentCenters;
	}



	public void setAssessmentCenters(List<AssessmentCenter> assessmentCenters) {
		this.assessmentCenters = assessmentCenters;
	}


	public List<Interview> getInterviews() {
		return interviews;
	}



	public void setInterviews(List<Interview> interviews) {
		this.interviews = interviews;
	}



	
	/* --- End of Normal getters and setters --- */
	
	
	
	
	
}
