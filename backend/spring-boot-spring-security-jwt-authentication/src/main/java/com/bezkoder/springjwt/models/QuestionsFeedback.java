package com.bezkoder.springjwt.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="QUESTIONS_FEEDBACK")
public class QuestionsFeedback {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	@ManyToOne
	private InterviewFeedback interviewFeedback;
	
	@ManyToOne
	@JsonIgnore
	private Questions question;
	
	private String response;
	private String feedback;
	private int score;
	public QuestionsFeedback() {
		super();
		// TODO Auto-generated constructor stub
	}
	public QuestionsFeedback(InterviewFeedback interviewFeedback, Questions question, String response, String feedback,
			int score) {
		super();
		this.interviewFeedback = interviewFeedback;
		this.question = question;
		this.response = response;
		this.feedback = feedback;
		this.score = score;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public InterviewFeedback getInterviewFeedback() {
		return interviewFeedback;
	}
	public void setInterviewFeedback(InterviewFeedback interviewFeedback) {
		this.interviewFeedback = interviewFeedback;
	}
	public Questions getQuestion() {
		return question;
	}
	public void setQuestion(Questions question) {
		this.question = question;
	}
	public String getResponse() {
		return response;
	}
	public void setResponse(String response) {
		this.response = response;
	}
	public String getFeedback() {
		return feedback;
	}
	public void setFeedback(String feedback) {
		this.feedback = feedback;
	}
	public int getScore() {
		return score;
	}
	public void setScore(int score) {
		this.score = score;
	}
	
	
	
}
