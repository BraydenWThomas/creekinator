package com.bezkoder.springjwt.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="QUESTIONS_FEEDBACK")
public class QuestionsFeedback {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@ManyToOne
	private InterviewFeedback interviewFeedback;
	
	@ManyToOne
	private Questions questionId;
	
	private String response;
	private String feedback;
	private int score;
	
	
	public QuestionsFeedback() {
		super();
		// TODO Auto-generated constructor stub
	}

	public QuestionsFeedback(InterviewFeedback interviewFeedbackId, Questions questionId, String response,
			String feedback, int score) {
		super();
		this.interviewFeedback = interviewFeedbackId;
		this.questionId = questionId;
		this.response = response;
		this.feedback = feedback;
		this.score = score;
	}

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public InterviewFeedback getInterviewFeedbackId() {
		return interviewFeedback;
	}
	public void setInterviewFeedbackId(InterviewFeedback interviewFeedbackId) {
		this.interviewFeedback = interviewFeedbackId;
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

	public Questions getQuestionId() {
		return questionId;
	}

	public void setQuestionId(Questions questionId) {
		this.questionId = questionId;
	}
	
	
	
}
