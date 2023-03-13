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

import com.bezkoder.springjwt.models.*;
import com.bezkoder.springjwt.repository.AssessmentCenterRepository;
import com.bezkoder.springjwt.repository.AuthorRepository;
import com.bezkoder.springjwt.repository.BookRepository;
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
	BookRepository bookRepository;
	AuthorRepository authorRepository;
	
	
	
	public EntityController(AssessmentCenterRepository assessmentCenterRepository, CandidateRepository candidateRepository ,
			InterviewerRepository interviewerRepository, InterviewsRepository interviewRepository, 
			PacksRepository packsRepository,RecruiterRepository recruiterRepository,
			BookRepository bookRepository,
			AuthorRepository authorRepository) {
		super();
		this.assessmentCenterRepository = assessmentCenterRepository;
		this.candidateRepository = candidateRepository;
		this.interviewerRepository = interviewerRepository;
		this.interviewRepository = interviewRepository;
		this.packsRepository = packsRepository;
		this.recruiterRepository = recruiterRepository;
		this.bookRepository = bookRepository;
		this.authorRepository = authorRepository;
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
		
		/* --- remove all bidirectional dependencies to avoid delete bug --- */
		AssessmentCenter assessmentCenter = assessmentCenterRepository.findById(acId).orElseThrow(()->
											new NotFoundException("Can't find transaction with id: " + acId));
		List<Interviewer> interviewers = assessmentCenter.getInterviewers();
		List<Interview> interviews = assessmentCenter.getInterviews();
		List<Candidate> candidates = assessmentCenter.getCandidates();
		
		// remove all interviewers
		while (! interviewers.isEmpty()) {
			assessmentCenter.removeInterviewer(interviewers.get(interviewers.size() - 1));
		}
		// remove all interviews
		while (! interviews.isEmpty()) {
			assessmentCenter.removeInterview(interviews.get(interviews.size() - 1));
		}
		// remove all candidates
		while (! candidates.isEmpty()) {
			assessmentCenter.removeCandidate(candidates.get(candidates.size() - 1));
		}
		assessmentCenterRepository.save(assessmentCenter);
		interviewerRepository.saveAll(interviewers);
		interviewRepository.saveAll(interviews);
		candidateRepository.saveAll(candidates);
		/* --- end of remove all bidirectional dependencies to avoid delete bug --- */
		
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
	
<<<<<<< HEAD
=======
	// show all candidates in an specific ac 
	@GetMapping("/ac/{id}/showCandidates")
	public List<Candidate> showACCandidates(@PathVariable int id) {
		AssessmentCenter assessmentCenter = assessmentCenterRepository.findById(id).orElseThrow(()->new NotFoundException("Can't find transaction with id: " + id));
		return assessmentCenter.getCandidates();
	}	
	
	// show all interviewers in an specific ac 
	@GetMapping("/ac/{id}/showInterviewers")
	public List<Interviewer> showACInterviewers(@PathVariable int id) {
		AssessmentCenter assessmentCenter = assessmentCenterRepository.findById(id).orElseThrow(()->new NotFoundException("Can't find transaction with id: " + id));
		return assessmentCenter.getInterviewers();
	}
	
	// add new candidates with a specific ac, raise error if ac not exist or any id of candidate id list not existed in database
	@PutMapping("/ac/{id}/addCandidates")
	public List<Candidate> addACCandidates(@PathVariable int id, 
			@RequestParam(required = true, name = "candidateIds") int[] candidatesIds) {
		AssessmentCenter assessmentCenter = assessmentCenterRepository.findById(id).orElseThrow(()->new NotFoundException("Can't find transaction with id: " + id));
		List<Candidate> candidates = new ArrayList<Candidate>();
		//int addedCandidates = new int[];
		// TODO, test case that the candidate already linked to AC
		for (int candidateId : candidatesIds) {
			Candidate candidate = candidateRepository.findById(candidateId).orElseThrow(()->new NotFoundException("Can't find transaction with id: " + candidateId));
			assessmentCenter.addCandidate(candidate);
			candidates.add(candidate);
			assessmentCenterRepository.save(assessmentCenter);
			candidateRepository.save(candidate);
		}
		return candidates;
	}
	
	// add new interviewer with a specific ac, raise error if ac not exist or any id of interviewer id list not existed in database
	@PutMapping("/ac/{id}/addInterviewers")
	public List<Interviewer> addACInterviewers(@PathVariable int id, 
			@RequestParam(required = true, name = "interviewerIds") int[] interviewerIds) {
		AssessmentCenter assessmentCenter = assessmentCenterRepository.findById(id).orElseThrow(()->new NotFoundException("Can't find transaction with id: " + id));
		List<Interviewer> interviewers = new ArrayList<Interviewer>();
		//int addedCandidates = new int[];
		// TODO, test case that the candidate already linked to AC
		for (int interviewerId : interviewerIds) {
			Interviewer interviewer = interviewerRepository.findById(interviewerId).orElseThrow(()->new NotFoundException("Can't find transaction with id: " + interviewerId));
			assessmentCenter.addInterviewer(interviewer);
			interviewers.add(interviewer);
			assessmentCenterRepository.save(assessmentCenter);
			interviewerRepository.save(interviewer);
		}
		return interviewers;
	}
	
	// add new candidates with a specific ac, raise error if ac not exist or any id of candidate id list not existed in database
	@PutMapping("/ac/{id}/deleteCandidates")
	public List<Candidate> deleteACCandidates(@PathVariable int id, 
			@RequestParam(required = true, name = "candidateIds") int[] candidatesIds) {
		AssessmentCenter assessmentCenter = assessmentCenterRepository.findById(id).orElseThrow(()->new NotFoundException("Can't find transaction with id: " + id));
		List<Candidate> candidates = new ArrayList<Candidate>();
		//int addedCandidates = new int[];
		// TODO, test case that the candidate already linked to AC
		for (int candidateId : candidatesIds) {
			Candidate candidate = candidateRepository.findById(candidateId).orElseThrow(()->new NotFoundException("Can't find transaction with id: " + candidateId));
			assessmentCenter.removeCandidate(candidate);
			candidates.add(candidate);
			assessmentCenterRepository.save(assessmentCenter);
			candidateRepository.save(candidate);
		}
		return candidates;
	}
	
	// delete interviewers from an AC
	@PutMapping("/ac/{id}/deleteInterviewers")
	public List<Interviewer> deleteACInterviewers(@PathVariable int id, 
			@RequestParam(required = true, name = "interviewerIds") int[] interviewerIds) {
		AssessmentCenter assessmentCenter = assessmentCenterRepository.findById(id).orElseThrow(()->new NotFoundException("Can't find transaction with id: " + id));
		List<Interviewer> interviewers = new ArrayList<Interviewer>();
		//int addedCandidates = new int[];
		// TODO, test case that the candidate already linked to AC
		for (int interviewerId : interviewerIds) {
			Interviewer interviewer = interviewerRepository.findById(interviewerId).orElseThrow(()->new NotFoundException("Can't find transaction with id: " + interviewerId));
			assessmentCenter.removeInterviewer(interviewer);
			interviewers.add(interviewer);
			assessmentCenterRepository.save(assessmentCenter);
			interviewerRepository.save(interviewer);
		}
		return interviewers;
	}
	
	
	
	
	/*
>>>>>>> bee0bfd7677a8992e78e8bd22af562a5e2d9151f
	//Add Pack to AC
	@PutMapping("/ac/{acId}/addPack")
	public AssessmentCenter addPackToAc(@PathVariable int acId,@RequestParam int packId) {
		
		AssessmentCenter tempAC = assessmentCenterRepository.getReferenceById(acId);
		tempAC.setPack(packsRepository.getReferenceById(packId));
		return assessmentCenterRepository.save(tempAC);
	}
	
//	//Add Pack to AC
//	@PutMapping("/ac/{acId}/addRecruiter")
//	public AssessmentCenter addRecruiterToAc(@PathVariable int acId,@RequestParam int rec) {
//		
//		AssessmentCenter tempAC = assessmentCenterRepository.getReferenceById(acId);
//		tempAC.setPack(packsRepository.getReferenceById(packId));
//		return assessmentCenterRepository.save(tempAC);
//	}
<<<<<<< HEAD
	
=======

		
>>>>>>> bee0bfd7677a8992e78e8bd22af562a5e2d9151f
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
		
		/* remove dependency before deletion */
		Candidate candidate = candidateRepository.findById(candidateId).orElseThrow(()->new NotFoundException("Can't find transaction with id: " + candidateId));
		List<Interview> interviews = candidate.getInterviews();
		while (! interviews.isEmpty()) {
			candidate.removeInterview(interviews.get(interviews.size() - 1));
		}
		candidateRepository.save(candidate);
		interviewRepository.saveAll(interviews);
		/* End of remove dependency before deletion */
		
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
		
		/* --- remove all bidirectional dependencies to avoid delete bug --- */
		Interviewer interviewer = interviewerRepository.findById(interviewerId).orElseThrow(()->new NotFoundException("Can't find transaction with id: " +interviewerId));
		List<Interview> interviews = interviewer.getInterviews();
		// remove interviews
		while (! interviews.isEmpty()) {
			interviewer.removeInterview(interviews.get(interviews.size()-1)); // remove from last
		}
		interviewerRepository.save(interviewer);
		interviewRepository.saveAll(interviews);
		/* --- end of remove all bidirectional dependencies to avoid delete bug --- */
		
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
		
		/* --- remove all bidirectional dependencies to avoid delete bug --- */
		Pack pack = packsRepository.findById(packId).orElseThrow(()->new NotFoundException("Can't find transaction with id: " +packId));
		// remove interviews
		List<AssessmentCenter> assessmentCenters = pack.getAssessmentCenters();
		while (! assessmentCenters.isEmpty()) {
			pack.removeAssessmentCenter(assessmentCenters.get(assessmentCenters.size() - 1));
		}
		this.packsRepository.save(pack);
		this.assessmentCenterRepository.saveAll(assessmentCenters);
		/* --- end of remove all bidirectional dependencies to avoid delete bug --- */
		
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
		
		/* --- remove all bidirectional dependencies to avoid delete bug --- */
		Recruiter recruiter = recruiterRepository.findById(recruiterId).orElseThrow(()->new NotFoundException("Can't find transaction with id: " +recruiterId));
		// remove assessmentCenter
		List<AssessmentCenter> assessmentCenters = recruiter.getAssessmentCenters();
		while (! assessmentCenters.isEmpty()) {
			recruiter.removeAssessmentCenter(assessmentCenters.get(assessmentCenters.size() - 1));
		}
		this.recruiterRepository.save(recruiter);
		this.assessmentCenterRepository.saveAll(assessmentCenters);
		/* --- end of remove all bidirectional dependencies to avoid delete bug --- */
		
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
	
	
	
	
	
	
	
	/* --- Book --- */
	
	// Get all Recruiter
	@GetMapping("/book")
	public List<Book> getAllBook() {
		return bookRepository.findAll();
	}
	
	// Get specific Recruiter
	@GetMapping("/book/{id}")
	public Book getBookbyId(@PathVariable int id) {
		return bookRepository.findById(id).orElseThrow(()->new NotFoundException("Can't find transaction with id: " + id));
	}
	
	// Delete Recruiter
	@DeleteMapping("/book/{id}")
	public void deleteBookById(@PathVariable int id) {
		if (bookRepository.findById(id).isEmpty()) {
			throw new NotFoundException("Can't find transaction with id: " + id);
		}
		bookRepository.deleteById(id);
	}	
	
	//Create Recruiter
	@PostMapping("/book")
	@ResponseStatus(HttpStatus.CREATED)
	public Book createBook(@RequestBody Book book) {
		return bookRepository.save(book);
	}
	
	//Modify Recruiter
	@PutMapping("/book")
	@ResponseStatus(HttpStatus.CREATED)
	public Book modifyBook(@RequestBody Book book) {
		if (bookRepository.findById(book.getId()).isEmpty()) {
			throw new NotFoundException("Can't find transaction with id: " + book.getId());
		}
		return bookRepository.save(book);
	}
	/* --- End of Book --- */
	
	
	
	
	
	
	
	/* --- Author --- */
	
	// Get all Recruiter
	@GetMapping("/author")
	public List<Author> getAllAuthor() {
		return authorRepository.findAll();
	}
	
	// Get specific Recruiter
	@GetMapping("/author/{id}")
	public Author getAuthorbyId(@PathVariable int id) {
		return authorRepository.findById(id).orElseThrow(()->new NotFoundException("Can't find transaction with id: " + id));
	}
	
	// Delete Recruiter
	@DeleteMapping("/author/{id}")
	public void deleteAuthorById(@PathVariable int id) {
		if (authorRepository.findById(id).isEmpty()) {
			throw new NotFoundException("Can't find transaction with id: " + id);
		}
		authorRepository.deleteById(id);
	}	
	
	//Create Recruiter
	@PostMapping("/author")
	@ResponseStatus(HttpStatus.CREATED)
	public Author createAuthor(@RequestBody Author author) {
		return authorRepository.save(author);
	}
	
	//Modify Recruiter
	@PutMapping("/author")
	@ResponseStatus(HttpStatus.CREATED)
	public Author modifyAuthor(@RequestBody Author author) {
		if (authorRepository.findById(author.getId()).isEmpty()) {
			throw new NotFoundException("Can't find transaction with id: " + author.getId());
		}
		return authorRepository.save(author);
	}
	/* --- End of Author --- */
	
	
	
}
