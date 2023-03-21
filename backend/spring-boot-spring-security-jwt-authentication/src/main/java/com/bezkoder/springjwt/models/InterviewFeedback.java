package com.bezkoder.springjwt.models;

import java.util.List;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class InterviewFeedback {

	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	private Interview interviewId;
	private Pack packId;
	private String feedback;
	private int overallScore;
	
	@OneToMany(mappedBy = "interviewFeedback")
	private List<QuestionsFeedback> questionFeedback;
	
	
	public InterviewFeedback(List<QuestionsFeedback> questionFeedback, Interview interviewId, Pack packId,
			String feedback, int overallScore) {
		super();
		this.questionFeedback = questionFeedback;
		this.interviewId = interviewId;
		this.packId = packId;
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
	public Interview getInterviewId() {
		return interviewId;
	}
	public void setInterviewId(Interview interviewId) {
		this.interviewId = interviewId;
	}
	public Pack getPackId() {
		return packId;
	}
	public void setPackId(Pack packId) {
		this.packId = packId;
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
	public void setOverallScore(int overallScore) {
		this.overallScore = overallScore;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	
	
	
}
