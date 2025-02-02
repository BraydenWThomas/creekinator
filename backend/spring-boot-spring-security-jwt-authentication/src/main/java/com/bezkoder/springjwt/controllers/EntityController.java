package com.bezkoder.springjwt.controllers;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
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
import com.bezkoder.springjwt.repository.CandidateRepository;
import com.bezkoder.springjwt.repository.InterviewFeedbackRepository;
import com.bezkoder.springjwt.repository.InterviewerRepository;
import com.bezkoder.springjwt.repository.InterviewsRepository;
import com.bezkoder.springjwt.repository.PacksRepository;
import com.bezkoder.springjwt.repository.QuestionsFeedbackRepository;
import com.bezkoder.springjwt.repository.QuestionsRepository;
import com.bezkoder.springjwt.repository.RecruiterRepository;
import com.bezkoder.springjwt.repository.RoleRepository;
import com.bezkoder.springjwt.repository.UserRepository;
import com.bezkoder.springjwt.exceptions.BadRequestException;
import com.bezkoder.springjwt.exceptions.NotFoundException;

import org.json.simple.JSONObject;
import org.json.simple.*;

// the use this ------------------------------------

//#TODO REMOVE ALL THINGS WITH TRANSACTION

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class EntityController {

	/* --- fileds --- */
	AssessmentCenterRepository assessmentCenterRepository;
	CandidateRepository candidateRepository;
	InterviewerRepository interviewerRepository;
	InterviewsRepository interviewRepository;
	PacksRepository packsRepository;
	RecruiterRepository recruiterRepository;
	UserRepository userRepository;
	RoleRepository roleRepository;
	QuestionsFeedbackRepository questionsFeedbackRepository;
	InterviewFeedbackRepository interviewFeedbackRepository;
	QuestionsRepository questionsRepository;
	/* --- end of fields --- */

	/* --- constructor --- */
	// TODO autowire attribute should be able to avoid doing this section
	public EntityController(AssessmentCenterRepository assessmentCenterRepository,
			CandidateRepository candidateRepository, InterviewerRepository interviewerRepository,
			InterviewsRepository interviewRepository, PacksRepository packsRepository,
			RecruiterRepository recruiterRepository, UserRepository userRepository, RoleRepository roleRepository,
			QuestionsFeedbackRepository questionsFeedbackRepository,
			InterviewFeedbackRepository interviewFeedbackRepository, QuestionsRepository questionsRepository) {
		super();
		this.assessmentCenterRepository = assessmentCenterRepository;
		this.candidateRepository = candidateRepository;
		this.interviewerRepository = interviewerRepository;
		this.interviewRepository = interviewRepository;
		this.packsRepository = packsRepository;
		this.recruiterRepository = recruiterRepository;
		this.userRepository = userRepository;
		this.roleRepository = roleRepository;
		this.questionsFeedbackRepository = questionsFeedbackRepository;
		this.interviewFeedbackRepository = interviewFeedbackRepository;
		this.questionsRepository = questionsRepository;
	}
	/* --- end of constructor --- */

	/* --- Assessment Center --- CRUD */

	// Get all AC
	@GetMapping("/ac")
	// @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or
	// hasRole('RECRUITER')")
	public List<AssessmentCenter> getAllAC() {
		return assessmentCenterRepository.findAll();
	}

	// Get specific AC
	@GetMapping("/ac/{acId}")
	public AssessmentCenter getACbyId(@PathVariable int acId) {
		return assessmentCenterRepository.findById(acId)
				.orElseThrow(() -> new NotFoundException("Can't find AC with id: " + acId));
	}

	
	// Get specific AC, with detailed info
	@GetMapping("/ac/{acId}/detailed")
	public HashMap<String, Object> getACbyIdDetailed(@PathVariable int acId) {
		AssessmentCenter ac = 
				assessmentCenterRepository.findById(acId).orElseThrow(()->new NotFoundException("Can't find AC with id: " +acId));
		
		HashMap<String, Object> output = new HashMap<String, Object>();
		
		output.put("ac info", ac);
		output.put("interviewers", ac.getInterviewers());
		output.put("interviews", ac.getInterviewers());
		output.put("candidates", ac.getCandidates());
		output.put("recruiters", ac.getRecruiters());
		return output;
	}
	

	// Delete AC
	@DeleteMapping("/ac/{acId}")
	public void deleteAcById(@PathVariable int acId) {

		/* --- remove all bidirectional dependencies to avoid delete bug --- */
		AssessmentCenter assessmentCenter = assessmentCenterRepository.findById(acId)
				.orElseThrow(() -> new NotFoundException("Can't find AC with id: " + acId));

		List<Interviewer> interviewers = assessmentCenter.getInterviewers();
		List<Interview> interviews = assessmentCenter.getInterviews();
		List<Candidate> candidates = assessmentCenter.getCandidates();
		// remove all interviewers
		while (!interviewers.isEmpty()) {
			assessmentCenter.removeInterviewer(interviewers.get(interviewers.size() - 1));
		}
		// remove all interviews
		while (!interviews.isEmpty()) {
			assessmentCenter.removeInterview(interviews.get(interviews.size() - 1));
		}
		// remove all candidates
		while (!candidates.isEmpty()) {
			assessmentCenter.removeCandidate(candidates.get(candidates.size() - 1));
		}
		assessmentCenterRepository.save(assessmentCenter);
		interviewerRepository.saveAll(interviewers);
		interviewRepository.saveAll(interviews);
		candidateRepository.saveAll(candidates);
		/* --- end of remove all bidirectional dependencies to avoid delete bug --- */

		assessmentCenterRepository.deleteById(acId);
	}

	// Create AC
	@PostMapping("/ac")
	@ResponseStatus(HttpStatus.CREATED)
	public AssessmentCenter createAc(@RequestBody AssessmentCenter assessmentCenter,
			@RequestParam(required = false, name = "candidates") int[] candidates,
			@RequestParam(required = false, name = "interviews") int[] interviews,
			@RequestParam(required = false, name = "interviewers") int[] interviewers,
			@RequestParam(required = false, name = "recruiters") int[] recruiters) {

		// check if ac time overlaps
		// TODO: Need to write a check if an AC Will span over multiple assessent centers
		for (AssessmentCenter ac : getAllAC()) {
			if (ac.getDate().equals(assessmentCenter.getDate())) {

				if ((assessmentCenter.getStart_time().isAfter(ac.getStart_time())
						|| assessmentCenter.getStart_time().equals(ac.getStart_time()))
						&& (assessmentCenter.getFinish_time().isBefore(ac.getFinish_time())
								|| assessmentCenter.getFinish_time().equals(ac.getFinish_time()))

						|| (assessmentCenter.getStart_time().isAfter(ac.getStart_time())
								|| assessmentCenter.getStart_time().equals(ac.getStart_time()))
								&& (assessmentCenter.getStart_time().isBefore(ac.getFinish_time())
										|| assessmentCenter.getStart_time().equals(ac.getFinish_time()))

						|| (assessmentCenter.getFinish_time().isAfter(ac.getStart_time())
								|| assessmentCenter.getFinish_time().equals(ac.getStart_time()))
								&& (assessmentCenter.getFinish_time().isBefore(ac.getFinish_time())
										|| assessmentCenter.getFinish_time().equals(ac.getFinish_time()))) {
					System.out.println(ac.getDate() + " " + ac.getStart_time() + " " + ac.getFinish_time());
					throw new BadRequestException("An AC has been scheduled in this time");
				}
			}
		}

		// int acId = assessmentCenter.getId();
		if (candidates != null) {
			for (int candidateID : candidates) {
				Candidate candidate = candidateRepository.findById(candidateID)
						.orElseThrow(() -> new NotFoundException("Can't find candidate with id: " + candidateID));
				assessmentCenter.addCandidate(candidate);
				assessmentCenterRepository.save(assessmentCenter);
				candidateRepository.save(candidate);
			}
		}
		if (interviews != null) {
			for (int interviewId : interviews) {
				Interview interview = interviewRepository.findById(interviewId)
						.orElseThrow(() -> new NotFoundException("Can't find interview with id: " + interviewId));
				assessmentCenter.addInterview(interview);
				assessmentCenterRepository.save(assessmentCenter);
				interviewRepository.save(interview);
			}
		}
		if (interviewers != null) {
			for (int interviewerId : interviewers) {
				Interviewer interviewer = interviewerRepository.findById(interviewerId)
						.orElseThrow(() -> new NotFoundException("Can't find interviewer with id: " + interviewerId));
				assessmentCenter.addInterviewer(interviewer);
				assessmentCenterRepository.save(assessmentCenter);
				interviewerRepository.save(interviewer);
			}
		}
		if (recruiters != null) {
			for (int recruiterId : recruiters) {
				Recruiter recruiter = recruiterRepository.findById(recruiterId)
						.orElseThrow(() -> new NotFoundException("Can't find recruiter with id: " + recruiterId));
				assessmentCenter.addRecruiter(recruiter);
				assessmentCenterRepository.save(assessmentCenter);
				recruiterRepository.save(recruiter);
			}
		}

		return assessmentCenterRepository.save(assessmentCenter);
	}

	// Modify AC
	@PutMapping("/ac")
	@ResponseStatus(HttpStatus.CREATED)
	public AssessmentCenter modifyAc(@RequestBody AssessmentCenter assessmentCenter) {
		if (assessmentCenterRepository.findById(assessmentCenter.getId()).isEmpty()) {
			throw new NotFoundException("Can't find AC with id: " + assessmentCenter.getId());
		}
		return assessmentCenterRepository.save(assessmentCenter);
	}
	
	// update list of objects that AC holds
	@PutMapping("/ac/{id}/updateLinkedInfo")
	public void updateLinkedInfo(@RequestParam(required = false, name = "interviewerIds") List<Integer> interviewerIds,
			@RequestParam(required = false, name = "interviewIds") List<Integer> interviewIds,
			@RequestParam(required = false, name = "candidateIds") List<Integer> candidateIds,
			@RequestParam(required = false, name = "recruiterIds") List<Integer> recruiterIds,
			@PathVariable int id) {
		
		// get target ac
		AssessmentCenter ac = assessmentCenterRepository.findById(id).orElseThrow(() -> 
			new NotFoundException("Can't find AC with id: " + id));
		
		// update each list
		if (interviewerIds != null) {
			List<Interviewer> interviewers = interviewerRepository.findByIdIn(interviewerIds);
			ac.replaceInterviewers(interviewers);
			// assessmentCenterRepository.save(ac);
			interviewerRepository.saveAll(interviewers);
		}
		if (interviewIds != null) {
			List<Interview> interviews = interviewRepository.findAllById(interviewIds);
			ac.replaceInterviews(interviews);
			// assessmentCenterRepository.save(ac);
			interviewRepository.saveAll(interviews);
		}
		if (candidateIds != null) {
			List<Candidate> candidates = candidateRepository.findByIdIn(candidateIds);
			ac.replaceCandidates(candidates);
			// assessmentCenterRepository.save(ac);
			candidateRepository.saveAll(candidates);
		}
		if (recruiterIds != null) {
			List<Recruiter> recruiters = recruiterRepository.findByIdIn(recruiterIds);
			/*
			for (Recruiter tempRecruiter : recruiters) {
				System.out.println(tempRecruiter.getId());
			}
			*/
			List<Recruiter> originalRecruiters = ac.getRecruiters();
			
			ac.replaceRecruiters(recruiters);
			for (Recruiter tempRecruiter : ac.getRecruiters()) {
				System.out.println(tempRecruiter.getId());
			}
			//assessmentCenterRepository.save(ac);
			// recruiterRepository.saveAll(originalRecruiters);
			recruiterRepository.saveAll(recruiters);
		}
		
		/*
		System.out.println("just for experiemnt");
		AssessmentCenter ac1 = assessmentCenterRepository.findById(id).orElseThrow(() -> 
		new NotFoundException("Can't find AC with id: " + id)); 
		for (Recruiter newRecruiter : ac1.getRecruiters()) {
			System.out.println("recruiter with id: " + newRecruiter.getId());
			for (AssessmentCenter tempAC:newRecruiter.getAssessmentCenters()) {
				System.out.println("AC with id: " + tempAC.getId());
			}
		}
		*/
		
		assessmentCenterRepository.save(ac);
		
		return;
	}

	// show all candidates in an specific ac
	@GetMapping("/ac/{id}/showCandidates")
	public List<Candidate> showACCandidates(@PathVariable int id) {
		AssessmentCenter assessmentCenter = assessmentCenterRepository.findById(id)
				.orElseThrow(() -> new NotFoundException("Can't find candidate with id: " + id));
		return assessmentCenter.getCandidates();
	}

	// show all interviewers in an specific ac
	@GetMapping("/ac/{id}/showInterviewers")
	public List<Interviewer> showACInterviewers(@PathVariable int id) {
		AssessmentCenter assessmentCenter = assessmentCenterRepository.findById(id)
				.orElseThrow(() -> new NotFoundException("Can't find interviewer with id: " + id));
		return assessmentCenter.getInterviewers();
	}

	// get ongoing assessentcentres
	@GetMapping("/ac/ongoing")
	public List<AssessmentCenter> getAllOngoingAssessmentCentres() {
		List<AssessmentCenter> ongoingAssessmentCentres = new ArrayList<AssessmentCenter>();
		for (AssessmentCenter ac : getAllAC()) {
			if (LocalDate.now().equals(ac.getDate())) {
				System.out.println("Acs on today");
				if (LocalTime.now().isAfter(ac.getStart_time())
						|| LocalTime.now().equals(ac.getStart_time()) && LocalTime.now().isBefore(ac.getFinish_time())
						|| LocalTime.now().equals(ac.getFinish_time())) {
					ongoingAssessmentCentres.add(ac);
				}
			}
		}

		return ongoingAssessmentCentres;
	}
	
	//Get Past ACs
	@GetMapping("ac/past")
	public List<AssessmentCenter> getAllPastAssessmentCenters(){
		List<AssessmentCenter> pastAssessmentCentres = new ArrayList<AssessmentCenter>();
		for (AssessmentCenter ac : getAllAC()) {
			if (ac.getDate().isBefore(LocalDate.now()) && ac.getFinish_time().isBefore(LocalTime.now())) {
				pastAssessmentCentres.add(ac);
			}
		}
		return pastAssessmentCentres;
	}
	
	//Get Future ACs
		@GetMapping("ac/future")
		public List<AssessmentCenter> getAllFutureAssessmentCenters(){
			List<AssessmentCenter> futureAssessmentCentres = new ArrayList<AssessmentCenter>();
			for (AssessmentCenter ac : getAllAC()) {
				if (ac.getDate().isAfter(LocalDate.now()) && ac.getStart_time().isAfter(LocalTime.now())) {
					futureAssessmentCentres.add(ac);
				}
			}
			return futureAssessmentCentres;
		}

	// add new candidates with a specific ac, raise error if ac not exist or any id
	// of candidate id list not existed in database
	@PutMapping("/ac/{id}/addCandidates")
	public List<Candidate> addACCandidates(@PathVariable int id,
			@RequestParam(required = true, name = "candidateIds") int[] candidatesIds) {
		AssessmentCenter assessmentCenter = assessmentCenterRepository.findById(id)
				.orElseThrow(() -> new NotFoundException("Can't find candidate with id: " + id));
		List<Candidate> candidates = new ArrayList<Candidate>();
		// int addedCandidates = new int[];
		// TODO, test case that the candidate already linked to AC
		for (int candidateId : candidatesIds) {
			Candidate candidate = candidateRepository.findById(candidateId)
					.orElseThrow(() -> new NotFoundException("Can't find candidate with id: " + candidateId));
			assessmentCenter.addCandidate(candidate);
			candidates.add(candidate);
			assessmentCenterRepository.save(assessmentCenter);
			candidateRepository.save(candidate);
		}
		return candidates;
	}

	// add new interviewer with a specific ac, raise error if ac not exist or any id
	// of interviewer id list not existed in database
	@PutMapping("/ac/{id}/addInterviewers")
	public List<Interviewer> addACInterviewers(@PathVariable int id,
			@RequestParam(required = true, name = "interviewerIds") int[] interviewerIds) {
		AssessmentCenter assessmentCenter = assessmentCenterRepository.findById(id)
				.orElseThrow(() -> new NotFoundException("Can't find AC with id: " + id));
		List<Interviewer> interviewers = new ArrayList<Interviewer>();
		// int addedCandidates = new int[];
		// TODO, test case that the candidate already linked to AC
		for (int interviewerId : interviewerIds) {
			Interviewer interviewer = interviewerRepository.findById(interviewerId)
					.orElseThrow(() -> new NotFoundException("Can't find interviewer with id: " + interviewerId));
			assessmentCenter.addInterviewer(interviewer);
			interviewers.add(interviewer);
			assessmentCenterRepository.save(assessmentCenter);
			interviewerRepository.save(interviewer);
		}
		return interviewers;
	}

	
	// add new interviewer with a specific ac, raise error if ac not exist or any id of interviewer id list not existed in database
	@PutMapping("/ac/{id}/addRecruiters")
	public List<Recruiter> addACRecruiters(@PathVariable int id, 
			@RequestParam(required = true, name = "recruiterIds") int[] recruiterIds) {
		AssessmentCenter assessmentCenter = assessmentCenterRepository.findById(id).orElseThrow(()->new NotFoundException("Can't find AC with id: " + id));
		List<Recruiter> recruiters = new ArrayList<Recruiter>();
		for (int recruiterId : recruiterIds) {
			Recruiter recruiter = recruiterRepository.findById(recruiterId).orElseThrow(()->new NotFoundException("Can't find recruiter with id: " + recruiterId));
			assessmentCenter.addRecruiter(recruiter);
			recruiters.add(recruiter);
			assessmentCenterRepository.save(assessmentCenter);
			recruiterRepository.save(recruiter);
		}
		return recruiters;
	}
	
	// add new candidates with a specific ac, raise error if ac not exist or any id of candidate id list not existed in database

	@PutMapping("/ac/{id}/deleteCandidates")
	public List<Candidate> deleteACCandidates(@PathVariable int id,
			@RequestParam(required = true, name = "candidateIds") int[] candidatesIds) {
		AssessmentCenter assessmentCenter = assessmentCenterRepository.findById(id)
				.orElseThrow(() -> new NotFoundException("Can't find AC with id: " + id));
		List<Candidate> candidates = new ArrayList<Candidate>();
		// int addedCandidates = new int[];
		// TODO, test case that the candidate already linked to AC
		for (int candidateId : candidatesIds) {
			Candidate candidate = candidateRepository.findById(candidateId)
					.orElseThrow(() -> new NotFoundException("Can't find candidate with id: " + candidateId));
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
		AssessmentCenter assessmentCenter = assessmentCenterRepository.findById(id)
				.orElseThrow(() -> new NotFoundException("Can't find AC with id: " + id));
		List<Interviewer> interviewers = new ArrayList<Interviewer>();
		// int addedCandidates = new int[];
		// TODO, test case that the candidate already linked to AC
		for (int interviewerId : interviewerIds) {
			Interviewer interviewer = interviewerRepository.findById(interviewerId)
					.orElseThrow(() -> new NotFoundException("Can't find interviewer with id: " + interviewerId));
			assessmentCenter.removeInterviewer(interviewer);
			interviewers.add(interviewer);
			assessmentCenterRepository.save(assessmentCenter);
			interviewerRepository.save(interviewer);
		}
		return interviewers;
	}

	
	// delete interviewers from an AC
	@PutMapping("/ac/{id}/deleteRecruiters")
	public List<Recruiter> deleteACRecruiters(@PathVariable int id, 
			@RequestParam(required = true, name = "recruiterIds") int[] recruiterIds) {
		AssessmentCenter assessmentCenter = assessmentCenterRepository.findById(id).orElseThrow(()->new NotFoundException("Can't find AC with id: " + id));
		List<Recruiter> recruiters = new ArrayList<Recruiter>();
		for (int recruiterId : recruiterIds) {
			Recruiter recruiter = recruiterRepository.findById(recruiterId).orElseThrow(()->new NotFoundException("Can't find recruiter with id: " + recruiterId));
			assessmentCenter.removeRecruiter(recruiter);
			recruiters.add(recruiter);
			assessmentCenterRepository.save(assessmentCenter);
			recruiterRepository.save(recruiter);
		}
		return recruiters;
	}
	

	@GetMapping("/ac/by-date")
	public List<AssessmentCenter> findAllAssessmentCentersByDate(@RequestParam Integer year,
			@RequestParam Integer month, @RequestParam Integer day) {
		LocalDate date = LocalDate.of(year, month, day);
		return assessmentCenterRepository.findAllByDate(date);
	}

	/* --- End of Assessment Center --- */

	/* --- Candidate --- */

	// Get all Candidate
	@GetMapping("/candidate")
	public List<Candidate> getAllCandidate(@RequestParam(required = false) String firstName,
			@RequestParam(required = false) String lastName, @RequestParam(required = false) String appliedStream) {

		if (firstName == "") {
			firstName = null;
		}
		if (lastName == "") {
			lastName = null;
		}
		if (appliedStream == "") {
			appliedStream = null;
		}

		return candidateRepository.getByFilter(firstName, lastName, appliedStream);
	}

	// Get specific Candidate
	@GetMapping("/candidate/{candidateId}")
	public Candidate getCandidatebyId(@PathVariable int candidateId) {
		return candidateRepository.findById(candidateId)
				.orElseThrow(() -> new NotFoundException("Can't find candidate with id: " + candidateId));
	}

	// get AC id, interviewer, time, score, comment
	@GetMapping("/candidate/{candidateId}/linkedInfo")
	public List<HashMap<String, Object>> getCandidatebyIdWithLinkedInfo(@PathVariable int candidateId) {
		List<HashMap<String, Object>> output = new ArrayList<HashMap<String, Object>>();
		// List<JSONObject> output = new ArrayList<JSONObject>();
		Candidate candidate = candidateRepository.findById(candidateId)
				.orElseThrow(() -> new NotFoundException("Can't find candidate with id: " + candidateId));
		List<Interview> interviews = candidate.getInterviews();
		for (Interview interview : interviews) {
			HashMap<String, Object> temp = new HashMap<String, Object>();
			// JSONObject json = new JSONObject();
			AssessmentCenter tempAC = interview.getAssessmentCenter();
			temp.put("AC_id", (tempAC == null) ? tempAC : tempAC.getId()); // if tempAC is null, return null, else get
																			// the id
			temp.put("interviewer", interview.getInterviewer());
			temp.put("time", interview.getInterviewTime());
			temp.put("score", interview.getScore());
			temp.put("comment", interview.getComment());
			output.add(temp);
		}
		return output;
		// interview
		// return interviewRepository.findById(interviewId).orElseThrow(()->new
		// NotFoundException("Can't find interview with id: " +interviewId));
	}

	// Delete Candidate
	@DeleteMapping("/candidate/{candidateId}")
	public void deleteCandidateById(@PathVariable int candidateId) {
		/* remove dependency before deletion */
		Candidate candidate = candidateRepository.findById(candidateId)
				.orElseThrow(() -> new NotFoundException("Can't find candidate with id: " + candidateId));
		List<Interview> interviews = candidate.getInterviews();
		List<AssessmentCenter> assessmentCenters = candidate.getAssessmentCenters();
		User user = candidate.getUser();
		List<Recruiter> recruiters = candidate.getRecruiters();

		while (!interviews.isEmpty()) {
			candidate.removeInterview(interviews.get(interviews.size() - 1));

		}
		while (!assessmentCenters.isEmpty()) {
			candidate.removeAssessmentCenter(assessmentCenters.get(assessmentCenters.size() - 1));
		}
		while (!recruiters.isEmpty()) {
			candidate.removeRecruiter(recruiters.get(recruiters.size() - 1));
		}
		if (user != null) {
			candidate.removeUser();
			userRepository.save(user);
		}

		candidateRepository.save(candidate);
		assessmentCenterRepository.saveAll(assessmentCenters);
		recruiterRepository.saveAll(recruiters);
		interviewRepository.saveAll(interviews);
		/* End of remove dependency before deletion */

		candidateRepository.deleteById(candidateId);
	}

	// Create Candidate
	@PostMapping("/candidate")
	@ResponseStatus(HttpStatus.CREATED)
	public Candidate createCandidate(@RequestBody Candidate candidate) {
		return candidateRepository.save(candidate);
	}

	// Modify Candidate
	@PutMapping("/candidate")
	@ResponseStatus(HttpStatus.CREATED)
	public Candidate modifyCandidate(@RequestBody Candidate candidate) {
		if (candidateRepository.findById(candidate.getId()).isEmpty()) {
			throw new NotFoundException("Can't find candidate with id: " + candidate.getId());
		}
		return candidateRepository.save(candidate);
	}

	// show all candidates in an specific ac
	@GetMapping("/candidate/{id}/showACs")
	public List<AssessmentCenter> showCandidateACs(@PathVariable int id) {
		Candidate candidate = candidateRepository.findById(id)
				.orElseThrow(() -> new NotFoundException("Can't find candidate with id: " + id));
		return candidate.getAssessmentCenters();
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
		return interviewerRepository.findById(interviewerId)
				.orElseThrow(() -> new NotFoundException("Can't find interviewer with id: " + interviewerId));
	}

	// Delete Interviewer
	@DeleteMapping("/interviewer/{interviewerId}")
	public void deleteInterviewerById(@PathVariable int interviewerId) {
		// TODO should delete later
		if (interviewerRepository.findById(interviewerId).isEmpty()) {
			throw new NotFoundException("Can't find interviewer with id: " + interviewerId);
		}

		/* --- remove all bidirectional dependencies to avoid delete bug --- */
		Interviewer interviewer = interviewerRepository.findById(interviewerId)
				.orElseThrow(() -> new NotFoundException("Can't find interviewer with id: " + interviewerId));
		List<Interview> interviews = interviewer.getInterviews();
		List<AssessmentCenter> acs = interviewer.getAssessmentCenters();
		User user = interviewer.getUser();
		// remove interviews
		while (!interviews.isEmpty()) {
			interviewer.removeInterview(interviews.get(interviews.size() - 1)); // remove from last
		}
		while (!acs.isEmpty()) {
			interviewer.removeAssessmentCenter(acs.get(acs.size() - 1));
		}
		if (user != null) {
			interviewer.removeUser();
			userRepository.save(user);
		}

		interviewerRepository.save(interviewer);
		interviewRepository.saveAll(interviews);
		assessmentCenterRepository.saveAll(acs);
		/* --- end of remove all bidirectional dependencies to avoid delete bug --- */

		interviewerRepository.deleteById(interviewerId);
	}

	// Create Interviewer
	@PostMapping("/interviewer")
	@ResponseStatus(HttpStatus.CREATED)
	public Interviewer createInterviewer(@RequestBody Interviewer interviewer) {
		return interviewerRepository.save(interviewer);
	}

	// Modify Interviewer
	@PutMapping("/interviewer")
	@ResponseStatus(HttpStatus.CREATED)
	public Interviewer modifyInterviewer(@RequestBody Interviewer interviewer) {
		if (interviewerRepository.findById(interviewer.getId()).isEmpty()) {
			throw new NotFoundException("Can't find interviewer with id: " + interviewer.getId());
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
		return interviewRepository.findById(interviewId)
				.orElseThrow(() -> new NotFoundException("Can't find interview with id: " + interviewId));
	}

	// Get specific Interviews with detailed information (i.e. show linked object
	// info)
	@GetMapping("/interviewDetailed/{interviewId}")
	public HashMap<String, Object> getInterviewbyIdDetailed(@PathVariable int interviewId) {
		HashMap<String, Object> output = new HashMap<String, Object>();
		Interview interview = interviewRepository.findById(interviewId)
				.orElseThrow(() -> new NotFoundException("Can't find interview with id: " + interviewId));
		AssessmentCenter assessmentCenter = interview.getAssessmentCenter();
		Interviewer interviewer = interview.getInterviewer();
		Candidate candidate = interview.getCandidate();
		// List<Pack> packs = interview.getPacks();
		output.put("interview", interview);
		output.put("assessmentCenter", assessmentCenter);
		output.put("interviewer", interviewer);
		output.put("candidate", candidate);
		// output.put("packs", packs);
		return output;
	}

	/**
	 * Find Interviews with the Assessment Centre ID and Interviewer ID
	 * 
	 * @param acId          An Assessment Centre ID
	 * @param interviewerId An Interviewer ID
	 * @return List of Interviews
	 */
	@GetMapping("interview/by-ac-interviewer")
	public List<Interview> getInterviewsByAssessmentCenterAndInterviewer(@RequestParam Integer acId,
			Integer interviewerId) {
		AssessmentCenter ac = assessmentCenterRepository.findById(acId)
				.orElseThrow(() -> new NotFoundException("Unable to find AC with that ID"));
		Interviewer interviewer = interviewerRepository.findById(interviewerId)
				.orElseThrow(() -> new NotFoundException("Unable to find Interviewer with that ID"));
		return interviewRepository.findAllByAssessmentCenterAndInterviewer(ac, interviewer);
	}

	// Delete Interview
	@DeleteMapping("/interview/{interviewId}")
	public void deleteInterviewById(@PathVariable int interviewId) {

		/* --- unlink before deletion --- */
		Interview interview = interviewRepository.findById(interviewId)
				.orElseThrow(() -> new NotFoundException("Can't find interview with id: " + interviewId));
		Interviewer interviewer = interview.getInterviewer();
		AssessmentCenter assessmentCenter = interview.getAssessmentCenter();
		Candidate candidate = interview.getCandidate();
		// List<Pack> packs = interview.getPacks();

		if (interviewer != null) {
			interview.removeInterviewer();
			interviewerRepository.save(interviewer);
		}
		if (assessmentCenter != null) {
			interview.removeAssessmentCenter();
			assessmentCenterRepository.save(assessmentCenter);
		}
		if (candidate != null) {
			interview.removeCandidate();
			candidateRepository.save(candidate);
		}
//		while (! packs.isEmpty()) {
//			interview.removePack(packs.get(packs.size() - 1));
//		}

		interviewRepository.save(interview);
		// packsRepository.saveAll(packs);
		/* --- end of unlink before deletion --- */

		interviewRepository.deleteById(interviewId);
	}

	// Create Interview, assumption: before creating an interview, one must have AC,
	// interviewer, candidate and packs
	@PostMapping("/interview")
	@ResponseStatus(HttpStatus.CREATED)
	public Interview createInterview(@RequestBody Interview interview,
			@RequestParam(required = true, name = "acId") int acId,
			@RequestParam(required = true, name = "interviewerId") int interviewerId,
			@RequestParam(required = true, name = "candidateId") int candidateId,
			@RequestParam(required = true, name = "packIds") int[] packIds) {
		// if (interviewId == null)
		interview.addAssessmentCenter(assessmentCenterRepository.findById(acId)
				.orElseThrow(() -> new NotFoundException("Can't find AC with id: " + acId)));
		interview.addInterviewer(interviewerRepository.findById(interviewerId)
				.orElseThrow(() -> new NotFoundException("Can't find interviewer with id: " + interviewerId)));
		interview.addCandidate(candidateRepository.findById(candidateId)
				.orElseThrow(() -> new NotFoundException("Can't find candidate with id: " + candidateId)));
//		for (int pack : packIds) {
//			interview.addPack(packsRepository.findById(pack).orElseThrow(()->new NotFoundException("Can't find AC with id: " + pack)));
//		}

		return interviewRepository.save(interview);
	}

	// Modify Interview
	@PutMapping("/interview")
	@ResponseStatus(HttpStatus.CREATED)
	public Interview modifyInterview(@RequestBody Interview interview) {
		if (interviewRepository.findById(interview.getId()).isEmpty()) {
			throw new NotFoundException("Can't find interview with id: " + interview.getId());
		}
		return interviewRepository.save(interview);
	}

//	//Add Pack to interview
//	@PutMapping("/interview/{id}/addPacks")
//	public void addPackToInterview(@PathVariable int id,@RequestParam(required = true, name = "packIds") int[] packIds) {	
//		
//		Interview interview = interviewRepository.findById(id).orElseThrow(()->new NotFoundException("Can't find interview with id: " + id));
//		
//		for (int packId : packIds) {
//			Pack pack = packsRepository.findById(packId).orElseThrow(()->new NotFoundException("Can't find pack with id: " + packId));
//			interview.addPack(pack);
//			packsRepository.save(pack);
//		}
//		interviewRepository.save(interview);
//	}
//	
//	
//	//Remove Pack from Interview
//	@PutMapping("/interview/{id}/removePacks")
//	public void removePackFromInterview(@PathVariable int id,@RequestParam(required = true, name = "packIds") int[] packIds) {	
//		
//		Interview interview = interviewRepository.findById(id).orElseThrow(()->new NotFoundException("Can't find interview with id: " + id));
//		
//		for (int packId : packIds) {
//			Pack pack = packsRepository.findById(packId).orElseThrow(()->new NotFoundException("Can't find pack with id: " + packId));
//			interview.removePack(pack);
//			packsRepository.save(pack);
//			interviewRepository.save(interview);
//		}
//	}

	/* --- End of Interviews --- */

	/* --- Interview Feedback --- */

	@GetMapping("/interview-feedback")
	public List<InterviewFeedback> getAllInterviewFeedbacks() {
		return interviewFeedbackRepository.findAll();
	}

	@GetMapping("/interview-feedback/{id}")
	public InterviewFeedback getInterviewFeedbackById(@PathVariable Integer id) {
		return interviewFeedbackRepository.findById(id)
				.orElseThrow(() -> new NotFoundException("Unable to find Interview Feedback with ID of: " + id));
	}

	@GetMapping("/interview-feedback/from-interview/{interviewId}")
	public InterviewFeedback getInterviewFeedBackByInterviewId(@PathVariable Integer interviewId) {
		Interview interview = interviewRepository.findById(interviewId)
				.orElseThrow(() -> new NotFoundException("Unable to find Interview with that ID"));
		return interview.getFeedback();
	}

	@PostMapping("/interview-feedback/{packId}")
	@ResponseStatus(HttpStatus.CREATED)
	public InterviewFeedback createNewInterviewFeedback(@PathVariable Integer packId,
			@RequestBody InterviewFeedback interviewFeedback) {
		Pack pack = packsRepository.findById(packId)
				.orElseThrow(() -> new NotFoundException("Unable to find Pack with that ID"));
		interviewFeedback.setPackId(pack);
		return interviewFeedbackRepository.save(interviewFeedback);
	}

	/* --- End of Interview Feedback --- */

	/* --- Questions Feedback --- */
	@GetMapping("/questions-feedback")
	public List<QuestionsFeedback> getAllQuestionsFeedbacks() {
		return questionsFeedbackRepository.findAll();
	}

	@GetMapping("/questions-feedback/{id}")
	public QuestionsFeedback getQuestionsFeedbackById(@PathVariable Integer id) {
		return questionsFeedbackRepository.findById(id)
				.orElseThrow(() -> new NotFoundException("Unable to find QuestionFeedback with ID of: " + id));
	}

	@GetMapping("/questions-feedback/from-interview-feedback/{interviewFeedbackId}")
	public List<QuestionsFeedback> getQuestionsFeedbackByInterviewFormId(@PathVariable Integer interviewFeedbackId) {
		InterviewFeedback interviewFeedback = interviewFeedbackRepository.findById(interviewFeedbackId)
				.orElseThrow(() -> new NotFoundException("Unable to find Interview Feedback Form with that ID"));
		return interviewFeedback.getQuestionFeedback();
	}

	@PostMapping("/questions-feedback/{interviewFeedbackId}")
	@ResponseStatus(HttpStatus.CREATED)
	public QuestionsFeedback createNewQuestionsFeedback(@PathVariable Integer interviewFeedbackId,
			@RequestBody QuestionsFeedback questionsFeedback) {
		InterviewFeedback interviewFeedback = interviewFeedbackRepository.findById(interviewFeedbackId)
				.orElseThrow(() -> new NotFoundException("Unable To Find Interview Feedback Form of that ID"));
		questionsFeedback.setInterviewFeedback(interviewFeedback);
		return questionsFeedbackRepository.save(questionsFeedback);
	}

//	/* --- Packs --- */
//	
	// getAllPacks
	@GetMapping("/pack")
	public List<Pack> getAllPacks() {
		return packsRepository.findAll();
	}

	// Get specific Pack
	@GetMapping("/pack/{id}")
	public Pack getPackbyId(@PathVariable int id) {
		return packsRepository.findById(id).orElseThrow(() -> new NotFoundException("Can't find pack with id: " + id));
	}

	// Create Pack
	@PostMapping("/pack")
	@ResponseStatus(HttpStatus.CREATED)
	public Pack createPack(@RequestBody Pack pack) {
		return packsRepository.save(pack);
	}

	// Get all Questions
	@GetMapping("/question")
	public List<Questions> getAllQuestions() {
		return questionsRepository.findAll();
	}

	// Get specific Question
	@GetMapping("/question/{id}")
	public Questions getQuestionbyId(@PathVariable int id) {
		return questionsRepository.findById(id)
				.orElseThrow(() -> new NotFoundException("Can't find question with id: " + id));
	}

	// Get Question by pack id
	@GetMapping("/question/pack/{id}")
	public List<Questions> getQuestionbyPackId(@PathVariable int id) {
		if (packsRepository.findById(id).isEmpty()) {
			throw new NotFoundException("Can't find interview with id: " + id);
		}
		return packsRepository.findById(id).get().getQuestions();
	}

	// Create Question
	@PostMapping("/question/{packId}")
	@ResponseStatus(HttpStatus.CREATED)
	public Questions createQuestion(@RequestBody Questions question, @PathVariable Integer packId) {
		question.setPackId(packsRepository.findById(packId).orElseThrow(() -> new NotFoundException("Pack Not Found")));
		return questionsRepository.save(question);
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
		return recruiterRepository.findById(recruiterId)
				.orElseThrow(() -> new NotFoundException("Can't find recruiter with id: " + recruiterId));
	}

	// Delete Recruiter
	@DeleteMapping("/recruiter/{recruiterId}")
	public void deleteRecruiterById(@PathVariable int recruiterId) {
		if (recruiterRepository.findById(recruiterId).isEmpty()) {
			throw new NotFoundException("Can't find recruiter with id: " + recruiterId);
		}

		/* --- remove all bidirectional dependencies to avoid delete bug --- */
		Recruiter recruiter = recruiterRepository.findById(recruiterId)
				.orElseThrow(() -> new NotFoundException("Can't find recruiter with id: " + recruiterId));
		List<AssessmentCenter> assessmentCenters = recruiter.getAssessmentCenters();
		List<Candidate> candidates = recruiter.getCandidates();
		User user = recruiter.getUser();

		if (user != null) {
			recruiter.removeUser();
			userRepository.save(user);
		}
		while (!assessmentCenters.isEmpty()) {
			recruiter.removeAssessmentCenter(assessmentCenters.get(assessmentCenters.size() - 1));
		}
		while (!candidates.isEmpty()) {
			recruiter.removeCandidate(candidates.get(candidates.size() - 1));
		}

		this.recruiterRepository.save(recruiter);
		this.assessmentCenterRepository.saveAll(assessmentCenters);
		this.candidateRepository.saveAll(candidates);
		/* --- end of remove all bidirectional dependencies to avoid delete bug --- */

		recruiterRepository.deleteById(recruiterId);
	}

	// Create Recruiter
	@PostMapping("/recruiter")
	@ResponseStatus(HttpStatus.CREATED)
	public Recruiter createRecruiter(@RequestBody Recruiter recruiter) {
		return recruiterRepository.save(recruiter);
	}

	// Modify Recruiter
	@PutMapping("/recruiter")
	@ResponseStatus(HttpStatus.CREATED)
	public Recruiter modifyRecruiter(@RequestBody Recruiter recruiter) {
		if (recruiterRepository.findById(recruiter.getId()).isEmpty()) {
			throw new NotFoundException("Can't find recruiter with id: " + recruiter.getId());
		}
		return recruiterRepository.save(recruiter);
	}
	/* --- End of Recruiter --- */

}
