package com.bezkoder.springjwt.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bezkoder.springjwt.models.AssessmentCenter;

@Repository
public interface AssessmentCenterRepository extends JpaRepository<AssessmentCenter, Integer> {

	public List<AssessmentCenter> findAllByDate(LocalDate date);
	
}
