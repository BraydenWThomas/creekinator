package com.bezkoder.springjwt;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import com.bezkoder.springjwt.controllers.EntityController;

import com.bezkoder.springjwt.repository.*; // import all repository
import com.bezkoder.springjwt.models.*; // models

import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.junit.jupiter.api.BeforeAll;

// part 1
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

// import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

// other import
import java.util.List;
import java.util.Optional;
import java.util.ArrayList;

import com.bezkoder.springjwt.exceptions.NotFoundException;


/*
 * Test set 1, test each api
 */
@SpringBootTest
@WebAppConfiguration
public class AddAndRemoveTest {
	protected MockMvc mvc;
	
	@Autowired
	WebApplicationContext webApplicationContext;
	
	@Autowired
	private EntityController controller;
	
	@MockBean
	private AssessmentCenterRepository mockACRepo;
	@MockBean
	private CandidateRepository mockCandidateRepository;
	@MockBean
	private InterviewerRepository mockInterviewerRepository;
	@MockBean
	private InterviewsRepository mockInterviewRepository;
	@MockBean
	private PacksRepository mockPacksRepository;
	@MockBean
	private RecruiterRepository mockRecruiterRepository;
	@MockBean
	private UserRepository mockUserRepository;
	
	
	private List<Candidate> candidateList;
	private List<Recruiter> recruiterList;
	private List<Interviewer> interviewerList;
	private List<AssessmentCenter> acList;
	private List<Pack> packList;
	List<Interview> interviewA;
	List<Interview> interviewB;
	List<Interview> interviewC;
	List<Role> rolesList;
	List<User> userList;
	
	
	@BeforeEach
	// prepare data
	void setUp() {
		LocalDateTime dateTime = LocalDateTime.now(); 
		LocalDate date = LocalDate.now();
		LocalTime time = LocalTime.now();

		
		// CANDIDATES 
		candidateList = new ArrayList<>();
		candidateList.add(new Candidate("Mr", "John", "William", "Smith", "0412321345", "JohnWSmith@Gmail.com", date, "123 Magicalfairyland steet", 1, "Data Science", "Magic Uni", "resume-link", "Java", "RecruitPhase1", "N/A"));
		candidateList.add(new Candidate("Ms", "Raquel", "Kasey", "Lacey", "0453194231", "RaquelKLacey@Gmail.com", date, "231 Magicalfairyland steet", 123, "Mechanical Engineering", "Magic Uni", "resume-link", "Business", "RecruitPhase3", "Re-Sit"));
		candidateList.add(new Candidate("Miss", "Sammi", "Corinna", "Radcliff", "0463927382", "SammiCRadcliff@Gmail.com", date, "23 Magicalfairyland steet", 14123123, "Data Science", "University co.", "resume-link", "Cloud Engineering", "RecruitPhase2", "N/A"));
		candidateList.add(new Candidate("Mr", "Burt", "Esmond", "Everill", "0452123623", "Burt_E_Everill@Gmail.com", date, "52 Magicalfairyland steet", 123123, "Electrial Engineering", "Boring Uni", "resume-link", "Java", "RecruitPhase1", "Re-Sit"));
		
		
		// RECRUITERS 
		recruiterList = new ArrayList<>();
		recruiterList.add(new Recruiter("Stephania Kristal Sommer", false));
		recruiterList.add(new Recruiter("Cynthia Katrina Shepard", false));
		recruiterList.add(new Recruiter("Darrell Irving Hunnicutt", false));
		recruiterList.add(new Recruiter("Kaitlyn Amberly Rigby", false));
		recruiterList.add(new Recruiter("Braelyn Petal Mathews", false));
		recruiterList.add(new Recruiter("Harper Jayceon Peel", false));
		recruiterList.add(new Recruiter("Jenelle Rosabella Carpenter", false));
		recruiterList.add(new Recruiter("Doyle Kendall Parent", false));
		recruiterList.add(new Recruiter("Kiaran Darnell Jephson", false));
		recruiterList.add(new Recruiter("Jenson Osbourne Ott", false));

		
		// INTERVIEWERS 
		interviewerList = new ArrayList<>();
		interviewerList.add(new Interviewer("Drummond Bria Lane",true));
		interviewerList.add(new Interviewer("Deryck Cynthia Garnett",true));
		interviewerList.add(new Interviewer("Eliana Kassie Quincy",true));
		interviewerList.add(new Interviewer("Myra Irvine Bannister",true));
		interviewerList.add(new Interviewer("Cherry Adele Oakley",true));
		interviewerList.add(new Interviewer("Kerena Alise Horton",false));
		interviewerList.add(new Interviewer("Haven Astra Petit",false));
		interviewerList.add(new Interviewer("Delilah Rosie Abbey",false));
		interviewerList.add(new Interviewer("Nikolas Lexine Yap",false));
		interviewerList.add(new Interviewer("Garnet Trista Bean",false));
		
		
		
		// PACKS 
		packList = new ArrayList<>();
//		packList.add(new Pack("Pack 1","Tech","Link..."));
//		packList.add(new Pack("Pack 2","Tech","Link..."));
//		packList.add(new Pack("Pack 3","Sales","Link..."));
//		packList.add(new Pack("Pack 4","Tech","Link..."));
//		packList.add(new Pack("Pack 5","Sales","Link..."));
		
		// ASSESSMENT CENTERS 
		acList = new ArrayList<>();
		acList.add(new AssessmentCenter("AC 1",LocalDate.of(2023, 3, 7),LocalTime.of(14, 30, 0, 0),LocalTime.of(16, 30, 0, 0),true));
		acList.add(new AssessmentCenter("AC 2",LocalDate.of(2023, 3, 8),LocalTime.of(14, 30, 0, 0),LocalTime.of(16, 30, 0, 0),true));
		acList.add(new AssessmentCenter("AC 3",LocalDate.of(2023, 3, 9),LocalTime.of(14, 30, 0, 0),LocalTime.of(16, 30, 0, 0),true));
		acList.add(new AssessmentCenter("AC 4",LocalDate.of(2023, 3, 10),LocalTime.of(14, 30, 0, 0),LocalTime.of(16, 30, 0, 0),true));
		acList.add(new AssessmentCenter("AC 5",LocalDate.of(2023, 3, 13),LocalTime.of(14, 30, 0, 0),LocalTime.of(16, 30, 0, 0),true));
		acList.add(new AssessmentCenter("AC 6",LocalDate.of(2023, 3, 14),LocalTime.of(14, 30, 0, 0),LocalTime.of(16, 30, 0, 0),true));
		acList.add(new AssessmentCenter("AC 7",LocalDate.of(2023, 3, 15),LocalTime.of(14, 30, 0, 0),LocalTime.of(16, 30, 0, 0),false));
		acList.add(new AssessmentCenter("AC 8",LocalDate.of(2023, 3, 16),LocalTime.of(14, 30, 0, 0),LocalTime.of(16, 30, 0, 0),false));
		acList.add(new AssessmentCenter("AC 9",LocalDate.of(2023, 3, 17),LocalTime.of(14, 30, 0, 0),LocalTime.of(16, 30, 0, 0),false));
		
		acList.get(0).setCoordinatorId(1);
		acList.get(1).setCoordinatorId(2);
		acList.get(2).setCoordinatorId(3);
		acList.get(3).setCoordinatorId(4);
		acList.get(4).setCoordinatorId(5);
		acList.get(5).setCoordinatorId(6);
		acList.get(6).setCoordinatorId(7);
		acList.get(7).setCoordinatorId(8);
		acList.get(8).setCoordinatorId(9);
		
		
		// AC 1 (A) 
		interviewA = new ArrayList<>();
		interviewA.add(new Interview("Feedback Form", time,1));
		interviewA.add(new Interview("Feedback Form", time,2));
		interviewA.add(new Interview("Feedback Form", time,3));
		interviewA.add(new Interview("Feedback Form", time,4));
		interviewA.add(new Interview("Feedback Form", time,5));
		interviewA.add(new Interview("Feedback Form", time,6));
		interviewA.add(new Interview("Feedback Form", time,7));
		interviewA.add(new Interview("Feedback Form", time,8));

		
		// Roles 
		rolesList = new ArrayList<>();
		rolesList.add(new Role());
		rolesList.add(new Role());
		rolesList.add(new Role());
		rolesList.add(new Role());

		rolesList.get(0).setName(ERole.ROLE_ADMIN);
		rolesList.get(1).setName(ERole.ROLE_INTERVIEWER);
		rolesList.get(2).setName(ERole.ROLE_RECRUITER);
		rolesList.get(3).setName(ERole.ROLE_CANDIDATE);

		
		// Auth Sign-In
		userList = new ArrayList<>();
		userList.add(new User("admin1","admin1@gmail.com","admin1","adminName1"));
		userList.add(new User("interviewer1","interviewer1@gmail.com","interviewer1","interviewerName1"));
		userList.add(new User("interviewer2","interviewer2@gmail.com","interviewer2","interviewerName2"));
		userList.add(new User("interviewer3","interviewer3@gmail.com","interviewer3","interviewerName3"));
		userList.add(new User("interviewer4","interviewer4@gmail.com","interviewer4","interviewerName4"));
		userList.add(new User("recruiter1","recruiter1@gmail.com","recruiter1","recruiterName1"));
		userList.add(new User("recruiter2","recruiter2@gmail.com","recruiter2","recruiterName2"));
		userList.add(new User("candidate1","candidate1@gmail.com","candidate1","candidateName1"));
		userList.add(new User("candidate2","candidate2@gmail.com","candidate2","candidateName2"));
		userList.add(new User("candidate3","candidate3@gmail.com","candidate3","candidateName3"));
		userList.add(new User("candidate4","candidate4@gmail.com","candidate4","candidateName4"));
	}
	
//	@Test
//	// ensure at beginning all entity are not linked with each other
//	void test_condition() {
//		
//		for (AssessmentCenter assessmentCenter : acList) {
//			assertEquals(assessmentCenter.getCandidates().size(), 0);
//			assertEquals(assessmentCenter.getInterviews().size(), 0);
//			assertEquals(assessmentCenter.getInterviewers().size(), 0);
//			assertEquals(assessmentCenter.getRecruiters().size(), 0);
//		}
//		
//		for (Candidate candidate : candidateList) {
//			assertEquals(candidate.getAssessmentCenters().size(), 0);
//			assertEquals(candidate.getInterviews().size(), 0);
//			assertTrue(candidate.getUser() == null);
//			assertEquals(candidate.getRecruiters().size(), 0);
//		}
//		
//		for (Interview interview : interviewA) {
//			assertTrue(interview.getInterviewer() == null);
//			assertTrue(interview.getAssessmentCenter() == null);
//			assertTrue(interview.getCandidate() == null);
//			assertEquals(interview.getPacks().size(), 0);
//		}
//		
//		for (Interviewer interviewer : interviewerList) {
//			assertEquals(interviewer.getInterviews().size(), 0);
//			assertEquals(interviewer.getAssessmentCenters().size(), 0);
//			assertTrue(interviewer.getUser() == null);
//		}
//		
//		for (Pack pack : packList) {
//			assertEquals(pack.getInterviews().size(), 0);
//		}
//		
//		for (Recruiter recruiter : recruiterList) {
//			assertEquals(recruiter.getAssessmentCenters().size(), 0);
//			assertEquals(recruiter.getCandidates().size(), 0);
//		}
//		
//	}
	
	
	/* --------------------------------- This section test all add and remove function act properly --------------------------------- */
	
	
	@Test 
	void test_assessmentCenter_add_interviewer() {
		AssessmentCenter ac1 = acList.get(0);
		Interviewer interviewer = interviewerList.get(0);
		ac1.addInterviewer(interviewer);
		assertTrue(interviewer.getAssessmentCenters().get(0) == ac1);
		assertTrue(ac1.getInterviewers().get(0) == interviewer);
		assertTrue(interviewer.getAssessmentCenters().size() == 1);
		assertTrue(ac1.getInterviewers().size() == 1);
	}
	
