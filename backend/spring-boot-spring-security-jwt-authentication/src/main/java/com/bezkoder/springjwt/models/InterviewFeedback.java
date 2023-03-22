package com.bezkoder.springjwt.models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class InterviewFeedback {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@OneToOne
	private Interview interview;
	private String feedback;
	private int overallScore;
	
	@ManyToOne
	private Pack pack;
	
	@OneToMany(mappedBy = "interviewFeedback")
	private List<QuestionsFeedback> questionFeedback;
	
	
	public InterviewFeedback(List<QuestionsFeedback> questionFeedback, Interview interview, Pack packId,
			String feedback, int overallScore) {
		super();
		this.questionFeedback = questionFeedback;
		this.interview = interview;
		this.pack = packId;
		this.feedback = feedback;
		this.overallScore = overallScore;
	}
	public InterviewFeedback() {
		super();
		// TODO Auto-generated constructor stub
	}
	public List<QuestionsFeedback> getQuestionFeedback() {
		return questionFeedback;
	}
	public void setQuestionFeedback(List<QuestionsFeedback> questionFeedback) {
		this.questionFeedback = questionFeedback;
	}
	public Pack getPackId() {
		return pack;
	}
	public void setPackId(Pack packId) {
		this.pack = packId;
	}
	public String getFeedback() {
		return feedback;
	}
	public void setFeedback(String feedback) {
		this.feedback = feedback;
	}
	public int getOverallScore() {
		return overallScore;
	}
	public void setOverallScore(Integer overallScore) {
		this.overallScore = overallScore;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Interview getInterview() {
		return interview;
	}
	public void setInterview(Interview interview) {
		this.interview = interview;
	}

	
	
	
	
	
	
}
