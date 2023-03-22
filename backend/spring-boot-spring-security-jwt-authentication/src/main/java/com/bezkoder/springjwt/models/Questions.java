package com.bezkoder.springjwt.models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class Questions {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@ManyToOne
	private Pack pack;
	
	private String question;
	private String answer;
	
	@OneToMany(mappedBy = "question")
	private List<QuestionsFeedback> feedback;
	
	public Questions() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Questions(Pack pack, String question, String answer, List<QuestionsFeedback> feedback) {
		super();
		this.pack = pack;
		this.question = question;
		this.answer = answer;
		this.feedback = feedback;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Pack getPackId() {
		return pack;
	}

	public void setPackId(Pack packId) {
		this.pack = packId;
	}

	public String getQuestion() {
		return question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	public String getAnswer() {
		return answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}

	public List<QuestionsFeedback> getFeedback() {
		return feedback;
	}

	public void setFeedback(List<QuestionsFeedback> feedback) {
		this.feedback = feedback;
	}
	
	
	
	
}