	@Test 
	void test_interviewer_add_assessmentCenter() {
		AssessmentCenter ac1 = acList.get(0);
		Interviewer interviewer = interviewerList.get(0);
		interviewer.addAssessmentCenter(ac1);
		// ac1.addInterviewer(interviewer);
		assertTrue(interviewer.getAssessmentCenters().get(0) == ac1);
		assertTrue(ac1.getInterviewers().get(0) == interviewer);
		assertTrue(interviewer.getAssessmentCenters().size() == 1);
		assertTrue(ac1.getInterviewers().size() == 1);
	}
	
	@Test 
	void test_assessmentCenter_remove_interviewer(){
		AssessmentCenter ac1 = acList.get(0);
		Interviewer interviewer = interviewerList.get(0);
		ac1.addInterviewer(interviewer);
		ac1.removeInterviewer(interviewer);
		assertTrue(interviewer.getAssessmentCenters().size() == 0);
		assertTrue(ac1.getInterviewers().size() == 0);
	}
	
	@Test
	void test_interviewer_remove_assessmentCenter(){
		AssessmentCenter ac1 = acList.get(0);
		Interviewer interviewer = interviewerList.get(0);
		ac1.addInterviewer(interviewer);
		interviewer.removeAssessmentCenter(ac1);
		// ac1.removeInterviewer(interviewer);
		assertTrue(interviewer.getAssessmentCenters().size() == 0);
		assertTrue(ac1.getInterviewers().size() == 0);
	}
	
