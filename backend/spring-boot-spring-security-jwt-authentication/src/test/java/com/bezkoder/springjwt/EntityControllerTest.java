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
public class EntityControllerTest {
	protected MockMvc mvc;
	
	@Autowired
	WebApplicationContext webApplicationContext;
	
	@Autowired
	private EntityController controller;
	
	@Autowired
	AssessmentCenterRepository assessmentCenterRepository;
	@Autowired
	CandidateRepository candidateRepository;
	@Autowired
	InterviewerRepository interviewerRepository;
	@Autowired
	InterviewsRepository interviewRepository;
	@Autowired
	PacksRepository packsRepository;
	@Autowired
	RecruiterRepository recruiterRepository;
	@Autowired
	UserRepository userRepository;
	
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
	
	
	/* list of examples to use in test */
	// ACs
	private AssessmentCenter assessmentCenter1;
	private AssessmentCenter assessmentCenter2;
	private AssessmentCenter assessmentCenter3;
	// candidates
	private Candidate candidate1;
	private Candidate candidate2;
	private Candidate candidate3;
	// Interview
	private Interview interview1;
	private Interview interview2;
	private Interview interview3;
	// interviewer
	private Interviewer interviewer1;
	private Interviewer interviewer2;
	private Interviewer interviewer3;
	// Pack
	private Pack pack1;
	private Pack pack2;
	private Pack pack3;
	// Recruiter
	private Recruiter recruiter1;
	private Recruiter recruiter2;
	private Recruiter recruiter3;
	
	LocalDate date = LocalDate.now();
	LocalTime time = LocalTime.now();
	
	/* end of list of examples to use in test */
	
	
	@BeforeEach
	protected void setUp() {
		mvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
      
		// initialize examples data
		// candidate
		candidate1 = new Candidate("Mr", "John", "William", "Smith", "0412321345", "JohnWSmith@Gmail.com", date, "123 Magicalfairyland steet", 1, "Data Science", "Magic Uni", "resume-link", "Java", "RecruitPhase1", "N/A");
		candidate2 = new Candidate("Ms", "Raquel", "Kasey", "Lacey", "0453194231", "RaquelKLacey@Gmail.com", date, "231 Magicalfairyland steet", 123, "Mechanical Engineering", "Magic Uni", "resume-link", "Business", "RecruitPhase3", "Re-Sit");
		candidate3 = new Candidate("Miss", "Sammi", "Corinna", "Radcliff", "0463927382", "SammiCRadcliff@Gmail.com", date, "23 Magicalfairyland steet", 14123123, "Data Science", "University co.", "resume-link", "Cloud Engineering", "RecruitPhase2", "N/A");
		
		// recruiters
		recruiter1 = new Recruiter("Stephania Kristal Sommer", false);
		recruiter2 = new Recruiter("Cynthia Katrina Shepard", false);
		recruiter3 = new Recruiter("Darrell Irving Hunnicutt", false);
		
		// interviewers
		interviewer1 =  new Interviewer("Drummond Bria Lane",true);
		interviewer2 = new Interviewer("Deryck Cynthia Garnett",true);
		interviewer3 = new Interviewer("Eliana Kassie Quincy",true);
		
		// Pack
		pack1 = new Pack("Pack 1","Tech","Link...");
		pack2 = new Pack("Pack 2","Tech","Link...");
		pack3 = new Pack("Pack 3","Sales","Link...");
		
		// ASSESSMENT CENTERS
		assessmentCenter1 = new AssessmentCenter("AC 1",LocalDate.of(2023, 3, 7),LocalTime.of(14, 30, 0, 0),LocalTime.of(16, 30, 0, 0),true);
		assessmentCenter2 = new AssessmentCenter("AC 2",LocalDate.of(2023, 3, 8),LocalTime.of(14, 30, 0, 0),LocalTime.of(16, 30, 0, 0),true);
		assessmentCenter3 = new AssessmentCenter("AC 3",LocalDate.of(2023, 3, 9),LocalTime.of(14, 30, 0, 0),LocalTime.of(16, 30, 0, 0),true);
		
		// interview
		interview1 = new Interview(assessmentCenter1,interviewer1,candidate1,"Feedback Form", time,1);
		interview2 = new Interview(assessmentCenter2,interviewer2,candidate2,"Feedback Form", time,2);
		interview3 = new Interview(assessmentCenter3,interviewer3,candidate3,"Feedback Form", time,3);
		
    }
    protected String mapToJson(Object obj) throws JsonProcessingException {
    	ObjectMapper objectMapper = new ObjectMapper();
    	return objectMapper.writeValueAsString(obj);
    }
    protected <T> T mapFromJson(String json, Class<T> clazz) throws JsonParseException, JsonMappingException, IOException {
    	ObjectMapper objectMapper = new ObjectMapper();
    	return objectMapper.readValue(json, clazz);
    }
	   
