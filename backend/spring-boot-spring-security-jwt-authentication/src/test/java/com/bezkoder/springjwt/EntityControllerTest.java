package com.bezkoder.springjwt;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.bezkoder.springjwt.controllers.AuthController;
import com.bezkoder.springjwt.controllers.EntityController;
import com.bezkoder.springjwt.exceptions.BadRequestException;
import com.bezkoder.springjwt.exceptions.NotFoundException;
import com.bezkoder.springjwt.models.AssessmentCenter;
import com.bezkoder.springjwt.models.Candidate;
import com.bezkoder.springjwt.models.ERole;
import com.bezkoder.springjwt.models.Interview;
import com.bezkoder.springjwt.models.Interviewer;
import com.bezkoder.springjwt.models.Pack;
import com.bezkoder.springjwt.models.Recruiter;
import com.bezkoder.springjwt.models.Role;
import com.bezkoder.springjwt.models.User;
import com.bezkoder.springjwt.payload.request.LoginRequest;
import com.bezkoder.springjwt.payload.request.SignupRequest;
import com.bezkoder.springjwt.repository.AssessmentCenterRepository;
import com.bezkoder.springjwt.repository.CandidateRepository;
import com.bezkoder.springjwt.repository.InterviewerRepository;
import com.bezkoder.springjwt.repository.InterviewsRepository;
import com.bezkoder.springjwt.repository.PacksRepository;
import com.bezkoder.springjwt.repository.RecruiterRepository;
import com.bezkoder.springjwt.repository.RoleRepository;
import com.bezkoder.springjwt.repository.UserRepository;
import com.bezkoder.springjwt.security.jwt.JwtUtils;

@SpringBootTest
//@ExtendWith(MockitoExtension.class)
public class EntityControllerTest {
	
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
	
	
	private void addLinkForInterview(Interview interview,AssessmentCenter ac, Interviewer interviewer, Candidate candidate) {
		interview.addAssessmentCenter(ac);
		interview.addInterviewer(interviewer);
		interview.addCandidate(candidate);
	}
	