	@Test
	void test_assessmentCenter_add_interview() {
		AssessmentCenter ac1 = acList.get(0);
		Interview interview = interviewA.get(0);
		ac1.addInterview(interview);
		assertTrue(interview.getAssessmentCenter() == ac1);
		assertTrue(ac1.getInterviews().get(0) == interview);
		assertEquals(ac1.getInterviews().size(), 1);
	}
	
	@Test
	void test_assessmentCenter_remove_interview() {
		AssessmentCenter ac1 = acList.get(0);
		Interview interview = interviewA.get(0);
		ac1.addInterview(interview);
		ac1.removeInterview(interview);
		// assertTrue(interview.getAssessmentCenter() == ac1);
		assertTrue(ac1.getInterviews().size() == 0);
		assertTrue(interview.getAssessmentCenter() == null);
	}
	
	@Test
	void test_assessmentCenter_add_candidate() {
		AssessmentCenter ac1 = acList.get(0);
		Candidate candidate = candidateList.get(0);
		ac1.addCandidate(candidate);
		assertTrue(candidate.getAssessmentCenters().get(0) == ac1);
		assertTrue(ac1.getCandidates().get(0) == candidate);
		assertTrue(candidate.getAssessmentCenters().size() == 1);
		assertTrue(ac1.getCandidates().size() == 1);
	}
	
