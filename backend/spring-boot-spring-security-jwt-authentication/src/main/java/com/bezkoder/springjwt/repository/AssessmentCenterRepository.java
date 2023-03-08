package com.bezkoder.springjwt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bezkoder.springjwt.models.AssessmentCenter;

@Repository
public interface AssessmentCenterRepository extends JpaRepository<AssessmentCenter, Integer> {

	
	
}