    @Test
	public void contextLoads() {
    	
	}
		
	
	/* ------------------ test with mockito, test while developing and isolation ------------------ */
    /*
    @Test 
	// test api get all ac working properly when there is no data in the database
    void test_api_get_all_rows_from_ac_with_no_data111() {
		//List<AssessmentCenter> input = new ArrayList<AssessmentCenter>();
		//when(controller.getAllAC()).thenReturn(input);
		List<AssessmentCenter> result = controller.getAllAC();
		// verify(mockACRepo, times(1)).findAll();
		assertEquals(result, null);
	}
	*/
    
    
    
    
	@Test 
	// test api get all ac working properly when there is no data in the database
	void test_api_get_all_rows_from_ac_with_no_data() {
		List<AssessmentCenter> input = new ArrayList<AssessmentCenter>();
		when(mockACRepo.findAll()).thenReturn(input);
		List<AssessmentCenter> result = controller.getAllAC();
		verify(mockACRepo, times(1)).findAll();
		assertEquals(result, input);
	}
	
	@Test 
	// test api get all ac working properly when there is no data in the database
	void test_api_get_all_rows_from_ac_with_2_rows_data() {
		List<AssessmentCenter> input = new ArrayList<AssessmentCenter>();
		input.add(this.assessmentCenter1);
		input.add(this.assessmentCenter2);
		when(mockACRepo.findAll()).thenReturn(input);
		List<AssessmentCenter> result = controller.getAllAC();
		verify(mockACRepo, times(1)).findAll();
		assertEquals(result, input);
	}
	
	@Test
	void test_api_get_sepcific_ac_by_id() {
		//List<AssessmentCenter> input = new ArrayList<AssessmentCenter>();
		int id = 1;
		Optional<AssessmentCenter> input = Optional.of(this.assessmentCenter1);
		when(mockACRepo.findById(id)).thenReturn(input);
		AssessmentCenter result = controller.getACbyId(id);
		verify(mockACRepo, times(1)).findById(id);
		assertEquals(result, this.assessmentCenter1);
	}
	
	@Test
	void test_api_get_sepcific_ac_by_id_not_found() {
		//List<AssessmentCenter> input = new ArrayList<AssessmentCenter>();
		int id = 1;
		when(mockACRepo.findById(id)).thenThrow(NotFoundException.class);
		assertThrows(NotFoundException.class, () -> {
			controller.getACbyId(id);
	    });
		verify(mockACRepo, times(1)).findById(id);
	}
	
	
	
	
	
	
	
	/* ------------------ end of test with mockito, test while developing ------------------ */
	
	
	
	
	
	
	
	@Test
	public void test_create_AC_unlinked() throws Exception {
	   String uri = "/api/ac";
	   AssessmentCenter assessmentCenter = new AssessmentCenter();
	   
	   String inputJson = this.mapToJson(assessmentCenter);
	   MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.post(uri)
	      .contentType(MediaType.APPLICATION_JSON_VALUE).content(inputJson)).andReturn();
	   
	   int status = mvcResult.getResponse().getStatus();
	   assertEquals(201, status);
	   //String content = mvcResult.getResponse().getContentAsString();
	   //assertEquals(content, "Product is created successfully");
	}
	
	@Test
	public void test_get_all_AC_no_data() throws Exception {
	   String uri = "/api/ac";
	   MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get(uri)
	      .accept(MediaType.APPLICATION_JSON_VALUE)).andReturn();
	   
	   int status = mvcResult.getResponse().getStatus();
	   assertEquals(200, status);
	   String content = mvcResult.getResponse().getContentAsString();
	   AssessmentCenter[] productlist = this.mapFromJson(content, AssessmentCenter[].class);
	   assertTrue(productlist.length == 0);
	}
	
	@Test
	public void test_get_all_AC_2_rows_data() throws Exception {
	   String uri = "/api/ac";
	   MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get(uri)
	      .accept(MediaType.APPLICATION_JSON_VALUE)).andReturn();
	   
	   int status = mvcResult.getResponse().getStatus();
	   assertEquals(200, status);
	   String content = mvcResult.getResponse().getContentAsString();
	   AssessmentCenter[] productlist = this.mapFromJson(content, AssessmentCenter[].class);
	   assertTrue(productlist.length == 0);
	}
	

}