	@Test
	void test_assessmentCenter_remove_candidate() {
		AssessmentCenter ac1 = acList.get(0);
		Candidate candidate = candidateList.get(0);
		ac1.addCandidate(candidate); // add candidate to make both side have each other
		ac1.removeCandidate(candidate);
		assertTrue(candidate.getAssessmentCenters().size() == 0);
		assertTrue(ac1.getCandidates().size() == 0);
	}
	
	@Test
	void test_assessmentCenter_add_recruiter() {
		AssessmentCenter ac1 = acList.get(0);
		Recruiter recruiter = recruiterList.get(0);
		ac1.addRecruiter(recruiter);
		assertTrue(recruiter.getAssessmentCenters().get(0) == ac1);
		assertTrue(ac1.getRecruiters().get(0) == recruiter);
		assertTrue(recruiter.getAssessmentCenters().size() == 1);
		assertTrue(ac1.getRecruiters().size() == 1);
	}
	
	@Test
	void test_assessmentCenter_remove_recruiter() {
		AssessmentCenter ac1 = acList.get(0);
		Recruiter recruiter = recruiterList.get(0);
		ac1.addRecruiter(recruiter); // add candidate to make both side have each other
		ac1.removeRecruiter(recruiter);
		assertTrue(recruiter.getAssessmentCenters().size() == 0);
		assertTrue(ac1.getRecruiters().size() == 0);
	}
	
