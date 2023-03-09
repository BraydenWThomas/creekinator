package com.bezkoder.springjwt.models;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import java.util.List;
//import java.util.ArrayList;

@Entity
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property="id")
public class Book {
	/* --- fields --- */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String name;
	
	private int page;
	
	@OneToOne
	@JoinColumn(name="AUTHOR_NO")
	@JsonIgnore
	private Author author;
	/* --- End of fields --- */
	
	
	
	/* --- Constructors --- */
	public Book() {
		
	}
	
	public Book(String name, int page) {
		// this.id = id;
		this.name = name;
		this.page = page;
	}
	/* --- End of Constructors --- */
	
	
	/* --- Getters and setters --- */
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getPage() {
		return this.page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public Author getAuthor() {
		return this.author;
	}

	public void setAuthor(Author author) {
		this.author = author;
	}
	/* --- End of Getters and setters --- */
	
	
}