package com.bezkoder.springjwt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bezkoder.springjwt.models.Interviewer;
import java.util.List;

@Repository
public interface InterviewerRepository extends JpaRepository<Interviewer, Integer> {
	List<Interviewer> findByIdIn(List<Integer> ids);
	
	
}