	// candidate
	@Test
	void test_candidate_add_assessmentCenter() {
		Candidate candidate = candidateList.get(0);
		AssessmentCenter ac = acList.get(0);
		candidate.addAssessmentCenter(ac);
		assertTrue(candidate.getAssessmentCenters().get(0) == ac);
		assertTrue(ac.getCandidates().get(0) == candidate);
		assertTrue(candidate.getAssessmentCenters().size() == 1);
		assertTrue(ac.getCandidates().size() == 1);
	}
	
	@Test
	void test_candidate_remove_assessmentCenter() {
		Candidate candidate = candidateList.get(0);
		AssessmentCenter ac = acList.get(0);
		candidate.addAssessmentCenter(ac); // add candidate to make both side have each other
		candidate.removeAssessmentCenter(ac);
		assertTrue(candidate.getAssessmentCenters().size() == 0);
		assertTrue(ac.getCandidates().size() == 0);
	}
	
	@Test
	void test_candidate_add_interview() {
		Candidate candidate = candidateList.get(0);
		Interview interview = interviewA.get(0);
		candidate.addInterview(interview);
		assertTrue(candidate.getInterviews().get(0) == interview);
		assertTrue(interview.getCandidate() == candidate);
		assertTrue(candidate.getInterviews().size() == 1);
	}
	
	@Test
	void test_candidate_remove_interview() {
		Candidate candidate = candidateList.get(0);
		Interview interview = interviewA.get(0);
		candidate.addInterview(interview);
		candidate.removeInterview(interview);
		assertTrue(candidate.getInterviews().size() == 0);
		assertTrue(interview.getCandidate() == null);
	}
	
	@Test
	void test_candidate_add_user() {
		Candidate candidate = candidateList.get(0);
		User user = userList.get(0);
		candidate.addUser(user);
		assertTrue(user.getCandidate() == candidate);
		assertTrue(candidate.getUser() == user);
	}
	
	@Test
	void test_candidate_remove_user() {
		Candidate candidate = candidateList.get(0);
		User user = userList.get(0);
		candidate.addUser(user);
		candidate.removeUser();
		assertTrue(candidate.getUser() == null);
		assertTrue(user.getCandidate() == null);
	}
	
	@Test
	void test_candidate_add_recruiter() {
		Candidate candidate = candidateList.get(0);
		Recruiter recruiter = recruiterList.get(0);
		candidate.addRecruiter(recruiter);
		assertTrue(candidate.getRecruiters().get(0) == recruiter);
		assertTrue(recruiter.getCandidates().get(0) == candidate);
		assertTrue(candidate.getRecruiters().size() == 1);
		assertTrue(recruiter.getCandidates().size() == 1);
	}
	
	@Test
	void test_candidate_remove_recruiter() {
		Candidate candidate = candidateList.get(0);
		Recruiter recruiter = recruiterList.get(0);
		candidate.addRecruiter(recruiter); // add candidate to make both side have each other
		candidate.removeRecruiter(recruiter);
		assertTrue(candidate.getRecruiters().size() == 0);
		assertTrue(recruiter.getCandidates().size() == 0);
	}
	
