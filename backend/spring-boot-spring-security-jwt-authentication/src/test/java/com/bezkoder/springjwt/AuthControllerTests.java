package com.bezkoder.springjwt;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
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
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.bezkoder.springjwt.controllers.AuthController;
import com.bezkoder.springjwt.exceptions.BadRequestException;
import com.bezkoder.springjwt.exceptions.NotFoundException;
import com.bezkoder.springjwt.models.Candidate;
import com.bezkoder.springjwt.models.Interviewer;
import com.bezkoder.springjwt.models.Recruiter;
import com.bezkoder.springjwt.models.Role;
import com.bezkoder.springjwt.models.User;
import com.bezkoder.springjwt.payload.request.SignupRequest;
import com.bezkoder.springjwt.repository.CandidateRepository;
import com.bezkoder.springjwt.repository.InterviewerRepository;
import com.bezkoder.springjwt.repository.RecruiterRepository;
import com.bezkoder.springjwt.repository.RoleRepository;
import com.bezkoder.springjwt.repository.UserRepository;
import com.bezkoder.springjwt.security.jwt.JwtUtils;


/*
 * Test set 1, test each api
 */
@ExtendWith(MockitoExtension.class)
public class AuthControllerTests {
	
	private AuthController authController;
	
	@Mock
	private AuthenticationManager authenticationManagerMock;
	@Mock
	private UserRepository userRepositoryMock;
	@Mock
	private RoleRepository roleRepositoryMock;
	@Mock
	private RecruiterRepository recruiterRepositoryMock;
	@Mock
	private InterviewerRepository interviewerRepositoryMock;
	@Mock
	private CandidateRepository candidateRepositoryMock;
	@Mock
	private PasswordEncoder encoderMock;
	@Mock
	private JwtUtils jwtUtilsMock;
	
	@BeforeEach
	public void setup() {
		authController = new AuthController(
				authenticationManagerMock, 
				userRepositoryMock,
				roleRepositoryMock,
				recruiterRepositoryMock,
				interviewerRepositoryMock,
				candidateRepositoryMock, 
				encoderMock,
				jwtUtilsMock);
	}

	@Test
	public void test_example() {
		//arrange
		//act
		//assert
	}

	@Test
	public void test_get_users_returns_users() {
		//arrange	
		List<User> expectedValues = new ArrayList<>();
		expectedValues.add(new User("admin1","admin1@gmail.com","admin1","adminName1"));
		expectedValues.add(new User("interviewer1","interviewer1@gmail.com","interviewer1","interviewerName1"));
		expectedValues.add(new User("recruiter1","recruiter1@gmail.com","recruiter1","recruiterName1"));
		when(userRepositoryMock.findAll()).thenReturn(expectedValues);
		
		//act
		List<User> actualValue = authController.getUsers();
		
		//assert
		assertEquals(actualValue,expectedValues);
		verify(userRepositoryMock,times(1)).findAll();	
	}
	
//	@Test
//	public void test_username_already_exists_return_error() {
//		//arrange
//		Set<String> roleSet = new HashSet<String>();
//		roleSet.add("ROLE_ADMIN");
//		
//		SignupRequest signupRequest = new SignupRequest();
//		signupRequest.setUsername("ExistingName");
//		signupRequest.setEmail("ExisitingEmail@gmail.com");
//		signupRequest.setRole(roleSet);
//		signupRequest.setPassword("password");
//		signupRequest.setName("Name");
//		when(userRepositoryMock.existsByUsername("ExistingName")).thenReturn(true);
//		//act
//		ResponseEntity<?> actualValue = authController.registerUser(signupRequest, null, false, null, false, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
//		//assert
//		//#TODO how to actually test this..
//		assertEquals(actualValue,"Asd");
//	}
	
