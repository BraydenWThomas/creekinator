package com.bezkoder.springjwt.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bezkoder.springjwt.models.Questions;

public interface QuestionsRepository extends JpaRepository<Questions, Integer>{

}
