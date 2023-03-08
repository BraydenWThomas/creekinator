package com.bezkoder.springjwt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bezkoder.springjwt.models.Interviewer;


@Repository
public interface InterviewerRepository extends JpaRepository<Interviewer, Integer> {

	
	
}
