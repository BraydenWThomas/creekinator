package com.bezkoder.springjwt.controllers;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;

import com.bezkoder.springjwt.exceptions.NotFoundException;
import com.bezkoder.springjwt.models.AssessmentCenter;
import com.bezkoder.springjwt.models.Author;
import com.bezkoder.springjwt.models.Candidate;
import com.bezkoder.springjwt.models.ERole;
import com.bezkoder.springjwt.models.Interviewer;
import com.bezkoder.springjwt.models.Recruiter;
import com.bezkoder.springjwt.models.Role;
import com.bezkoder.springjwt.models.User;
import com.bezkoder.springjwt.payload.request.LoginRequest;
import com.bezkoder.springjwt.payload.request.SignupRequest;
import com.bezkoder.springjwt.payload.response.JwtResponse;
import com.bezkoder.springjwt.payload.response.MessageResponse;
import com.bezkoder.springjwt.repository.CandidateRepository;
import com.bezkoder.springjwt.repository.InterviewerRepository;
import com.bezkoder.springjwt.repository.RecruiterRepository;
import com.bezkoder.springjwt.repository.RoleRepository;
import com.bezkoder.springjwt.repository.UserRepository;
import com.bezkoder.springjwt.security.jwt.JwtUtils;
import com.bezkoder.springjwt.security.services.UserDetailsImpl;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  UserRepository userRepository;

  @Autowired
  RoleRepository roleRepository;
  
  @Autowired
  RecruiterRepository recruiterRepository;
  
  @Autowired
  InterviewerRepository interviewerRepository;
  
  @Autowired
  CandidateRepository candidateRepository;

  @Autowired
  PasswordEncoder encoder;

  @Autowired
  JwtUtils jwtUtils;

  
  
  public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository,
		RoleRepository roleRepository, RecruiterRepository recruiterRepository,
		InterviewerRepository interviewerRepository, CandidateRepository candidateRepository, PasswordEncoder encoder,
		JwtUtils jwtUtils) {
	super();
	this.authenticationManager = authenticationManager;
	this.userRepository = userRepository;
	this.roleRepository = roleRepository;
	this.recruiterRepository = recruiterRepository;
	this.interviewerRepository = interviewerRepository;
	this.candidateRepository = candidateRepository;
	this.encoder = encoder;
	this.jwtUtils = jwtUtils;
}