	@BeforeEach
	void setUp() {
		
		//Pre Load data
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
		packList.add(new Pack("Pack 1","Tech","Link..."));
		packList.add(new Pack("Pack 2","Tech","Link..."));
		packList.add(new Pack("Pack 3","Sales","Link..."));
		packList.add(new Pack("Pack 4","Tech","Link..."));
		packList.add(new Pack("Pack 5","Sales","Link..."));
		
		
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
		
			
		// INTERVIEWS
		interviewA = new ArrayList<>();
		interviewA.add(new Interview("Feedback Form", time,1));
		interviewA.add(new Interview("Feedback Form", time,2));
		interviewA.add(new Interview("Feedback Form", time,3));
		interviewA.add(new Interview("Feedback Form", time,4));
		interviewA.add(new Interview("Feedback Form", time,5));
		interviewA.add(new Interview("Feedback Form", time,6));
		interviewA.add(new Interview("Feedback Form", time,7));
		interviewA.add(new Interview("Feedback Form", time,8));
		
		addLinkForInterview(interviewA.get(0), acList.get(0), interviewerList.get(2), candidateList.get(0)); // 1
		addLinkForInterview(interviewA.get(1), acList.get(0), interviewerList.get(3), candidateList.get(0)); // 2
		addLinkForInterview(interviewA.get(2), acList.get(0), interviewerList.get(3), candidateList.get(1)); // 3
		addLinkForInterview(interviewA.get(3), acList.get(0), interviewerList.get(1), candidateList.get(1)); // 4
		addLinkForInterview(interviewA.get(4), acList.get(0), interviewerList.get(5), candidateList.get(2)); // 5
		addLinkForInterview(interviewA.get(5), acList.get(0), interviewerList.get(5), candidateList.get(2)); // 6
		addLinkForInterview(interviewA.get(6), acList.get(0), interviewerList.get(7), candidateList.get(3)); // 7
		addLinkForInterview(interviewA.get(7), acList.get(0), interviewerList.get(8), candidateList.get(3)); // 8
		
		
		candidateList.get(0).addAssessmentCenter(acList.get(0));
		candidateList.get(1).addAssessmentCenter(acList.get(0));
		candidateList.get(2).addAssessmentCenter(acList.get(0));
		candidateList.get(3).addAssessmentCenter(acList.get(0));
		interviewerList.get(2).addAssessmentCenter(acList.get(0));
		interviewerList.get(3).addAssessmentCenter(acList.get(0));
		interviewerList.get(1).addAssessmentCenter(acList.get(0));
		interviewerList.get(5).addAssessmentCenter(acList.get(0));
		interviewerList.get(7).addAssessmentCenter(acList.get(0));
		interviewerList.get(8).addAssessmentCenter(acList.get(0));
		
		// AC 2 (B)
		interviewB = new ArrayList<>();
		interviewB.add(new Interview("Feedback Form", time,10));
		interviewB.add(new Interview("Feedback Form", time,20));
		interviewB.add(new Interview("Feedback Form", time,30));
		interviewB.add(new Interview("Feedback Form", time,40));
		interviewB.add(new Interview("Feedback Form", time,50));
		interviewB.add(new Interview("Feedback Form", time,60));
		
		addLinkForInterview(interviewB.get(0), acList.get(1),interviewerList.get(4),candidateList.get(0)); // 1
		addLinkForInterview(interviewB.get(1), acList.get(0), interviewerList.get(2), candidateList.get(0)); // 2
		addLinkForInterview(interviewB.get(2), acList.get(1),interviewerList.get(3),candidateList.get(1)); // 3
		addLinkForInterview(interviewB.get(3), acList.get(1),interviewerList.get(8),candidateList.get(1)); // 4
		addLinkForInterview(interviewB.get(4), acList.get(1),interviewerList.get(5),candidateList.get(2)); // 5
		addLinkForInterview(interviewB.get(5), acList.get(1),interviewerList.get(7),candidateList.get(2)); // 6
		
		
		candidateList.get(0).addAssessmentCenter(acList.get(1));
		candidateList.get(1).addAssessmentCenter(acList.get(1));
		candidateList.get(2).addAssessmentCenter(acList.get(1));
		interviewerList.get(4).addAssessmentCenter(acList.get(1));
		interviewerList.get(3).addAssessmentCenter(acList.get(1));
		interviewerList.get(8).addAssessmentCenter(acList.get(1));
		interviewerList.get(5).addAssessmentCenter(acList.get(1));
		interviewerList.get(7).addAssessmentCenter(acList.get(1));
		
		// AC 3	(C)
		interviewC = new ArrayList<>();
		interviewC.add(new Interview("Feedback Form", time,23));
		interviewC.add(new Interview("Feedback Form", time,123));
		interviewC.add(new Interview("Feedback Form", time,63));
		interviewC.add(new Interview("Feedback Form", time,478));
		interviewC.add(new Interview("Feedback Form", time,234));
		interviewC.add(new Interview("Feedback Form", time,613));
		interviewC.add(new Interview("Feedback Form", time,123));
		interviewC.add(new Interview("Feedback Form", time,52));
		
		addLinkForInterview(interviewC.get(0), acList.get(2),interviewerList.get(2),candidateList.get(0));
		addLinkForInterview(interviewC.get(1), acList.get(2),interviewerList.get(1),candidateList.get(0));
		addLinkForInterview(interviewC.get(2), acList.get(2),interviewerList.get(4),candidateList.get(1));
		addLinkForInterview(interviewC.get(3), acList.get(2),interviewerList.get(4),candidateList.get(1));
		addLinkForInterview(interviewC.get(4), acList.get(2),interviewerList.get(6),candidateList.get(2));
		addLinkForInterview(interviewC.get(5), acList.get(2),interviewerList.get(6),candidateList.get(2));
		addLinkForInterview(interviewC.get(6), acList.get(2),interviewerList.get(7),candidateList.get(3));
		addLinkForInterview(interviewC.get(7), acList.get(2),interviewerList.get(8),candidateList.get(3));
		
		
		
		candidateList.get(0).addAssessmentCenter(acList.get(2));
		candidateList.get(1).addAssessmentCenter(acList.get(2));
		candidateList.get(2).addAssessmentCenter(acList.get(2));
		candidateList.get(3).addAssessmentCenter(acList.get(2));
		interviewerList.get(2).addAssessmentCenter(acList.get(2));
		interviewerList.get(1).addAssessmentCenter(acList.get(2));
		interviewerList.get(4).addAssessmentCenter(acList.get(2));
		interviewerList.get(6).addAssessmentCenter(acList.get(2));
		interviewerList.get(7).addAssessmentCenter(acList.get(2));
		interviewerList.get(8).addAssessmentCenter(acList.get(2));
		
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
		userList.get(0).addRole(rolesList.get(0));
		userList.add(new User("interviewer1","interviewer1@gmail.com","interviewer1","interviewerName1"));
		userList.get(1).addRole(rolesList.get(1));
		interviewerList.get(0).addUser(userList.get(1));
		userList.add(new User("interviewer2","interviewer2@gmail.com","interviewer2","interviewerName2"));
		userList.get(2).addRole(rolesList.get(1));
		interviewerList.get(1).addUser(userList.get(2));
		userList.add(new User("interviewer3","interviewer3@gmail.com","interviewer3","interviewerName3"));
		userList.get(3).addRole(rolesList.get(1));
		interviewerList.get(2).addUser(userList.get(3));
		userList.add(new User("interviewer4","interviewer4@gmail.com","interviewer4","interviewerName4"));
		userList.get(4).addRole(rolesList.get(1));
		interviewerList.get(3).addUser(userList.get(4));
		userList.add(new User("recruiter1","recruiter1@gmail.com","recruiter1","recruiterName1"));
		userList.get(5).addRole(rolesList.get(2));
		recruiterList.get(0).addUser(userList.get(5));
		userList.add(new User("recruiter2","recruiter2@gmail.com","recruiter2","recruiterName2"));
		userList.get(6).addRole(rolesList.get(2));
		recruiterList.get(1).addUser(userList.get(6));
		
		userList.add(new User("candidate1","candidate1@gmail.com","candidate1","candidateName1"));
		userList.get(7).addRole(rolesList.get(3));
		candidateList.get(0).addUser(userList.get(7));
		userList.add(new User("candidate2","candidate2@gmail.com","candidate2","candidateName2"));
		userList.get(8).addRole(rolesList.get(3));
		candidateList.get(1).addUser(userList.get(8));
		userList.add(new User("candidate3","candidate3@gmail.com","candidate3","candidateName3"));
		userList.get(9).addRole(rolesList.get(3));
		candidateList.get(2).addUser(userList.get(9));
		userList.add(new User("candidate4","candidate4@gmail.com","candidate4","candidateName4"));
		userList.get(10).addRole(rolesList.get(3));
		candidateList.get(3).addUser(userList.get(10));
		
		candidateList.get(0).addAssessmentCenter(acList.get(0));
		candidateList.get(0).addAssessmentCenter(acList.get(1));
		candidateList.get(1).addAssessmentCenter(acList.get(1));
		candidateList.get(2).addAssessmentCenter(acList.get(2));
		candidateList.get(3).addAssessmentCenter(acList.get(4));
		candidateList.get(3).addAssessmentCenter(acList.get(5));
		candidateList.get(3).addAssessmentCenter(acList.get(2));
		
		// link candidate and recruiter
		candidateList.get(0).addRecruiter(recruiterList.get(0));
		candidateList.get(1).addRecruiter(recruiterList.get(1));
		candidateList.get(2).addRecruiter(recruiterList.get(2));
		candidateList.get(2).addRecruiter(recruiterList.get(1));
		candidateList.get(3).addRecruiter(recruiterList.get(1));
		candidateList.get(2).addRecruiter(recruiterList.get(1));
		candidateList.get(1).addRecruiter(recruiterList.get(4));
	}
	
