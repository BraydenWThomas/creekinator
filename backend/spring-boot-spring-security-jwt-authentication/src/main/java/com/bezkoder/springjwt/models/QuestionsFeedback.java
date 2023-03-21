package com.bezkoder.springjwt.models;

public class QuestionsFeedback {

	private int id;
	private InterviewFeedback interviewFeedbackId;
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
		this.interviewFeedbackId = interviewFeedbackId;
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
		return interviewFeedbackId;
	}
	public void setInterviewFeedbackId(InterviewFeedback interviewFeedbackId) {
		this.interviewFeedbackId = interviewFeedbackId;
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