	@Test
	void test_interview_add_interviewer() {
		Interview interview = interviewA.get(0);
		Interviewer interviewer = interviewerList.get(0);
		interview.addInterviewer(interviewer);
		assertTrue(interview.getInterviewer() == interviewer);
		assertTrue(interviewer.getInterviews().get(0) == interview);
	}
	
	@Test
	void test_interview_remove_interviewer() {
		Interview interview = interviewA.get(0);
		Interviewer interviewer = interviewerList.get(0);
		interview.addInterviewer(interviewer);
		interview.removeInterviewer();
		assertTrue(interview.getInterviewer() == null);
		assertTrue(interviewer.getInterviews().size() == 0);
	}
	
	@Test
	void test_interview_add_assessmentCenter() {
		Interview interview = interviewA.get(0);
		AssessmentCenter ac = acList.get(0);
		interview.addAssessmentCenter(ac);
		assertTrue(interview.getAssessmentCenter() == ac);
		assertTrue(ac.getInterviews().get(0) == interview);
	}
	
	@Test
	void test_interview_remove_assessmentCenter() {
		Interview interview = interviewA.get(0);
		AssessmentCenter ac = acList.get(0);
		interview.addAssessmentCenter(ac);
		interview.removeAssessmentCenter();
		assertTrue(interview.getAssessmentCenter() == null);
		assertTrue(ac.getInterviews().size() == 0);
	}
	
	@Test
	void test_interview_add_candidate() {
		Interview interview = interviewA.get(0);
		Candidate candidate = candidateList.get(0);
		interview.addCandidate(candidate);
		assertTrue(interview.getCandidate() == candidate);
		assertTrue(candidate.getInterviews().get(0) == interview);
	}
	
	@Test
	void test_interview_remove_candidate() {
		Interview interview = interviewA.get(0);
		Candidate candidate = candidateList.get(0);
		interview.addCandidate(candidate);
		interview.removeCandidate();
		assertTrue(interview.getCandidate() == null);
		assertTrue(candidate.getInterviews().size() == 0);
	}
	
//	@Test
//	void test_interview_add_pack() {
//		Interview interview = interviewA.get(0);
//		Pack pack = packList.get(0);
//		interview.addPack(pack);
//		assertTrue(interview.getPacks().get(0) == pack);
//		assertTrue(pack.getInterviews().get(0) == interview);
//	}
//	
//	@Test
//	void test_interview_remove_pack() {
//		Interview interview = interviewA.get(0);
//		Pack pack = packList.get(0);
//		interview.addPack(pack);
//		interview.removePack(pack);
//		assertTrue(interview.getPacks().size() == 0);
//		assertTrue(pack.getInterviews().size() == 0);
//	}
	
	@Test
	void test_interviewer_add_interview() {
		Interviewer interviewer = interviewerList.get(0);
		Interview interview = interviewA.get(0);
		interviewer.addInterview(interview);
		assertTrue(interviewer.getInterviews().get(0) == interview);
		assertTrue(interview.getInterviewer() == interviewer);
	}
	
	@Test
	void test_interviewer_remove_interview() {
		Interviewer interviewer = interviewerList.get(0);
		Interview interview = interviewA.get(0);
		interviewer.addInterview(interview);
		interviewer.removeInterview(interview);
		assertTrue(interviewer.getInterviews().size() == 0);
		assertTrue(interview.getInterviewer() == null);
	}
	
	@Test
	void test_interviewer_add_user() {
		Interviewer interviewer = interviewerList.get(0);
		User user = userList.get(0);
		interviewer.addUser(user);
		assertTrue(user.getInterviewer() == interviewer);
		assertTrue(interviewer.getUser() == user);
	}
	