	@Test
	void test_condition() {
		assertTrue(candidateList.get(0).getRecruiters().size() == 1);
	}
	
	@Test

	// test api get all ac working properly when there is some data in database

	void test_getAllAC_with_two_data_points() {

	List<AssessmentCenter> input = acList;

	when(mockACRepo.findAll()).thenReturn(input);

	List<AssessmentCenter> result = controller.getAllAC();

	verify(mockACRepo, times(1)).findAll();

	assertEquals(result, input);

	}


	@Test

	void test_getACbyId_id_exist() {

		// setup
	
		AssessmentCenter ac1 = acList.get(0);
	
		int id = 1;
	
		Optional<AssessmentCenter> input = Optional.of(ac1);
	
		when(mockACRepo.findById(id)).thenReturn(input);
	
	
		// test
	
	
		AssessmentCenter result = controller.getACbyId(id);
	
		verify(mockACRepo, times(1)).findById(id);
	
		assertEquals(result, ac1);

	}


	@Test

	void test_getACbyId_id_not_found() {

		
	
		int id = 1;
	
		when(mockACRepo.findById(id)).thenThrow(NotFoundException.class);
	
		assertThrows(NotFoundException.class, () -> {
	
			controller.getACbyId(id);
	
		});
	
		verify(mockACRepo, times(1)).findById(id);

	}
	
