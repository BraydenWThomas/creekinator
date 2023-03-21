package com.bezkoder.springjwt.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
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
public class Pack {
	
	/* --- fields --- */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String pack_name;
	private String pack_type;
	private String stream;
	@OneToMany(mappedBy = "pack")
	private List<Question> questions;
	@ManyToOne
	private AssessmentCenter assessmentCenter;
	
	public Pack() {
		super();
	}

	public Pack(String pack_name, String pack_type, String stream, List<Question> questions,
			AssessmentCenter assessmentCenter) {
		super();
		this.pack_name = pack_name;
		this.pack_type = pack_type;
		this.stream = stream;
		this.questions = questions;
		this.assessmentCenter = assessmentCenter;
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

	public List<Question> getQuestions() {
		return questions;
	}

	public void setQuestions(List<Question> questions) {
		this.questions = questions;
	}

	public AssessmentCenter getAssessmentCenter() {
		return assessmentCenter;
	}

	public void setAssessmentCenter(AssessmentCenter assessmentCenter) {
		this.assessmentCenter = assessmentCenter;
	}
	
	
	
	
}
