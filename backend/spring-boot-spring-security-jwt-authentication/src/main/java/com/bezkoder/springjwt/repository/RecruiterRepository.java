package com.bezkoder.springjwt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bezkoder.springjwt.models.Recruiter;
import java.util.List;

@Repository
public interface RecruiterRepository extends JpaRepository<Recruiter, Integer> {
	List<Recruiter> findByIdIn(List<Integer> ids);
		
}