	@Test
	void test_getAllCandidate_no_filter() {
		when(mockCandidateRepository.getByFilter(null, null, null)).thenReturn(candidateList);
		List<Candidate> result = controller.getAllCandidate(null, null, null);
		assertEquals(result, this.candidateList);
		verify(mockCandidateRepository, times(1)).getByFilter(null, null, null);
	}
	
	@Test
	void test_getAllCandidate_with_filter() {
		when(mockCandidateRepository.getByFilter("test1", "test2", "test3")).thenReturn(candidateList);
		List<Candidate> result = controller.getAllCandidate("test1", "test2", "test3");
		assertEquals(result, this.candidateList);
		verify(mockCandidateRepository, times(1)).getByFilter("test1", "test2", "test3");
	}
	
	@Test
	void test_getAllCandidate_with_filter_equal_blank() {
		when(mockCandidateRepository.getByFilter(null, null, null)).thenReturn(candidateList);
		List<Candidate> result = controller.getAllCandidate("", "", "");
		assertEquals(result, this.candidateList);
		verify(mockCandidateRepository, times(1)).getByFilter(null, null, null);
	}
	
	@Test
	void test_getCandidatebyId_result_found() {
		int id = 1;
		Optional<Candidate> candidate = Optional.of(candidateList.get(0));
		when(mockCandidateRepository.findById(id)).thenReturn(candidate);
		Candidate result = controller.getCandidatebyId(id);
		
		assertEquals(result, candidateList.get(0));
		verify(mockCandidateRepository, times(1)).findById(id);
	}
	
	@Test
	void test_getCandidatebyId_result_not_found() {
		int id = 1;
		//Optional<Candidate> candidate = Optional.of(candidateList.get(0));
		when(mockCandidateRepository.findById(id)).thenReturn(Optional.ofNullable(null));
		
		// Candidate result = controller.getCandidatebyId(id);
		
		assertThrows(NotFoundException.class, () -> {controller.getCandidatebyId(id);});
		verify(mockCandidateRepository, times(1)).findById(id);
	}
	
