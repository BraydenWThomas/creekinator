package com.bezkoder.springjwt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bezkoder.springjwt.models.Recruiter;


@Repository
public interface RecruiterRepository extends JpaRepository<Recruiter, Integer> {

	
	
}
