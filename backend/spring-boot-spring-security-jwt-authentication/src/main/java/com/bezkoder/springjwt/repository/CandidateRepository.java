package com.bezkoder.springjwt.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.bezkoder.springjwt.models.Candidate;


@Repository
public interface CandidateRepository extends JpaRepository<Candidate, Integer> {
	
	List<Candidate> findByIdIn(List<Integer> ids);
	
	@Query(value = "select c from Candidate c where (:firstName IS null OR c.first_name IS :firstName) AND (:lastName IS null OR c.last_name IS :lastName) AND (:appliedStream IS null OR c.applied_stream IS :appliedStream)")
	List<Candidate> getByFilter(
			@Param("firstName") String firstName,
			@Param("lastName") String lastName,
			@Param("appliedStream") String appliedStream);
}
