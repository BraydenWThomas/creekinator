package com.bezkoder.springjwt.models;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

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
	  
	  for (Role role : roles) {
	  if (role.getName() == ERole.ROLE_SALES) {
		  System.out.println(this.getId());
	  }
	  if (role.getName() == ERole.ROLE_TECH) {
		  System.out.println(this.getId());
	  }
  }

	  
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
}