@PostMapping("/signin")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication); // store user info into contextHolder to avoid login again and again
    String jwt = jwtUtils.generateJwtToken(authentication);
    
    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();    
    List<String> roles = userDetails.getAuthorities().stream()
        .map(item -> item.getAuthority())
        .collect(Collectors.toList());

    return ResponseEntity.ok(new JwtResponse(jwt, 
                         userDetails.getId(), 
                         userDetails.getUsername(), 
                         userDetails.getEmail(),
                         userDetails.getName(),
                         roles));
  	}
	
  @PostMapping("/signup")
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest,
		  
		  // recruiter part
		  @RequestParam(required = false, name = "recruiterName") String recruiterName,
		  @RequestParam(required = false, name = "superRecruiter") boolean superRecruiter,
		  
		  // interviewer
		  @RequestParam(required = false, name = "interviewerName") String interviewerName,
		  @RequestParam(required = false, name = "tech") boolean tech,
		  
		  // candidate
		  @RequestParam(required = false, name = "candidateTitle") String candidateTitle,
		  @RequestParam(required = false, name = "candidateFirst_name") String candidateFirst_name,
		  @RequestParam(required = false, name = "candidateMiddle_name") String candidateMiddle_name,
		  @RequestParam(required = false, name = "candidateLast_name") String candidateLast_name,
		  @RequestParam(required = false, name = "candidateMobile_number") String candidateMobile_number,
		  @RequestParam(required = false, name = "candidateEmail") String candidateEmail,
		  @RequestParam(required = false, name = "candidate_date_of_birth") String candidate_date_of_birth,
		  @RequestParam(required = false, name = "candidateAddress") String candidateAddress,
		  @RequestParam(required = false, name = "candidate_graduation_year") Integer candidate_graduation_year,
		  @RequestParam(required = false, name = "candidateDegree") String candidateDegree,
		  @RequestParam(required = false, name = "candidateUniversity") String candidateUniversity,
		  @RequestParam(required = false, name = "candidateResume") String candidateResume,
		  @RequestParam(required = false, name = "candidate_applied_stream") String candidate_applied_stream,
		  @RequestParam(required = false, name = "candidate_recruit_phase") String candidate_recruit_phase,
		  @RequestParam(required = false, name = "candidate_past_ac_result") String candidate_past_ac_result
		  ) {
	  
    if (userRepository.existsByUsername(signUpRequest.getUsername())) {
      return ResponseEntity
          .badRequest()
          .body(new MessageResponse("Error: Username is already taken!"));
    }

    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
      return ResponseEntity
          .badRequest()
          .body(new MessageResponse("Error: Email is already in use!"));
    }

    // Create new user's account
    User user = new User(signUpRequest.getUsername(), 
               signUpRequest.getEmail(),
               encoder.encode(signUpRequest.getPassword()),
               signUpRequest.getName());

    Set<String> strRoles = signUpRequest.getRole();
    Set<Role> roles = new HashSet<>();

    if (strRoles == null) {
      Role userRole = roleRepository.findByName(ERole.ROLE_USER)
          .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
      roles.add(userRole);
    } 
    
    else {
      strRoles.forEach(role -> {
        switch (role) {
        case "admin":
          Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          roles.add(adminRole);

          break;
          
        case "recruiter":
        	Role recruiterRole = roleRepository.findByName(ERole.ROLE_RECRUITER)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(recruiterRole);
            break;
        
        case "interviewer":
        	Role interviewerRole = roleRepository.findByName(ERole.ROLE_INTERVIEWER)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(interviewerRole);

            break;
            
        case "tech_interviewer":
        	Role techInterviewerRole = roleRepository.findByName(ERole.ROLE_TECH)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(techInterviewerRole);

            break;
            
        case "sales_interviewer":
        	Role salesInterviewerRole = roleRepository.findByName(ERole.ROLE_SALES)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(salesInterviewerRole);

            break;
        
        case "candidate":
        	Role candidateRole = roleRepository.findByName(ERole.ROLE_CANDIDATE)
        		.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        	roles.add(candidateRole);
        	break;
            
        default:
          Role userRole = roleRepository.findByName(ERole.ROLE_USER)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          roles.add(userRole);
        }
      });
    }

    user.setRoles(roles);
    userRepository.save(user);
    
    // update link the user with interviewer, candidate or recruiter if new added roles contain any of them and id is specified
    if (strRoles.contains("recruiter")) {
    	Recruiter recruiter = new Recruiter(recruiterName, superRecruiter);
    	recruiter.addUser(user);
    	recruiterRepository.save(recruiter);
        userRepository.save(user);
        
    }
    if (strRoles.contains("interviewer")) {
    	Interviewer interviewer = new Interviewer(interviewerName, tech);
    	interviewer.addUser(user);
    	interviewerRepository.save(interviewer);
    	userRepository.save(user);
    	
    }
    if (strRoles.contains("candidate")) {
    	Candidate candidate = new Candidate(
								candidateTitle,
								candidateFirst_name,
								candidateMiddle_name,
								candidateLast_name,
								candidateMobile_number,
								  candidateEmail,
								  LocalDate.parse(candidate_date_of_birth),
								  candidateAddress,
								  candidate_graduation_year,
								  candidateDegree,
								  candidateUniversity,
								  candidateResume,
								  candidate_applied_stream,
								  candidate_recruit_phase,
								  candidate_past_ac_result
    			);
    	
    	candidate.addUser(user);
    	candidateRepository.save(candidate);
    	userRepository.save(user);
    	
    }
    
    return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
  }
  
  
  
  // TODO make this api available to admin only
  @GetMapping("/user")
  public List<User> getUsers() {
	  return userRepository.findAll();
  }
  
  // TODO make this api available to admin only
  @GetMapping("/user/{id}")
  public User getUser(@PathVariable long id) {
	  return userRepository.findById(id).orElseThrow(()->new NotFoundException("Can't find user with id: " + id));
  }
  
  
  /* --------- below api should not be public for users, they are still in development stage --------- */
  
  
  //TODO make this api available to admin only
 @PutMapping("/user")
 public User changeUser(@RequestBody User user) {
	  if (userRepository.findById(user.getId()).isEmpty()) {
			throw new NotFoundException("Can't find user with id: " + user.getId());
		}
	  return userRepository.save(user);
 }
 
 
 //TODO make this api available to admin only and watch out null
 @DeleteMapping("/user/{id}")
 public void deleteUser(@PathVariable long id) {
//	  if (userRepository.findById(id).isEmpty()) {
//			throw new NotFoundException("Can't find user with id: " + id);
//	  } //Pretty sure this is redundant
	  User user = userRepository.findById(id).orElseThrow(() -> new NotFoundException("Can't find user with id: " + id));
	  Interviewer interviewer = user.getInterviewer();
	  Recruiter recruiter = user.getRecruiter();
	  user.removeInterviewer();
	  user.removeRecruiter();
	  userRepository.save(user);
	  // save only if it is not null
	  if (! (recruiter == null) ) {
		  recruiterRepository.save(recruiter);
	  }
	  // save only if it is not null
	  if (! (interviewer == null) ) {
		  interviewerRepository.save(interviewer);
	  }
	  userRepository.delete(user);
  }
  
 
 
  //TODO only make this api available to admin
  @PutMapping("/user/{id}/linkRole")
  public List<String> linkUserWithRole(@PathVariable long id,
		  @RequestParam(required = false, name = "recruiterId") Integer recruiterId,
		  @RequestParam(required = false, name = "interviewerId") Integer interviewerId,
		  @RequestParam(required = false, name = "candidateId") Integer candidateId) {
	  List<String> linkedList = new ArrayList<String>(); // this list contain 
	  User user = userRepository.findById(id).orElseThrow(() -> new NotFoundException("Can't find user with id: " + id));
	  Interviewer interviewer = interviewerRepository.findById(interviewerId).orElseThrow(() -> new NotFoundException("Can't find interviewer with id: " + interviewerId));
	  Recruiter recruiter = recruiterRepository.findById(recruiterId).orElseThrow(() -> new NotFoundException("Can't find recruiter with id: " + recruiterId));
	  Candidate candidate = candidateRepository.findById(candidateId).orElseThrow(() -> new NotFoundException("Can't find candidate with id: " + candidateId));
	  if (recruiterId != null) {
		  recruiter.addUser(user);
		  recruiterRepository.save(recruiter);
		  linkedList.add("recruiterId " + recruiterId);
	  }
	  
	  if (interviewerId != null) {
		  interviewer.addUser(user);
		  interviewerRepository.save(interviewer);
		  linkedList.add("interviewerId " + interviewerId);
	  }
	  
	  if (candidateId != null) {
		  candidate.addUser(user);
		  candidateRepository.save(candidate);
		  linkedList.add("candidateId " + candidateId);
	  }
	  userRepository.save(user);
	  return linkedList;
  }
  
  
  
  //TODO only make this api available to admin
  /**
   * This function will allow to remove candidate, interviewer and recruiter from a specific candidate. interviewer, candidate,
   * and recruiter remove is not mandidatory, 0 to 3 of them can be removed based on the api parameter
   * @param id The user id
   * @param recruiterId the recruiter id
   * @param interviewerId the interviewer id
   * @param candidateId the candidate id
   * @return a list of string that indicate what is successfully removed
   */
  @PutMapping("/user/{id}/unlinkRole")
  public List<String> unlinkUserRoles(@PathVariable long id,
		  @RequestParam(required = false, name = "recruiterId") Integer recruiterId,
		  @RequestParam(required = false, name = "interviewerId") Integer interviewerId,
		  @RequestParam(required = false, name = "candidateId") Integer candidateId){
	  List<String> output = new ArrayList<String>();
	  User user = userRepository.findById(id).orElseThrow(() -> new NotFoundException("Can't find user with id: " + id));
	  Recruiter recruiter = user.getRecruiter();
	  Interviewer interviewer = user.getInterviewer();
	  Candidate candidate = user.getCandidate();
	  
	  if ( (recruiterId != null) && (recruiter != null) ) {
		  user.removeRecruiter();
		  output.add("removed recruiter " + recruiterId);
	  }
	  if ( (interviewerId != null) && (interviewer != null) ) {
		  user.removeInterviewer();
		  output.add("removed interviewer " + interviewerId);
	  }
	  if ( (candidateId != null) && (candidate != null) ) {
		  user.removeCandidate();
		  output.add("removed candidate " + candidateId);
	  }
	  userRepository.save(user);
	  recruiterRepository.save(recruiter);
	  interviewerRepository.save(interviewer);
	  candidateRepository.save(candidate);
	  return output;
  }
}