	@Test
	public void test_get_user_returns_user() {
		//arrange
		long id = 1l;
		User expectedValue = new User("Username","Email@gmail.com","Password","Name");
		when(userRepositoryMock.findById(id)).thenReturn(Optional.of(expectedValue));
		//act
		User actualValue = authController.getUser(id);
		//assert
		assertEquals(actualValue,expectedValue);
		verify(userRepositoryMock,times(1)).findById(id);
	}
	
	@Test
	public void test_get_user_by_invalid_id_returns_not_found_exception() {
		//arrange
		long id = 1l;
		String expectedValue = "Can't find user with id: " + id;
		when(userRepositoryMock.findById(id)).thenReturn(Optional.ofNullable(null));
		//act
		NotFoundException actualValue = assertThrows(NotFoundException.class, ()->authController.getUser(id));
		//assert
		assertEquals(actualValue.getMessage(),expectedValue);
		verify(userRepositoryMock,times(1)).findById(id);
	}
	
	//#TODO Not sure what issues is??
	@Test
	public void test_change_user_modifies_user() {
		//arrange
		long id = 1L;
		User expectedValue = new User("Username","Email@gmail.com","Password","Name");
		expectedValue.setId(1L);
		when(userRepositoryMock.save(expectedValue)).thenReturn(expectedValue);
		when(userRepositoryMock.findById(id)).thenReturn(Optional.of(expectedValue));
		//act
		User actualValue = authController.changeUser(expectedValue);
		//assert
		assertEquals(actualValue,expectedValue);
		verify(userRepositoryMock,times(1)).findById(id);
		verify(userRepositoryMock,times(1)).save(expectedValue);
	}
	
	@Test
	public void test_change_user_invalid_id_returns_not_found_exception() {
		//arrange
		long id = 1l;
		User user = new User("Username","Email@gmail.com","Password","Name");
		user.setId(1L);
		String expectedValue = "Can't find user with id: " + id;
		when(userRepositoryMock.findById(id)).thenReturn(Optional.ofNullable(null));
		//act
		NotFoundException actualValue = assertThrows(NotFoundException.class, ()->authController.changeUser(user));
		//assert
		assertEquals(actualValue.getMessage(),expectedValue);
		verify(userRepositoryMock,times(1)).findById(id);
	}
	
	@Test
	public void test_delete_user_invalid_id_returns_not_found_exception() {
		//arrange
		long id = 1l;
		String expectedValue = "Can't find user with id: " + id;
		when(userRepositoryMock.findById(id)).thenReturn(Optional.ofNullable(null));
		//act
		NotFoundException actualValue = assertThrows(NotFoundException.class, ()->authController.deleteUser(id));
		//assert
		assertEquals(actualValue.getMessage(),expectedValue);
		verify(userRepositoryMock,times(1)).findById(id);
	}
	
	@Test
	public void test_delete_user_deletes_user() {
		//arrange
		long id = 1l;
		User user = new User("Username","Email@gmail.com","Password","Name");
		when(userRepositoryMock.findById(id)).thenReturn(Optional.of(user));
		//act
		authController.deleteUser(id);
		//assert
		verify(userRepositoryMock,times(1)).save(user);
		verify(userRepositoryMock,times(1)).delete(user);
	}
	
	@Test
	public void test_delete_user_saves_recruiter_if_not_null() {
		//arrange
		long id = 1l;
		User user = new User("Username","Email@gmail.com","Password","Name");
		Recruiter recruiter = new Recruiter("Recruiter", false);
		user.setRecruiter(recruiter);
		when(userRepositoryMock.findById(id)).thenReturn(Optional.of(user));
		//act
		authController.deleteUser(id);
		//assert
		verify(userRepositoryMock,times(1)).save(user);
		verify(userRepositoryMock,times(1)).delete(user);
		verify(recruiterRepositoryMock,times(1)).save(recruiter);	
	}
	