	@Test
	void test_getCandidatebyIdWithLinkedInfo_id_found() {
		int id = 1;
		Candidate candidate = candidateList.get(0);
		Optional<Candidate> candidate_optional = Optional.of(candidate);
		when(mockCandidateRepository.findById(id)).thenReturn(candidate_optional);
		
		List<HashMap<String, Object>> result = controller.getCandidatebyIdWithLinkedInfo(id);
		
		assertEquals(result.size(), candidate.getInterviews().size()); // check same number of interview returned
		// check each returned hashmap 
		for (int i = 0; i < candidate.getInterviews().size(); i++) {
			HashMap<String, Object> tempHash = result.get(i);
			Interview tempInterview = candidate.getInterviews().get(i);
			assertEquals(tempHash.get("AC_id"), (tempInterview.getAssessmentCenter() == null) ? null : tempInterview.getAssessmentCenter().getId());
			assertEquals(tempHash.get("interviewer"), tempInterview.getInterviewer());
			assertEquals(tempHash.get("time"), tempInterview.getInterviewTime());
			assertEquals(tempHash.get("score"), tempInterview.getScore());
			assertEquals(tempHash.get("comment"), tempInterview.getComment());
		}
		// verify(candidate, times(1)).getInterviews();
	}
	
	@Test
	void test_getCandidatebyIdWithLinkedInfo_id_not_found() {
		int id = 1;
		// when(mockCandidateRepository.findById(null))
		when(mockCandidateRepository.findById(id)).thenReturn(Optional.ofNullable(null));
		
		NotFoundException exception = assertThrows(NotFoundException.class, () -> { controller.getCandidatebyIdWithLinkedInfo(id); });
	}
	
	
	@Test 
	void test_getCandidatebyIdWithLinkedInfo_id_found_all_field_empty() {
		int id = 1;
		Candidate emptyCandidate = new Candidate();
		Optional<Candidate> optionalEmptyCandidate = Optional.of(emptyCandidate);
		when(mockCandidateRepository.findById(id)).thenReturn(optionalEmptyCandidate);
		
		List<HashMap<String,Object>> result = controller.getCandidatebyIdWithLinkedInfo(id);
		
		//verify(emptyCandidate, times(1)).getInterviews();
		assertEquals(result.size(), 0);
	}
	
	
	@Test
	void test_deleteCandidateById_id_exist() {
		int id = 1;
		Candidate candidate = candidateList.get(0);
		Optional<Candidate> optionalCandidate = Optional.of(candidate);
		when(mockCandidateRepository.findById(id)).thenReturn(optionalCandidate);
		User user = candidate.getUser();
		List<Interview> interviews = candidate.getInterviews();
		List<Recruiter> recruiters = candidate.getRecruiters();
		List<AssessmentCenter> acs = candidate.getAssessmentCenters();
		assertTrue( (user != null) );
		assertEquals(interviews.size(), 6);
		assertEquals(recruiters.size(), 1);
		assertEquals(acs.size(), 5);
		
		controller.deleteCandidateById(id);
		
		
		// check successful removal of all links from candidate
		assertTrue(candidate.getAssessmentCenters().size() == 0);
		assertTrue(candidate.getInterviews().size() == 0);
		assertTrue(candidate.getRecruiters().size() == 0);
		assertTrue(candidate.getUser() == null);
		// check successful removal of candidate from every link
		for (Interview interview : interviews) {
			assertTrue(interview.getCandidate() == null);
		}
		for (AssessmentCenter ac : acs) {
			assertTrue(! ac.getCandidates().contains(candidate));
		}
		for (Recruiter recruiter : recruiters) {
			assertTrue(! recruiter.getCandidates().contains(candidate));
		}
		assertTrue(user.getCandidate() == null);
		// makesure the delete is called
		verify(mockCandidateRepository, times(1)).deleteById(id);
	}
	
	@Test
	void test_deleteCandidateById_id_not_exist() {
		int id = 1;
		when(mockCandidateRepository.findById(id)).thenReturn(Optional.ofNullable(null));
		assertThrows(NotFoundException.class, () -> {controller.deleteCandidateById(id);});
	}
	
	@Test
	void test_createCandidate() {
		Candidate candidate = candidateList.get(0);
		when(mockCandidateRepository.save(candidate)).thenReturn(candidate);
		
		Candidate result = controller.createCandidate(candidate);
		
		verify(mockCandidateRepository,times(1)).save(candidate);	
		assertEquals(result, candidate);
	}
	
