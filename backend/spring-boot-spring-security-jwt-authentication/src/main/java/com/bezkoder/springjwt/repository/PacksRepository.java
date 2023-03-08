package com.bezkoder.springjwt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bezkoder.springjwt.models.Pack;


@Repository
public interface PacksRepository extends JpaRepository<Pack, Integer> {

	
	
}
