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

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

@Entity
@Table(name = "interviews")
public class Interview {
	/* --- fields --- */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String form;
	
	@ManyToOne
	@JoinColumn(name = "FK_INTERVIEWER_NO")
	@JsonIgnore
	private Interviewer interviewer;
	
	@ManyToOne
	@JoinColumn(name = "FK_AC_NO")
	@JsonIgnore
	private AssessmentCenter assessmentCenter;
	
	@ManyToOne
	@JoinColumn(name = "FK_CANDIDATE_NO")
	@JsonIgnore
	private Candidate candidate;
	
	@ManyToMany
	@JoinTable(name = "interview_pack",
			joinColumns = @JoinColumn(name = "pack_id"),
				inverseJoinColumns = @JoinColumn(name = "interview_id"))
	@JsonIgnore
	private List<Pack> packs;
	/* --- End of fields --- */
	
	
	
	
	
	
	
	
	/* --- Constructors --- */
	public Interview() {
		super();
		this.packs = new ArrayList<Pack>();
		// TODO Auto-generated constructor stub
	}
	public Interview(String form) {
		super();
		this.form = form; // comment should be included in form
		this.packs = new ArrayList<Pack>();
	}
	public Interview(AssessmentCenter assessmentCenter,Interviewer interviewer,Candidate candidate, String form) {
		super();
		this.form = form; // comment should be included in form
		this.assessmentCenter = assessmentCenter;
		this.interviewer = interviewer;
		this.candidate = candidate;	
		this.packs = new ArrayList<Pack>();
	}
	public Interview(AssessmentCenter assessmentCenter,Interviewer interviewer,Candidate candidate, List<Pack> packs, String form) {
		super();
		this.form = form; // comment should be included in form
		this.assessmentCenter = assessmentCenter;
		this.interviewer = interviewer;
		this.candidate = candidate;	
		this.packs = packs;
	}
	/* --- End of Constructors --- */
	
	
	
	
	
	
	
	
	/* --- unlinked getter and setter --- */
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getForm() {
		return form;
	}
	public void setForm(String form) {
		this.form = form;
	}
	/* --- End of unlinked getter and setter --- */
	
	
	
	
	
	
	/* --- linked reference --- */
	// interviewer
	public Interviewer getInterviewer() {
		return interviewer;
	}
	public void setInterviewer(Interviewer interviewer) {
		this.interviewer = interviewer;
	}
	public void addInterviewer(Interviewer interviewer) {
		// need to unlink first, otherwise the otherside's reference remain
		if (this.interviewer != null) {
			removeInterviewer();
		}
		this.interviewer = interviewer;
		interviewer.getInterviews().add(this);
	}
	public void removeInterviewer() {
		this.interviewer = null;
		interviewer.getInterviews().remove(this);
	}
	
	// AssessmentCenter
	public AssessmentCenter getAssessmentCenter() {
		return assessmentCenter;
	}
	public void setAssessmentCenter(AssessmentCenter assessmentCenter) {
		this.assessmentCenter = assessmentCenter;
	}
	public void addAssessmentCenter(AssessmentCenter assessmentCenter) {
		//  need to unlink first, otherwise the otherside's reference remain
		if (this.assessmentCenter != null) {
			removeAssessmentCenter();
		}
		this.assessmentCenter = assessmentCenter;
		assessmentCenter.getInterviews().add(this);
	}
	public void removeAssessmentCenter() {
		this.assessmentCenter = null;
		assessmentCenter.getInterviews().remove(this);
	}
	
	
	// Candidate
	public Candidate getCandidate() {
		return candidate;
	}
	public void setCandidate(Candidate candidate) {
		this.candidate = candidate;
	}
	public void addCandidate(Candidate candidate) {
		//  need to unlink first, otherwise the otherside's reference remain
		if (this.candidate != null) {
			removeCandidate();
		}
		this.candidate = candidate;
		candidate.getInterviews().add(this);
	}
	public void removeCandidate() {
		this.candidate = null;
		candidate.getInterviews().remove(this);
	}
	
	// pack
	public List<Pack> getPacks() {
		return this.packs;
	}
	public void setPacks(List<Pack> packs) {
		this.packs = packs;
	}
	public void addPack(Pack pack) {
		this.getPacks().add(pack);
		pack.getInterviews().add(this);
	}
	public void removePack(Pack pack) {
		this.getPacks().remove(pack);
		pack.getInterviews().remove(this);
	}
}
