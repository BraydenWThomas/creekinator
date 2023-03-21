package com.bezkoder.springjwt.controllers;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
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
import com.bezkoder.springjwt.repository.InterviewerRepository;
import com.bezkoder.springjwt.repository.InterviewsRepository;
import com.bezkoder.springjwt.repository.PacksRepository;
import com.bezkoder.springjwt.repository.RecruiterRepository;
import com.bezkoder.springjwt.repository.UserRepository;
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
	/* --- end of fields --- */
	
	
	
	
	
	/* --- constructor --- */
	// TODO autowire attribute should be able to avoid doing this section
	public EntityController(AssessmentCenterRepository assessmentCenterRepository, CandidateRepository candidateRepository ,
			InterviewerRepository interviewerRepository, InterviewsRepository interviewRepository, 
			PacksRepository packsRepository,RecruiterRepository recruiterRepository,
			UserRepository userRepository) {
		super();
		this.assessmentCenterRepository = assessmentCenterRepository;
		this.candidateRepository = candidateRepository;
		this.interviewerRepository = interviewerRepository;
		this.interviewRepository = interviewRepository;
		this.packsRepository = packsRepository;
		this.recruiterRepository = recruiterRepository;
		this.userRepository = userRepository;
	}
	/* --- end of constructor --- */
	
	
	
	
	
	
	
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
		return assessmentCenterRepository.findById(acId).orElseThrow(()->new NotFoundException("Can't find AC with id: " +acId));
	}
	
	// Delete AC
	@DeleteMapping("/ac/{acId}")
	public void deleteAcById(@PathVariable int acId) {
		
		/* --- remove all bidirectional dependencies to avoid delete bug --- */
		AssessmentCenter assessmentCenter = assessmentCenterRepository.findById(acId).orElseThrow(()->
											new NotFoundException("Can't find AC with id: " + acId));
		
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
	public AssessmentCenter createAc(@RequestBody AssessmentCenter assessmentCenter,
			@RequestParam(required = false, name = "candidates") int[] candidates,
			@RequestParam(required = false, name = "interviews") int[] interviews,
			@RequestParam(required = false, name = "interviewers") int[] interviewers,
			@RequestParam(required = false, name = "recruiters") int[] recruiters) {
		//int acId = assessmentCenter.getId();
		if (candidates != null) {
			for (int candidateID : candidates) {
				Candidate candidate = candidateRepository.findById(candidateID).orElseThrow(()->
					new NotFoundException("Can't find candidate with id: " + candidateID));
				assessmentCenter.addCandidate(candidate);
				assessmentCenterRepository.save(assessmentCenter);
				candidateRepository.save(candidate);
			}
		}
		if (interviews != null) {
			for (int interviewId : interviews) {
				Interview interview = interviewRepository.findById(interviewId).orElseThrow(()->
					new NotFoundException("Can't find interview with id: " + interviewId));
				assessmentCenter.addInterview(interview); 
				assessmentCenterRepository.save(assessmentCenter);
				interviewRepository.save(interview);
			}
		}
		if (interviewers != null) {
			for (int interviewerId : interviewers) {
				Interviewer interviewer = interviewerRepository.findById(interviewerId).orElseThrow(()->
					new NotFoundException("Can't find interviewer with id: " + interviewerId));
				assessmentCenter.addInterviewer(interviewer); 
				assessmentCenterRepository.save(assessmentCenter);
				interviewerRepository.save(interviewer);
			}
		}
		if (recruiters != null) {
			for (int recruiterId : recruiters) {
				Recruiter recruiter = recruiterRepository.findById(recruiterId).orElseThrow(()->
					new NotFoundException("Can't find recruiter with id: " + recruiterId));
				assessmentCenter.addRecruiter(recruiter); 
				assessmentCenterRepository.save(assessmentCenter);
				recruiterRepository.save(recruiter);
			}
		}
		return assessmentCenterRepository.save(assessmentCenter);
	}
	
	//Modify AC
	@PutMapping("/ac")
	@ResponseStatus(HttpStatus.CREATED)
	public AssessmentCenter modifyAc(@RequestBody AssessmentCenter assessmentCenter) {
		if (assessmentCenterRepository.findById(assessmentCenter.getId()).isEmpty()) {
			throw new NotFoundException("Can't find AC with id: " + assessmentCenter.getId());
		}
		return assessmentCenterRepository.save(assessmentCenter);
	}
	
	
	
	
	// show all candidates in an specific ac 
	@GetMapping("/ac/{id}/showCandidates")
	public List<Candidate> showACCandidates(@PathVariable int id) {
		AssessmentCenter assessmentCenter = assessmentCenterRepository.findById(id).orElseThrow(()->new NotFoundException("Can't find candidate with id: " + id));
		return assessmentCenter.getCandidates();
	}	
	
	// show all interviewers in an specific ac 
	@GetMapping("/ac/{id}/showInterviewers")
	public List<Interviewer> showACInterviewers(@PathVariable int id) {
		AssessmentCenter assessmentCenter = assessmentCenterRepository.findById(id).orElseThrow(()->new NotFoundException("Can't find interviewer with id: " + id));
		return assessmentCenter.getInterviewers();
	}
	
	// add new candidates with a specific ac, raise error if ac not exist or any id of candidate id list not existed in database
	@PutMapping("/ac/{id}/addCandidates")
	public List<Candidate> addACCandidates(@PathVariable int id, 
			@RequestParam(required = true, name = "candidateIds") int[] candidatesIds) {
		AssessmentCenter assessmentCenter = assessmentCenterRepository.findById(id).orElseThrow(()->new NotFoundException("Can't find candidate with id: " + id));
		List<Candidate> candidates = new ArrayList<Candidate>();
		//int addedCandidates = new int[];
		// TODO, test case that the candidate already linked to AC
		for (int candidateId : candidatesIds) {
			Candidate candidate = candidateRepository.findById(candidateId).orElseThrow(()->new NotFoundException("Can't find candidate with id: " + candidateId));
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
		AssessmentCenter assessmentCenter = assessmentCenterRepository.findById(id).orElseThrow(()->new NotFoundException("Can't find AC with id: " + id));
		List<Interviewer> interviewers = new ArrayList<Interviewer>();
		//int addedCandidates = new int[];
		// TODO, test case that the candidate already linked to AC
		for (int interviewerId : interviewerIds) {
			Interviewer interviewer = interviewerRepository.findById(interviewerId).orElseThrow(()->new NotFoundException("Can't find interviewer with id: " + interviewerId));
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
		AssessmentCenter assessmentCenter = assessmentCenterRepository.findById(id).orElseThrow(()->new NotFoundException("Can't find AC with id: " + id));
		List<Candidate> candidates = new ArrayList<Candidate>();
		//int addedCandidates = new int[];
		// TODO, test case that the candidate already linked to AC
		for (int candidateId : candidatesIds) {
			Candidate candidate = candidateRepository.findById(candidateId).orElseThrow(()->new NotFoundException("Can't find candidate with id: " + candidateId));
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
		AssessmentCenter assessmentCenter = assessmentCenterRepository.findById(id).orElseThrow(()->new NotFoundException("Can't find AC with id: " + id));
		List<Interviewer> interviewers = new ArrayList<Interviewer>();
		//int addedCandidates = new int[];
		// TODO, test case that the candidate already linked to AC
		for (int interviewerId : interviewerIds) {
			Interviewer interviewer = interviewerRepository.findById(interviewerId).orElseThrow(()->new NotFoundException("Can't find interviewer with id: " + interviewerId));
			assessmentCenter.removeInterviewer(interviewer);
			interviewers.add(interviewer);
			assessmentCenterRepository.save(assessmentCenter);
			interviewerRepository.save(interviewer);
		}
		return interviewers;
	}
	
	@GetMapping("/ac/by-date")
	public List<AssessmentCenter> findAllAssessmentCentersByDate(@RequestParam Integer year, @RequestParam Integer month, @RequestParam Integer day){
		LocalDate date = LocalDate.of(year, month, day);
		return assessmentCenterRepository.findAllByDate(date);
	}

		
	/* --- End of Assessment Center --- */	
	
	
	
	
	
	
	/* --- Candidate --- */
	
	// Get all Candidate
	@GetMapping("/candidate")
	public List<Candidate> getAllCandidate(
			@RequestParam (required=false) String firstName,
			@RequestParam (required=false) String lastName,
			@RequestParam (required=false) String appliedStream) {
		
		if(firstName=="") {firstName=null;}
		if(lastName=="") {lastName=null;}
		if(appliedStream=="") {appliedStream=null;}
		
		return candidateRepository.getByFilter(firstName, lastName, appliedStream);
	}
	
	// Get specific Candidate
	@GetMapping("/candidate/{candidateId}")
	public Candidate getCandidatebyId(@PathVariable int candidateId) {
		return candidateRepository.findById(candidateId).orElseThrow(()->new NotFoundException("Can't find candidate with id: " +candidateId));
	}
	
	// get AC id, interviewer, time, score, comment
	@GetMapping("/candidate/{candidateId}/linkedInfo")
	public List<HashMap<String,Object>> getCandidatebyIdWithLinkedInfo(@PathVariable int candidateId) {
		List<HashMap<String,Object>> output = new ArrayList<HashMap<String,Object>>();
		// List<JSONObject> output = new ArrayList<JSONObject>();
		Candidate candidate = candidateRepository.findById(candidateId).orElseThrow(()->new NotFoundException("Can't find candidate with id: " + candidateId));
		List<Interview> interviews = candidate.getInterviews();
		for (Interview interview : interviews) {
			HashMap<String,Object> temp = new HashMap<String,Object>();
			// JSONObject json = new JSONObject();
			AssessmentCenter tempAC = interview.getAssessmentCenter();
			temp.put("AC_id", (tempAC == null) ? tempAC : tempAC.getId()); // if tempAC is null, return null, else get the id
			temp.put("interviewer", interview.getInterviewer());
			temp.put("time", interview.getInterviewTime());
			temp.put("score", interview.getScore());
			temp.put("comment", interview.getComment());
			output.add(temp);
		}
		return output;
		// interview
		//return interviewRepository.findById(interviewId).orElseThrow(()->new NotFoundException("Can't find interview with id: " +interviewId));
	}
	
	// Delete Candidate
	@DeleteMapping("/candidate/{candidateId}")
	public void deleteCandidateById(@PathVariable int candidateId) {
		/* remove dependency before deletion */
		Candidate candidate = candidateRepository.findById(candidateId).orElseThrow(()->new NotFoundException("Can't find candidate with id: " + candidateId));
		List<Interview> interviews = candidate.getInterviews();
		List<AssessmentCenter> assessmentCenters = candidate.getAssessmentCenters();
		User user = candidate.getUser();
		List<Recruiter> recruiters = candidate.getRecruiters();
		
		while (! interviews.isEmpty()) {
			candidate.removeInterview(interviews.get(interviews.size() - 1));
			
		}
		while (! assessmentCenters.isEmpty()) {
			candidate.removeAssessmentCenter(assessmentCenters.get(assessmentCenters.size() - 1));
		}
		while (! recruiters.isEmpty()) {
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
			throw new NotFoundException("Can't find candidate with id: " + candidate.getId());
		}
		return candidateRepository.save(candidate);
	}
	
	// show all candidates in an specific ac 
	@GetMapping("/candidate/{id}/showACs")
	public List<AssessmentCenter> showCandidateACs(@PathVariable int id) {
		Candidate candidate = candidateRepository.findById(id).orElseThrow(()->new NotFoundException("Can't find candidate with id: " + id));
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
		return interviewerRepository.findById(interviewerId).orElseThrow(()->new NotFoundException("Can't find interviewer with id: " +interviewerId));
	}
	
	// Delete Interviewer
	@DeleteMapping("/interviewer/{interviewerId}")
	public void deleteInterviewerById(@PathVariable int interviewerId) {
		// TODO should delete later
		if (interviewerRepository.findById(interviewerId).isEmpty()) {
			throw new NotFoundException("Can't find interviewer with id: " + interviewerId);
		}
		
		/* --- remove all bidirectional dependencies to avoid delete bug --- */
		Interviewer interviewer = interviewerRepository.findById(interviewerId).orElseThrow(()->new NotFoundException("Can't find interviewer with id: " +interviewerId));
		List<Interview> interviews = interviewer.getInterviews();
		List<AssessmentCenter> acs = interviewer.getAssessmentCenters();
		User user = interviewer.getUser();
		// remove interviews
		while (! interviews.isEmpty()) {
			interviewer.removeInterview(interviews.get(interviews.size()-1)); // remove from last
		}
		while (! acs.isEmpty()) {
			interviewer.removeAssessmentCenter(acs.get(acs.size()-1));
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
		return interviewRepository.findById(interviewId).orElseThrow(()->new NotFoundException("Can't find interview with id: " +interviewId));
	}
	
	// Get specific Interviews with detailed information (i.e. show linked object info)
	@GetMapping("/interviewDetailed/{interviewId}")
	public HashMap<String, Object> getInterviewbyIdDetailed(@PathVariable int interviewId) {
		HashMap<String, Object> output = new HashMap<String, Object>();
		Interview interview = interviewRepository.findById(interviewId).orElseThrow(()->new NotFoundException("Can't find interview with id: " +interviewId));
		AssessmentCenter assessmentCenter = interview.getAssessmentCenter();
		Interviewer interviewer = interview.getInterviewer();
		Candidate candidate = interview.getCandidate();
		List<Pack> packs = interview.getPacks();
		output.put("interview", interview);
		output.put("assessmentCenter", assessmentCenter);
		output.put("interviewer", interviewer);
		output.put("candidate", candidate);
		output.put("packs", packs);
		return output;
	}
	
	/**
	 * Find Interviews with the Assessment Centre ID and Interviewer ID
	 * @param acId An Assessment Centre ID
	 * @param interviewerId An Interviewer ID
	 * @return List of Interviews
	 */
	@GetMapping("interview/by-ac-interviewer")
	public List<Interview> getInterviewsByAssessmentCenterAndInterviewer(@RequestParam Integer acId, Integer interviewerId){
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
		Interview interview = interviewRepository.findById(interviewId).orElseThrow(() -> new NotFoundException("Can't find interview with id: " + interviewId));
		Interviewer interviewer = interview.getInterviewer();
		AssessmentCenter assessmentCenter = interview.getAssessmentCenter();
		Candidate candidate = interview.getCandidate();
		List<Pack> packs = interview.getPacks();
		
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
		while (! packs.isEmpty()) {
			interview.removePack(packs.get(packs.size() - 1));
		}
		
		interviewRepository.save(interview);
		packsRepository.saveAll(packs);
		/* --- end of unlink before deletion --- */
		
		interviewRepository.deleteById(interviewId);
	}	
	
	//Create Interview, assumption: before creating an interview, one must have AC, interviewer, candidate and packs
	@PostMapping("/interview")
	@ResponseStatus(HttpStatus.CREATED)
	public Interview createInterview(@RequestBody Interview interview,
			@RequestParam(required = true, name = "acId") int acId,
			@RequestParam(required = true, name = "interviewerId") int interviewerId,
			@RequestParam(required = true, name = "candidateId") int candidateId,
			@RequestParam(required = true, name = "packIds") int[] packIds) {
		//if (interviewId == null)
		interview.addAssessmentCenter(assessmentCenterRepository.findById(acId).orElseThrow(()->new NotFoundException("Can't find AC with id: " + acId)));
		interview.addInterviewer(interviewerRepository.findById(interviewerId).orElseThrow(()->new NotFoundException("Can't find interviewer with id: " + interviewerId)));
		interview.addCandidate(candidateRepository.findById(candidateId).orElseThrow(()->new NotFoundException("Can't find candidate with id: " + candidateId)));		
		for (int pack : packIds) {
			interview.addPack(packsRepository.findById(pack).orElseThrow(()->new NotFoundException("Can't find AC with id: " + pack)));
		}
		
		return interviewRepository.save(interview);
	}
	
	//Modify Interview
	@PutMapping("/interview")
	@ResponseStatus(HttpStatus.CREATED)
	public Interview modifyInterview(@RequestBody Interview interview) {
		if (interviewRepository.findById(interview.getId()).isEmpty()) {
			throw new NotFoundException("Can't find interview with id: " + interview.getId());
		}
		return interviewRepository.save(interview);
	}
	
	//Add Pack to interview
	@PutMapping("/interview/{id}/addPacks")
	public void addPackToInterview(@PathVariable int id,@RequestParam(required = true, name = "packIds") int[] packIds) {	
		
		Interview interview = interviewRepository.findById(id).orElseThrow(()->new NotFoundException("Can't find interview with id: " + id));
		
		for (int packId : packIds) {
			Pack pack = packsRepository.findById(packId).orElseThrow(()->new NotFoundException("Can't find pack with id: " + packId));
			interview.addPack(pack);
			packsRepository.save(pack);
		}
		interviewRepository.save(interview);
	}
	
	
	//Remove Pack from Interview
	@PutMapping("/interview/{id}/removePacks")
	public void removePackFromInterview(@PathVariable int id,@RequestParam(required = true, name = "packIds") int[] packIds) {	
		
		Interview interview = interviewRepository.findById(id).orElseThrow(()->new NotFoundException("Can't find interview with id: " + id));
		
		for (int packId : packIds) {
			Pack pack = packsRepository.findById(packId).orElseThrow(()->new NotFoundException("Can't find pack with id: " + packId));
			interview.removePack(pack);
			packsRepository.save(pack);
			interviewRepository.save(interview);
		}
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
		return packsRepository.findById(packId).orElseThrow(()->new NotFoundException("Can't find pack with id: " +packId));
	}	
	
	// Delete Pack
	@DeleteMapping("/pack/{packId}")
	public void deletePackById(@PathVariable int packId) {
		if (packsRepository.findById(packId).isEmpty()) {
			throw new NotFoundException("Can't find transaction with id: " + packId);
		}
		
		/* --- remove all bidirectional dependencies to avoid delete bug --- */
		Pack pack = packsRepository.findById(packId).orElseThrow(()->new NotFoundException("Can't find pack with id: " +packId));
		// remove interviews
		List<Interview> interviews = pack.getInterviews();
		while (! interviews.isEmpty()) {
			pack.removeInterviews(interviews.get(interviews.size() - 1));
		}
		this.packsRepository.save(pack);
		this.interviewRepository.saveAll(interviews);
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
			throw new NotFoundException("Can't find pack with id: " + pack.getId());
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
		return recruiterRepository.findById(recruiterId).orElseThrow(()->new NotFoundException("Can't find recruiter with id: " +recruiterId));
	}
	
	// Delete Recruiter
	@DeleteMapping("/recruiter/{recruiterId}")
	public void deleteRecruiterById(@PathVariable int recruiterId) {
		if (recruiterRepository.findById(recruiterId).isEmpty()) {
			throw new NotFoundException("Can't find recruiter with id: " + recruiterId);
		}
		
		/* --- remove all bidirectional dependencies to avoid delete bug --- */
		Recruiter recruiter = recruiterRepository.findById(recruiterId).orElseThrow(()->new NotFoundException("Can't find recruiter with id: " +recruiterId));
		List<AssessmentCenter> assessmentCenters = recruiter.getAssessmentCenters();
		List<Candidate> candidates = recruiter.getCandidates();
		User user = recruiter.getUser();
		
		if (user != null) {
			recruiter.removeUser();
			userRepository.save(user);
		}
		while (! assessmentCenters.isEmpty()) {
			recruiter.removeAssessmentCenter(assessmentCenters.get(assessmentCenters.size() - 1));
		}
		while (! candidates.isEmpty()) {
			recruiter.removeCandidate(candidates.get(candidates.size() - 1));
		}
		
		this.recruiterRepository.save(recruiter);
		this.assessmentCenterRepository.saveAll(assessmentCenters);
		this.candidateRepository.saveAll(candidates);
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
			throw new NotFoundException("Can't find recruiter with id: " + recruiter.getId());
		}
		return recruiterRepository.save(recruiter);
	}
	/* --- End of Recruiter --- */
	

	
	
}