	@Test
	void test_modifyCandidate_id_found() {
		// int id = 1;
		Candidate candidate = candidateList.get(0);
		when(mockCandidateRepository.findById(candidate.getId())).thenReturn(Optional.of(candidate));
		when(mockCandidateRepository.save(candidate)).thenReturn(candidate);

		
		Candidate result = controller.modifyCandidate(candidate);
		
		verify(mockCandidateRepository, times(1)).save(candidate);
		assertEquals(candidate, result);
	}
	
	@Test
	void test_modifyCandidate_id_not_found() {
		int id = 1;
		Candidate candidate = candidateList.get(0);
		when(mockCandidateRepository.findById(id)).thenReturn(Optional.ofNullable(null));
		assertThrows(NotFoundException.class, () -> {controller.modifyCandidate(candidate); });
	}
	
	@Test
	void test_showCandidateACs() {
		int id = 1;
		List<AssessmentCenter> expect = candidateList.get(0).getAssessmentCenters();
		when(mockCandidateRepository.findById(id)).thenReturn(Optional.of(candidateList.get(0)));
		
		List<AssessmentCenter> actual = controller.showCandidateACs(id);
		
		verify(mockCandidateRepository, times(1)).findById(id);
		assertEquals(expect, actual);
	}
	
	// interviewer
	@Test
	void test_getAllInterviewer() {
		List<Interviewer> expect = interviewerList;
		when(mockInterviewerRepository.findAll()).thenReturn(expect);
		List<Interviewer> actual = controller.getAllInterviewer();
		assertEquals(actual, expect);
	}
	
	@Test
	void test_getInterviewerbyId_id_found() {
		int id = 1;
		Interviewer expect = interviewerList.get(0);
		when(mockInterviewerRepository.findById(id)).thenReturn(Optional.of(expect));
		
		Interviewer actual = controller.getInterviewerbyId(id);
		assertEquals(expect, actual);
		verify(mockInterviewerRepository, times(1)).findById(id);
	}
	
	@Test
	void test_getInterviewerbyId_id_not_found() {
		int id = 1;
		when(mockInterviewerRepository.findById(id)).thenReturn(Optional.ofNullable(null));
		assertThrows(NotFoundException.class, () -> {controller.getInterviewbyId(id);});
	}
	
	@Test
	void deleteInterviewerById_id_found() {
		int id = 2;
		Interviewer interviewer = interviewerList.get(1);
		Optional<Interviewer> optionalInterviewer = Optional.of(interviewer);
		when(mockInterviewerRepository.findById(id)).thenReturn(optionalInterviewer);
		User user = interviewer.getUser();
		List<Interview> interviews = interviewer.getInterviews();
		List<AssessmentCenter> acs = interviewer.getAssessmentCenters();
		
		assertTrue( (user != null) );
		assertEquals(interviews.size(), 2);
		assertEquals(acs.size(), 2);
		
		controller.deleteInterviewerById(id);
		
		
		// check successful removal of all links from candidate
		assertTrue(interviewer.getAssessmentCenters().size() == 0);
		assertTrue(interviewer.getInterviews().size() == 0);
		assertTrue(interviewer.getUser() == null);
		// check successful removal of candidate from every link
		for (Interview interview : interviews) {
			assertTrue(interview.getInterviewer() == null);
		}
		for (AssessmentCenter ac : acs) {
			assertTrue(! ac.getInterviewers().contains(interviewer));
		}
		assertTrue(user.getCandidate() == null);
		// makesure the delete is called
		verify(mockInterviewerRepository, times(1)).deleteById(id);
	}
	
	@Test
	void test_createInterviewer() {
		Interviewer interviewer = interviewerList.get(1);
		when(mockInterviewerRepository.save(interviewer)).thenReturn(interviewer);
		
		Interviewer actual = controller.createInterviewer(interviewer);
		
		verify(mockInterviewerRepository, times(1)).save(interviewer);
		assertEquals(interviewer, actual);
	}
	
