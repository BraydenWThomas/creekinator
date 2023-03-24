package com.bezkoder.springjwt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bezkoder.springjwt.models.AssessmentCenter;
import com.bezkoder.springjwt.models.QuestionsFeedback;

@Repository
public interface QuestionsFeedbackRepository extends JpaRepository<QuestionsFeedback, Integer> {

	
	
}
