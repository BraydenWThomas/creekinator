package com.bezkoder.springjwt.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bezkoder.springjwt.models.AssessmentCenter;
import com.bezkoder.springjwt.models.Interview;
import com.bezkoder.springjwt.models.Interviewer;


@Repository
public interface InterviewsRepository extends JpaRepository<Interview, Integer> {
	
	public List<Interview> findByIdIn(List<Integer> ids);
	
	public List<Interview> findAllByAssessmentCenterAndInterviewer(AssessmentCenter assessmentCentre, Interviewer interviewer);
	
}