	@Test
	void test_modifyInterviewer() {
		Interviewer interviewer = interviewerList.get(1);
		when(mockInterviewerRepository.findById(interviewer.getId())).thenReturn(Optional.of(interviewer));
		when(mockInterviewerRepository.save(interviewer)).thenReturn(interviewer);
		
		Interviewer actual = controller.modifyInterviewer(interviewer);
		
		verify(mockInterviewerRepository, times(1)).save(interviewer);
		verify(mockInterviewerRepository, times(1)).findById(interviewer.getId());
		assertEquals(actual, interviewer);
	}
	
	// interviews
	
	@Test
	void test_getAllInterviews() {
		when(mockInterviewRepository.findAll()).thenReturn(interviewA);
		
		List<Interview> actual = controller.getAllInterviews();
		
		assertEquals(actual, interviewA);
		verify(mockInterviewRepository, times(1)).findAll();
	}
	
	@Test
	void test_getInterviewbyId() {
		int id = 1;
		Interview interview = interviewA.get(0);
		when(mockInterviewRepository.findById(id)).thenReturn(Optional.of(interview));
		
		Interview actual = controller.getInterviewbyId(id);
		
		verify(mockInterviewRepository, times(1)).findById(id);
		assertTrue(actual == interview);
	}
	
	@Test
	void test_getInterviewbyIdDetailed() {
		int id = 1;
		Interview interview = interviewA.get(0);
		when(mockInterviewRepository.findById(id)).thenReturn(Optional.of(interview));
		
		HashMap<String, Object> actual = controller.getInterviewbyIdDetailed(id);
		
		assertTrue(actual.get("interview") == interview);
		assertTrue(actual.get("assessmentCenter") == interview.getAssessmentCenter());
		assertTrue(actual.get("interviewer") == interview.getInterviewer());
		//assertEquals(actual.get("candidate"), interview.getCandidate());
		//assertTrue(actual.get("pack") == interview.getPacks());
		
		verify(mockInterviewRepository, times(1)).findById(id);

	}
	
	@Test
	void test_deleteInterviewById() {
		int id = 1;
		Interview interview = interviewA.get(0);
		when(mockInterviewRepository.findById(id)).thenReturn(Optional.of(interview));
		Interviewer interviewer = interview.getInterviewer();
		AssessmentCenter assessmentCenter = interview.getAssessmentCenter();
		Candidate candidate = interview.getCandidate();
		List<Pack> packs = interview.getPacks();
		List<Pack> copyPacks = new ArrayList<Pack>(packs); // create a copy of pack to test later
		int originalLength = packs.size();
		
		controller.deleteInterviewById(id);
		
		verify(mockInterviewRepository,times(1)).findById(id);
		verify(mockInterviewRepository,times(1)).save(interview);
		verify(mockPacksRepository,times(1)).saveAll(packs);
		verify(mockInterviewRepository,times(1)).deleteById(id);
		if (interviewer != null) {
			assertTrue(interview.getInterviewer() == null);
			assertTrue(! interviewer.getInterviews().contains(interview));
			verify(mockInterviewerRepository,times(1)).save(interviewer);

		}
		if (assessmentCenter != null) {
			assertTrue(interview.getAssessmentCenter() == null);
			assertTrue(! assessmentCenter.getInterviews().contains(interview));
			verify(mockACRepo,times(1)).save(assessmentCenter);
		}
		if (candidate !=null) {
			assertTrue(interview.getCandidate() == null);
			assertTrue(! candidate.getInterviews().contains(interview));
			verify(mockCandidateRepository,times(1)).save(candidate);
		}
		if (originalLength != 0) {
			assertEquals(packs.size(), 0);
			for(Pack pack : copyPacks) {
				assertTrue(! pack.getInterviews().contains(interview));
			}
		}
	}
	
	
	@Test
	void test_modifyInterview() {
		// int id = 1;
		Interview interview = interviewA.get(0);
		when(mockInterviewRepository.findById(interview.getId())).thenReturn(Optional.of(interview));
		when(mockInterviewRepository.save(interview)).thenReturn(interview);
		
		Interview actual = controller.modifyInterview(interview);
		
		verify(mockInterviewRepository, times(1)).findById(interview.getId());
		verify(mockInterviewRepository, times(1)).save(interview);
		assertEquals(actual, interview);
	}
	
