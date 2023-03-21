package com.bezkoder.springjwt.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.ManyToMany;
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
	private int id;
	private String pack_name;
	private String pack_type;
	private String link;
	
	// linked
	@ManyToMany(mappedBy = "packs")
	@JsonIgnore
	private List<Interview> interviews;
	/* --- end of fileds --- */
	
	
	
	/* --- Constructors --- */
	public Pack() {
		//super();
		this.interviews = new ArrayList<Interview>();
	}
	public Pack(String pack_name, String tech_pack, String sales_pack) {
		//super();
		this.pack_name = pack_name;
		this.pack_type = tech_pack;
		this.link = sales_pack;
		this.interviews = new ArrayList<Interview>();
	}
	/* --- End of Constructors --- */
	
	
	
	
	
	
	/* --- Normal getters and setters --- */

	public int getId() {
		return id;
	}
	public void setId(int id) {
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
	public String getLink() {
		return link;
	}
	public void setLink(String link) {
		this.link = link;
	}
	
	/* --- End of Normal getters and setters --- */
	
	
	
	
	
	/* --- linked --- */
	// interview
	public void setInterviews(List<Interview> interviews) {
		this.interviews = interviews;
	}
	public List<Interview> getInterviews(){
		return this.interviews;
	}
	public void addInterviews(Interview interview) {
		this.interviews.add(interview);
		interview.getPacks().add(this);
	}
	public void removeInterviews(Interview interview) {
		this.interviews.remove(interview);
		interview.getPacks().remove(this);
	}
}
