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
public class Author {
	/* --- fields --- */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String name;
	
	private int age;
	
	@OneToOne(mappedBy = "author")
	@JsonIgnore
	private Book book;
	/* --- End of fields --- */
	
	
	
	
	/* --- Constructors --- */
	public Author() {
		
	}
	
	public Author(String name, int age) {
		// this.id = id;
		this.name = name;
		this.age = age;
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

	public int getAge() {
		return this.age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public Book getBook() {
		return this.book;
	}

	public void setBook(Book book) {
		this.book = book;
	}
	/* --- End of Getters and setters --- */
	
	
}