	/*
	@Test
	void test_addPackToInterview() {
		Interview interview = interviewA.get(0);
		Pack pack1 = packList.get(0);
		Pack pack2 = packList.get(1);
		int interview_id = 1;
		int[] packIds = {1,2};
		when(mockInterviewRepository.findById(interview_id)).thenReturn(Optional.of(interview));
		when(mockPacksRepository.findById(1)).thenReturn(Optional.of(pack1));
		when(mockPacksRepository.findById(2)).thenReturn(Optional.of(pack2));
		
		controller.removePackFromInterview(interview_id, packIds);
		
		
	}
	*/
	
	@Test
	void test_getAllPacks() {
		when(mockPacksRepository.findAll()).thenReturn(packList);
		
		List<Pack> result = controller.getAllPacks();
		
		verify(mockPacksRepository, times(1)).findAll();
		assertEquals(packList, result);
	}
	
	@Test
	void test_getPackbyId() {
		int id = 1;
		Pack pack = packList.get(0);
		when(mockPacksRepository.findById(id)).thenReturn(Optional.of(pack));
		
		Pack actual = controller.getPackbyId(id);
		
		verify(mockPacksRepository, times(1)).findById(id);
		assertTrue(actual == pack);
	}
	
	@Test
	void test_createPack() {
		Pack pack = packList.get(0);
		
		when(mockPacksRepository.save(pack)).thenReturn(pack);

		Pack actual = controller.createPack(pack);
		
		verify(mockPacksRepository, times(1)).save(pack);
		assertEquals(actual, pack);
	}
	
	@Test
	void test_modifyPack() {
		Pack pack = packList.get(0);
		when(mockPacksRepository.findById(pack.getId())).thenReturn(Optional.of(pack));
		when(mockPacksRepository.save(pack)).thenReturn(pack);
		
		Pack actual = controller.modifyPack(pack);
		
		verify(mockPacksRepository, times(1)).findById(pack.getId());
		assertEquals(pack, actual);
	}
	
	// recruiter
	@Test
	void test_getAllRecruiter() {
		when(mockRecruiterRepository.findAll()).thenReturn(recruiterList);
		
		List<Recruiter> result = controller.getAllRecruiter();
		
		verify(mockRecruiterRepository, times(1)).findAll();
		assertEquals(result, recruiterList);
	}
	
	@Test
	void test_getRecruiterbyId() {
		int id = 1;
		Recruiter recruiter = recruiterList.get(0);
		when(mockRecruiterRepository.findById(id)).thenReturn(Optional.of(recruiter));
		
		Recruiter actual = controller.getRecruiterbyId(id);
		
		assertEquals(actual, recruiter);
		verify(mockRecruiterRepository, times(1)).findById(id);
	}
	
	@Test
	void test_createRecruiter() {
		
		Recruiter recruiter = recruiterList.get(0);
		when(mockRecruiterRepository.save(recruiter)).thenReturn(recruiter);
		
		Recruiter actual = controller.createRecruiter(recruiter);
		
		verify(mockRecruiterRepository, times(1)).save(recruiter);
		assertEquals(actual, recruiter);
	}
	
	@Test
	void test_modifyRecruiter() {
		Recruiter recruiter = recruiterList.get(0);
		when(mockRecruiterRepository.findById(recruiter.getId())).thenReturn(Optional.of(recruiter));
		when(mockRecruiterRepository.save(recruiter)).thenReturn(recruiter);
		
		Recruiter result = controller.modifyRecruiter(recruiter);
		
		verify(mockRecruiterRepository, times(1)).findById(recruiter.getId());
		assertEquals(result, recruiter);
		verify(mockRecruiterRepository, times(1)).save(recruiter);
	}
}
