package com.bezkoder.springjwt.controllers;

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

import com.bezkoder.springjwt.exceptions.NotFoundException;
import com.bezkoder.springjwt.models.Author;
import com.bezkoder.springjwt.models.ERole;
import com.bezkoder.springjwt.models.Interviewer;
import com.bezkoder.springjwt.models.Recruiter;
import com.bezkoder.springjwt.models.Role;
import com.bezkoder.springjwt.models.User;
import com.bezkoder.springjwt.payload.request.LoginRequest;
import com.bezkoder.springjwt.payload.request.SignupRequest;
import com.bezkoder.springjwt.payload.response.JwtResponse;
import com.bezkoder.springjwt.payload.response.MessageResponse;
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
  PasswordEncoder encoder;

  @Autowired
  JwtUtils jwtUtils;

  @PostMapping("/signin")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);
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
  
//  @PostMapping("/role")
//  public void 
//  

  @PostMapping("/signup")
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
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
            
        default:
          Role userRole = roleRepository.findByName(ERole.ROLE_USER)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          roles.add(userRole);
        }
      });
    }

    user.setRoles(roles);
    userRepository.save(user);

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
	  return userRepository.findById(id).orElseThrow(()->new NotFoundException("Can't find transaction with id: " + id));
  }
  
  // TODO make this api available to admin only
  @PutMapping("/user")
  public User changeUser(@RequestBody User user) {
	  if (userRepository.findById(user.getId()).isEmpty()) {
			throw new NotFoundException("Can't find user with id: " + user.getId());
		}
	  return userRepository.save(user);
  }
  
  //TODO make this api available to admin only and watch out null
  @DeleteMapping("/user/{id}")
  public void changeUser(@PathVariable long id) {
	  if (userRepository.findById(id).isEmpty()) {
			throw new NotFoundException("Can't find user with id: " + id);
	  }
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
}