	@Test
	void test_interviewer_remove_user() {
		Interviewer interviewer = interviewerList.get(0);
		User user = userList.get(0);
		interviewer.addUser(user);
		interviewer.removeUser();
		assertTrue(user.getInterviewer() == null);
		assertTrue(interviewer.getUser() == null);
	}
	
//	@Test
//	void test_pack_add_interview() {
//		Pack pack = packList.get(0);
//		Interview interview = interviewA.get(0);
//		pack.addInterviews(interview);
//		assertTrue(pack.getInterviews().get(0) == interview);
//		assertTrue(interview.getPacks().get(0) == pack);
//	}
//	
//	@Test
//	void test_pack_remove_interview() {
//		Pack pack = packList.get(0);
//		Interview interview = interviewA.get(0);
//		pack.addInterviews(interview);
//		pack.removeInterviews(interview);
//		assertTrue(pack.getInterviews().size() == 0);
//		assertTrue(interview.getPacks().size() == 0);
//	}
	
	@Test
	void test_recruiter_add_assessmentCenter()  {
		Recruiter recruiter = recruiterList.get(0);
		AssessmentCenter ac = acList.get(0);
		recruiter.addAssessmentCenter(ac);
		assertTrue(recruiter.getAssessmentCenters().get(0) == ac);
		assertTrue(ac.getRecruiters().get(0) == recruiter);
	}
	
	@Test
	void test_recruiter_remove_assessmentCenter()  {
		Recruiter recruiter = recruiterList.get(0);
		AssessmentCenter ac = acList.get(0);
		recruiter.addAssessmentCenter(ac);
		recruiter.removeAssessmentCenter(ac);
		assertTrue(recruiter.getAssessmentCenters().size() == 0);
		assertTrue(ac.getRecruiters().size() == 0);
	}
	
	@Test
	void test_recruiter_add_user() {
		Recruiter recruiter = recruiterList.get(0);
		User user = userList.get(0);
		recruiter.addUser(user);
		assertTrue(recruiter.getUser() == user);
		assertTrue(user.getRecruiter() == recruiter);
	}
	
	@Test
	void test_recruiter_remove_user() {
		Recruiter recruiter = recruiterList.get(0);
		User user = userList.get(0);
		recruiter.addUser(user);
		recruiter.removeUser();
		assertTrue(recruiter.getUser() == null);
		assertTrue(user.getRecruiter() == null);
	}
	
	@Test
	void test_recruiter_add_candidate() {
		Recruiter recruiter = recruiterList.get(0);
		Candidate candidate = candidateList.get(0);
		recruiter.addCandidate(candidate);
		assertTrue(recruiter.getCandidates().get(0) == candidate);
		assertTrue(candidate.getRecruiters().get(0) == recruiter);
	}
	
	@Test
	void test_recruiter_remove_candidate() {
		Recruiter recruiter = recruiterList.get(0);
		Candidate candidate = candidateList.get(0);
		recruiter.addCandidate(candidate);
		recruiter.removeCandidate(candidate);
		assertTrue(recruiter.getCandidates().size() == 0);
		assertTrue(candidate.getRecruiters().size() == 0);
	}
	
	
	@Test
	void test_user_remove_interviewer() {
		User user = userList.get(0);
		Interviewer interviewer = interviewerList.get(0);
		interviewer.addUser(user);
		user.removeInterviewer();
		assertTrue(user.getInterviewer() == null);
		assertTrue(interviewer.getUser() == null);
	}
	
	@Test
	void test_user_remove_recruiter() {
		User user = userList.get(0);
		Recruiter recruiter = recruiterList.get(0);
		recruiter.addUser(user);
		user.removeRecruiter();
		assertTrue(user.getRecruiter() == null);
		assertTrue(recruiter.getUser() == null);
	}
	
	@Test
	void test_user_remove_candidate() {
		User user = userList.get(0);
		Candidate candidate = candidateList.get(0);
		candidate.addUser(user);
		user.removeCandidate();
		assertTrue(user.getCandidate() == null);
		assertTrue(candidate.getUser() == null);
	}

}