	@Test
	public void test_delete_user_saves_interviewer_if_not_null() {
		//arrange
		long id = 1l;
		User user = new User("Username","Email@gmail.com","Password","Name");
		Interviewer interviewer = new Interviewer("Interviewer", false);
		user.setInterviewer(interviewer);

		when(userRepositoryMock.findById(id)).thenReturn(Optional.of(user));
		//act
		authController.deleteUser(id);
		//assert
		verify(userRepositoryMock,times(1)).save(user);
		verify(userRepositoryMock,times(1)).delete(user);
		verify(interviewerRepositoryMock,times(1)).save(interviewer);	
	}
	
	@Test
	public void test_link_user_invalid_id_returns_not_found_exception() {
		//arrange
		long id = 1l;
		String expectedValue = "Can't find user with id: " + id;
		when(userRepositoryMock.findById(id)).thenReturn(Optional.ofNullable(null));
		//act
		NotFoundException actualValue = assertThrows(NotFoundException.class, ()->authController.linkUserWithRole(id, null, null, null));
		//assert
		assertEquals(actualValue.getMessage(),expectedValue);
		verify(userRepositoryMock,times(1)).findById(id);
	}
	
	//#TODO Cant get to work
//	@Test
//	public void test_link_user() {
//		//arrange
//		long id = 1l;
//		int intId = 1;
//		User user = new User("Username","Email@gmail.com","Password","Name");
//		Interviewer interviewer = new Interviewer("Interviewer", false);
//		Recruiter recruiter = new Recruiter("Recruiter", false);
//		Candidate candidate = new Candidate();
//		when(userRepositoryMock.findById(id)).thenReturn(Optional.of(user));
//		when(interviewerRepositoryMock.findById(intId)).thenReturn(Optional.of(interviewer));
//		when(recruiterRepositoryMock.findById(intId)).thenReturn(Optional.of(recruiter));
//		when(candidateRepositoryMock.findById(intId)).thenReturn(Optional.of(candidate));
//		//act
//		List<String> expectedValue = authController.linkUserWithRole(id, null, null, null);
//		//assert
//	}
	
	@Test
	public void test_unlink_invalid_id_returns_not_found_exception() {
		//arrange
		long id = 1l;
		String expectedValue = "Can't find user with id: " + id;
		when(userRepositoryMock.findById(id)).thenReturn(Optional.ofNullable(null));
		//act
		NotFoundException actualValue = assertThrows(NotFoundException.class, ()->authController.unlinkUserRoles(id, null, null, null));
		//assert
		assertEquals(actualValue.getMessage(),expectedValue);
		verify(userRepositoryMock,times(1)).findById(id);
	}
	
	@Test
	public void test_unlink_with_no_links_unlinks_nothing() {
		//arrange
		long id = 1l;
		List<String> actualValue = new ArrayList<String>();
		User user = new User("Username","Email@gmail.com","Password","Name");
		Recruiter recruiter = user.getRecruiter();
		Interviewer interviewer = user.getInterviewer();
		Candidate candidate = user.getCandidate();
		when(userRepositoryMock.findById(id)).thenReturn(Optional.of(user));
		//act
		List<String> expectedValue = authController.unlinkUserRoles(id, null, null, null);
		//assert
		assertEquals(actualValue,expectedValue);
		verify(userRepositoryMock,times(1)).save(user);
		verify(recruiterRepositoryMock,times(1)).save(recruiter);
		verify(interviewerRepositoryMock,times(1)).save(interviewer);
		verify(candidateRepositoryMock,times(1)).save(candidate);
	}
	
	//#TODO cant get to work
//	@Test
//	public void test_unlink_with_recruiter_unlinks_recruiter() {
//		//arrange
//		long id = 1l;
//		List<String> actualValue = new ArrayList<String>();
//		User user = new User("Username","Email@gmail.com","Password","Name");
//
//
//		when(userRepositoryMock.findById(id)).thenReturn(Optional.of(user));
//		//act
//		List<String> expectedValue = authController.unlinkUserRoles(id, null, null, null);
//		//assert
//		assertEquals(actualValue,expectedValue);
//		verify(userRepositoryMock,times(1)).save(user);
//	}

}
