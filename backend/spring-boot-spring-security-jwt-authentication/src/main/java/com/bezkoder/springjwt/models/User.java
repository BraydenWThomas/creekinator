package com.bezkoder.springjwt.models;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "users", 
    uniqueConstraints = { 
      @UniqueConstraint(columnNames = "username"),
      @UniqueConstraint(columnNames = "email") 
    })
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  @Size(max = 20)
  private String username;

  @NotBlank
  @Size(max = 50)
  @Email
  private String email;

  @NotBlank
  @Size(max = 120)
  private String password;
  
  private String name;
  
//  @NotFound(action=NotFoundAction.IGNORE)
//  private Interviewer interviewer;
//	private Recruiter recruiter;
  @OneToOne(mappedBy = "user")
  @JsonIgnore
  private Interviewer interviewer;
  
  
  
  
  @OneToOne(mappedBy = "user")
  @JsonIgnore
  private Recruiter recruiter;
  

  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(  name = "user_roles", 
        joinColumns = @JoinColumn(name = "user_id"), 
        inverseJoinColumns = @JoinColumn(name = "role_id"))
  private Set<Role> roles = new HashSet<>();

  public User() {
  }

  public User(String username, String email, String password, String name) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.name = name;
  }
  
  
  
  
//
//  public Interviewer getInterviewer() {
//	return interviewer;
//}
//
//public void setInterviewer(Interviewer interviewer) {
//	this.interviewer = interviewer;
//}
//
//public Recruiter getRecruiter() {
//	return recruiter;
//}
//
//public void setRecruiter(Recruiter recruiter) {
//	this.recruiter = recruiter;
//}

public String getName() {
	return name;
}

public void setName(String name) {
	this.name = name;
}

public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public Set<Role> getRoles() {
    return roles;
  }

  public void setRoles(Set<Role> roles) {
    this.roles = roles;
  }
  
  public void addRole(Role role) {
	  Set<Role> roles = new HashSet<>();
	  if (this.getRoles() != null) {
		  roles = this.getRoles();
	  }
	  roles.add(role);
	  this.roles = roles;
  }
  
  
  public void setInterviewer(Interviewer interviewer) {
	  this.interviewer = interviewer;
	  interviewer.setUser(this);
  }

  
  public Interviewer getInterviewer() {
	  return this.interviewer;
  }
  
  public void removeInterviewer() {
	  // assume the if user interview filed is empty, then the associated interview user field also have to be empty
	  if (this.interviewer == null) {
		  return;
	  }
	  this.interviewer.setUser(null);
	  this.interviewer = null;
  }
  
  public void setRecruiter(Recruiter recruiter) {
	  this.recruiter = recruiter;
	  recruiter.setUser(this);
  }
  
  public Recruiter getRecruiter() {
	  return this.recruiter;
  }
  
  public void removeRecruiter() {
	// assume the if user recruiter filed is empty, then the associated recruiter user field also have to be empty
		  if (this.recruiter == null) {
			  return;
		  }
	  this.recruiter.setUser(null);
	  this.recruiter = null;
  }
}
