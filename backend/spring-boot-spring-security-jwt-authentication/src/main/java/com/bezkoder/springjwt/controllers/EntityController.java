package com.bezkoder.springjwt.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.bezkoder.springjwt.models.AssessmentCenter;
import com.bezkoder.springjwt.models.Candidate;
import com.bezkoder.springjwt.models.Interview;
import com.bezkoder.springjwt.models.Interviewer;
import com.bezkoder.springjwt.models.Pack;
import com.bezkoder.springjwt.models.Recruiter;
import com.bezkoder.springjwt.repository.AssessmentCenterRepository;
import com.bezkoder.springjwt.repository.CandidateRepository;
import com.bezkoder.springjwt.repository.InterviewerRepository;
import com.bezkoder.springjwt.repository.InterviewsRepository;
import com.bezkoder.springjwt.repository.PacksRepository;
import com.bezkoder.springjwt.repository.RecruiterRepository;
import com.bezkoder.springjwt.exceptions.NotFoundException;


//#TODO REMOVE ALL THINGS WITH TRANSACTION

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class EntityController {
	
	AssessmentCenterRepository assessmentCenterRepository;
	CandidateRepository candidateRepository;
	InterviewerRepository interviewerRepository;
	InterviewsRepository interviewRepository;
	PacksRepository packsRepository;
	RecruiterRepository recruiterRepository;
	
	
	
	public EntityController(AssessmentCenterRepository assessmentCenterRepository, CandidateRepository candidateRepository ,
			InterviewerRepository interviewerRepository, InterviewsRepository interviewRepository, 
			PacksRepository packsRepository,RecruiterRepository recruiterRepository) {
		super();
		this.assessmentCenterRepository = assessmentCenterRepository;
		this.candidateRepository = candidateRepository;
		this.interviewerRepository = interviewerRepository;
		this.interviewRepository = interviewRepository;
		this.packsRepository = packsRepository;
		this.recruiterRepository = recruiterRepository;
	}
	

	/* --- Assessment Center --- CRUD */
	
	// Get all AC
	@GetMapping("/ac")
	//@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('RECRUITER')")
	public List<AssessmentCenter> getAllAC() {
		return assessmentCenterRepository.findAll();
	}
	
	// Get specific AC
	@GetMapping("/ac/{acId}")
	public AssessmentCenter getACbyId(@PathVariable int acId) {
		return assessmentCenterRepository.findById(acId).orElseThrow(()->new NotFoundException("Can't find transaction with id: " +acId));
	}
	
	// Delete AC
	@DeleteMapping("/ac/{acId}")
	public void deleteAcById(@PathVariable int acId) {
		if (assessmentCenterRepository.findById(acId).isEmpty()) {
			throw new NotFoundException("Can't find transaction with id: " + acId);
		}
		assessmentCenterRepository.deleteById(acId);
	}	
	
	//Create AC
	@PostMapping("/ac")
	@ResponseStatus(HttpStatus.CREATED)
	public AssessmentCenter createAc(@RequestBody AssessmentCenter assessmentCenter) {
		return assessmentCenterRepository.save(assessmentCenter);
	}
	
	//Modify AC
	@PutMapping("/ac")
	@ResponseStatus(HttpStatus.CREATED)
	public AssessmentCenter modifyAc(@RequestBody AssessmentCenter assessmentCenter) {
		if (assessmentCenterRepository.findById(assessmentCenter.getId()).isEmpty()) {
			throw new NotFoundException("Can't find transaction with id: " + assessmentCenter.getId());
		}
		return assessmentCenterRepository.save(assessmentCenter);
	}
	
	//Add Pack to AC
	@PutMapping("/ac/{acId}/addPack")
	public AssessmentCenter addPackToAc(@PathVariable int acId,@RequestParam int packId) {
		
		AssessmentCenter tempAC = assessmentCenterRepository.getReferenceById(acId);
		tempAC.setPack(packsRepository.getReferenceById(packId));
		return assessmentCenterRepository.save(tempAC);
	}
	
	/* --- End of Assessment Center --- */	
	
	
	/* --- Candidate --- */
	
	// Get all Candidate
	@GetMapping("/candidate")
	public List<Candidate> getAllCandidate(@RequestParam (required=false) String firstName,
			@RequestParam (required=false) String lastName,
			@RequestParam (required=false) String appliedStream) {
		
		
		
		return candidateRepository.findAll();
	}
	
	// Get specific Candidate
	@GetMapping("/candidate/{candidateId}")
	public Candidate getCandidatebyId(@PathVariable int candidateId) {
		return candidateRepository.findById(candidateId).orElseThrow(()->new NotFoundException("Can't find transaction with id: " +candidateId));
	}
	
	// Delete Candidate
	@DeleteMapping("/candidate/{candidateId}")
	public void deleteCandidateById(@PathVariable int candidateId) {
		if (candidateRepository.findById(candidateId).isEmpty()) {
			throw new NotFoundException("Can't find transaction with id: " + candidateId);
		}
		candidateRepository.deleteById(candidateId);
	}	
	
	//Create Candidate
	@PostMapping("/candidate")
	@ResponseStatus(HttpStatus.CREATED)
	public Candidate createCandidate(@RequestBody Candidate candidate) {
		return candidateRepository.save(candidate);
	}
	
	//Modify Candidate
	@PutMapping("/candidate")
	@ResponseStatus(HttpStatus.CREATED)
	public Candidate modifyCandidate(@RequestBody Candidate candidate) {
		if (candidateRepository.findById(candidate.getId()).isEmpty()) {
			throw new NotFoundException("Can't find transaction with id: " + candidate.getId());
		}
		return candidateRepository.save(candidate);
	}
	/* --- End of Candidate --- */
	
	
	/* --- Interviewer --- */
	
	// Get all Interviewer
	@GetMapping("/interviewer")
	public List<Interviewer> getAllInterviewer() {
		return interviewerRepository.findAll();
	}
	
	// Get specific Interviewer
	@GetMapping("/interviewer/{interviewerId}")
	public Interviewer getInterviewerbyId(@PathVariable int interviewerId) {
		return interviewerRepository.findById(interviewerId).orElseThrow(()->new NotFoundException("Can't find transaction with id: " +interviewerId));
	}
	
	// Delete Interviewer
	@DeleteMapping("/interviewer/{interviewerId}")
	public void deleteInterviewerById(@PathVariable int interviewerId) {
		if (interviewerRepository.findById(interviewerId).isEmpty()) {
			throw new NotFoundException("Can't find transaction with id: " + interviewerId);
		}
		interviewerRepository.deleteById(interviewerId);
	}	
	
	//Create Interviewer
	@PostMapping("/interviewer")
	@ResponseStatus(HttpStatus.CREATED)
	public Interviewer createInterviewer(@RequestBody Interviewer interviewer) {
		return interviewerRepository.save(interviewer);
	}
	
	//Modify Interviewer
	@PutMapping("/interviewer")
	@ResponseStatus(HttpStatus.CREATED)
	public Interviewer modifyInterviewer(@RequestBody Interviewer interviewer) {
		if (interviewerRepository.findById(interviewer.getId()).isEmpty()) {
			throw new NotFoundException("Can't find transaction with id: " + interviewer.getId());
		}
		return interviewerRepository.save(interviewer);
	}
	/* --- End of Interviewer --- */
	
	
	/* --- Interviews --- */
	
	// Get all Interviews
	@GetMapping("/interview")
	public List<Interview> getAllInterviews() {
		return interviewRepository.findAll();
	}
	
	// Get specific Interviews
	@GetMapping("/interview/{interviewId}")
	public Interview getInterviewbyId(@PathVariable int interviewId) {
		return interviewRepository.findById(interviewId).orElseThrow(()->new NotFoundException("Can't find transaction with id: " +interviewId));
	}
	
	// Delete Interview
	@DeleteMapping("/interview/{interviewId}")
	public void deleteInterviewById(@PathVariable int interviewId) {
		if (interviewRepository.findById(interviewId).isEmpty()) {
			throw new NotFoundException("Can't find transaction with id: " + interviewId);
		}
		interviewRepository.deleteById(interviewId);
	}	
	
	//Create Interview
	@PostMapping("/interview")
	@ResponseStatus(HttpStatus.CREATED)
	public Interview createInterview(@RequestBody Interview interview) {
		return interviewRepository.save(interview);
	}
	
	//Modify Interview
	@PutMapping("/interview")
	@ResponseStatus(HttpStatus.CREATED)
	public Interview modifyInterview(@RequestBody Interview interview) {
		if (interviewRepository.findById(interview.getId()).isEmpty()) {
			throw new NotFoundException("Can't find transaction with id: " + interview.getId());
		}
		return interviewRepository.save(interview);
	}
	/* --- End of Interviews --- */
	
	
	/* --- Packs --- */
	
	// Get all Packs
	@GetMapping("/pack")
	public List<Pack> getAllPacks() {
		return packsRepository.findAll();
	}
	
	// Get specific Pack
	@GetMapping("/pack/{packId}")
	public Pack getPackbyId(@PathVariable int packId) {
		return packsRepository.findById(packId).orElseThrow(()->new NotFoundException("Can't find transaction with id: " +packId));
	}	
	
	// Delete Pack
	@DeleteMapping("/pack/{packId}")
	public void deletePackById(@PathVariable int packId) {
		if (packsRepository.findById(packId).isEmpty()) {
			throw new NotFoundException("Can't find transaction with id: " + packId);
		}
		packsRepository.deleteById(packId);
	}	
	
	//Create Pack
	@PostMapping("/pack")
	@ResponseStatus(HttpStatus.CREATED)
	public Pack createPack(@RequestBody Pack pack) {
		return packsRepository.save(pack);
	}
	
	//Modify Pack
	@PutMapping("/pack")
	@ResponseStatus(HttpStatus.CREATED)
	public Pack modifyPack(@RequestBody Pack pack) {
		if (packsRepository.findById(pack.getId()).isEmpty()) {
			throw new NotFoundException("Can't find transaction with id: " + pack.getId());
		}
		return packsRepository.save(pack);
	}
	/* --- End of Packs --- */
	
	
	/* --- Recruiter --- */
	
	// Get all Recruiter
	@GetMapping("/recruiter")
	public List<Recruiter> getAllRecruiter() {
		return recruiterRepository.findAll();
	}
	
	// Get specific Recruiter
	@GetMapping("/recruiter/{recruiterId}")
	public Recruiter getRecruiterbyId(@PathVariable int recruiterId) {
		return recruiterRepository.findById(recruiterId).orElseThrow(()->new NotFoundException("Can't find transaction with id: " +recruiterId));
	}
	
	// Delete Recruiter
	@DeleteMapping("/recruiter/{recruiterId}")
	public void deleteRecruiterById(@PathVariable int recruiterId) {
		if (recruiterRepository.findById(recruiterId).isEmpty()) {
			throw new NotFoundException("Can't find transaction with id: " + recruiterId);
		}
		recruiterRepository.deleteById(recruiterId);
	}	
	
	//Create Recruiter
	@PostMapping("/recruiter")
	@ResponseStatus(HttpStatus.CREATED)
	public Recruiter createRecruiter(@RequestBody Recruiter recruiter) {
		return recruiterRepository.save(recruiter);
	}
	
	//Modify Recruiter
	@PutMapping("/recruiter")
	@ResponseStatus(HttpStatus.CREATED)
	public Recruiter modifyRecruiter(@RequestBody Recruiter recruiter) {
		if (recruiterRepository.findById(recruiter.getId()).isEmpty()) {
			throw new NotFoundException("Can't find transaction with id: " + recruiter.getId());
		}
		return recruiterRepository.save(recruiter);
	}
	/* --- End of Recruiter --- */
	
	
	
}
