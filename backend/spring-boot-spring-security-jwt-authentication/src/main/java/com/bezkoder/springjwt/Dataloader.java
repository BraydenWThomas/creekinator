
package com.bezkoder.springjwt;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Service;

import com.bezkoder.springjwt.models.AssessmentCenter;
import com.bezkoder.springjwt.models.Candidate;
import com.bezkoder.springjwt.models.ERole;
import com.bezkoder.springjwt.models.Interview;
import com.bezkoder.springjwt.models.Interviewer;
import com.bezkoder.springjwt.models.Pack;
import com.bezkoder.springjwt.models.Recruiter;
import com.bezkoder.springjwt.models.Role;
import com.bezkoder.springjwt.models.User;
import com.bezkoder.springjwt.models.*;
import com.bezkoder.springjwt.repository.AssessmentCenterRepository;
import com.bezkoder.springjwt.repository.CandidateRepository;
import com.bezkoder.springjwt.repository.InterviewerRepository;
import com.bezkoder.springjwt.repository.InterviewsRepository;
import com.bezkoder.springjwt.repository.PacksRepository;
import com.bezkoder.springjwt.repository.RecruiterRepository;
import com.bezkoder.springjwt.repository.RoleRepository;
import com.bezkoder.springjwt.repository.UserRepository;



@Service
public class Dataloader implements ApplicationRunner{

	private AssessmentCenterRepository assessmentCenterRepository;
	private CandidateRepository candidateRepository;
	private InterviewerRepository interviewerRepository;
	private InterviewsRepository interviewRepository;
	private PacksRepository packsRepository;
	private RecruiterRepository recruiterRepository;
	private UserRepository userRepository;
	private RoleRepository roleRepository;
	
	
	@Autowired
	public Dataloader(AssessmentCenterRepository assessmentCenterRepository, CandidateRepository candidateRepository ,
			InterviewerRepository interviewerRepository, InterviewsRepository interviewRepository, 
			PacksRepository packsRepository,RecruiterRepository recruiterRepository,UserRepository userRepository,RoleRepository roleRepository) {
		super();
		this.assessmentCenterRepository = assessmentCenterRepository;
		this.candidateRepository = candidateRepository;
		this.interviewerRepository = interviewerRepository;
		this.interviewRepository = interviewRepository;
		this.packsRepository = packsRepository;
		this.recruiterRepository = recruiterRepository;
		this.userRepository = userRepository;
		this.roleRepository = roleRepository;
	}
	
	@Override
	public void run(ApplicationArguments args) throws Exception {
		System.out.println(
				"*********************************************************************\n"
				+ "*********************************************************************\n"
				+ "*********************************************************************\n"
				+ "***********************---SYSTEM IS RUNNING---***********************\n"
				+ "*********************************************************************\n"
				+ "*********************************************************************\n"
				+ "*********************************************************************\n");
		
		
		//Pre Load data
		LocalDateTime dateTime = LocalDateTime.now(); 
		LocalDate date = LocalDate.now();
		LocalTime time = LocalTime.now();
			
		

		
		// CANDIDATES
		List<Candidate> candidateList = new ArrayList<>();
		candidateList.add(new Candidate("Mr", "John", "William", "Smith", "0412321345", "JohnWSmith@Gmail.com", date, "123 Magicalfairyland steet", 1, "Data Science", "Magic Uni", "resume-link", "Java", "RecruitPhase1", "N/A"));
		candidateList.add(new Candidate("Ms", "Raquel", "Kasey", "Lacey", "0453194231", "RaquelKLacey@Gmail.com", date, "231 Magicalfairyland steet", 123, "Mechanical Engineering", "Magic Uni", "resume-link", "Business", "RecruitPhase3", "Re-Sit"));
		candidateList.add(new Candidate("Miss", "Sammi", "Corinna", "Radcliff", "0463927382", "SammiCRadcliff@Gmail.com", date, "23 Magicalfairyland steet", 14123123, "Data Science", "University co.", "resume-link", "Cloud Engineering", "RecruitPhase2", "N/A"));
		candidateList.add(new Candidate("Mr", "Burt", "Esmond", "Everill", "0452123623", "Burt_E_Everill@Gmail.com", date, "52 Magicalfairyland steet", 123123, "Electrial Engineering", "Boring Uni", "resume-link", "Java", "RecruitPhase1", "Re-Sit"));
		
		this.candidateRepository.saveAll(candidateList);
			
		// RECRUITERS
		List<Recruiter> recruiterList = new ArrayList<>();
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
		
		this.recruiterRepository.saveAll(recruiterList);

		
		// INTERVIEWERS
		List<Interviewer> interviewerList = new ArrayList<>();
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
		
		this.interviewerRepository.saveAll(interviewerList);
		
		
		// PACKS
		List<Pack> packList = new ArrayList<>();
		packList.add(new Pack("Pack 1","Tech","Link..."));
		packList.add(new Pack("Pack 2","Tech","Link..."));
		packList.add(new Pack("Pack 3","Sales","Link..."));
		packList.add(new Pack("Pack 4","Tech","Link..."));
		packList.add(new Pack("Pack 5","Sales","Link..."));
		
		this.packsRepository.saveAll(packList);
		
		// ASSESSMENT CENTERS 
		List<AssessmentCenter> acList = new ArrayList<>();
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
		//acList.get(0).setRecruiters(List<Recruiter> = recruiterList.get(0),)
		acList.get(1).setCoordinatorId(2);
		acList.get(2).setCoordinatorId(3);
		acList.get(3).setCoordinatorId(4);
		acList.get(4).setCoordinatorId(5);
		acList.get(5).setCoordinatorId(6);
		acList.get(6).setCoordinatorId(7);
		acList.get(7).setCoordinatorId(8);
		acList.get(8).setCoordinatorId(9);
		
		
		this.assessmentCenterRepository.saveAll(acList);
			
		// INTERVIEWS
		// AC 1 (A)
		List<Interview> interviewA = new ArrayList<>();
		interviewA.add(new Interview(acList.get(0),interviewerList.get(2),candidateList.get(0),"Feedback Form", time,1));
		interviewA.add(new Interview(acList.get(0),interviewerList.get(3),candidateList.get(0),"Feedback Form", time,2));
		interviewA.add(new Interview(acList.get(0),interviewerList.get(3),candidateList.get(1),"Feedback Form", time,3));
		interviewA.add(new Interview(acList.get(0),interviewerList.get(1),candidateList.get(1),"Feedback Form", time,4));
		interviewA.add(new Interview(acList.get(0),interviewerList.get(5),candidateList.get(2),"Feedback Form", time,5));
		interviewA.add(new Interview(acList.get(0),interviewerList.get(5),candidateList.get(2),"Feedback Form", time,6));
		interviewA.add(new Interview(acList.get(0),interviewerList.get(7),candidateList.get(3),"Feedback Form", time,7));
		interviewA.add(new Interview(acList.get(0),interviewerList.get(8),candidateList.get(3),"Feedback Form", time,8));

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
		List<Interview> interviewB = new ArrayList<>();
		interviewB.add(new Interview(acList.get(1),interviewerList.get(4),candidateList.get(0),"Feedback Form", time,10));
		interviewB.add(new Interview(acList.get(1),interviewerList.get(3),candidateList.get(0),"Feedback Form", time,20));
		interviewB.add(new Interview(acList.get(1),interviewerList.get(3),candidateList.get(1),"Feedback Form", time,30));
		interviewB.add(new Interview(acList.get(1),interviewerList.get(8),candidateList.get(1),"Feedback Form", time,40));
		interviewB.add(new Interview(acList.get(1),interviewerList.get(5),candidateList.get(2),"Feedback Form", time,50));
		interviewB.add(new Interview(acList.get(1),interviewerList.get(7),candidateList.get(2),"Feedback Form", time,60));
		
		candidateList.get(0).addAssessmentCenter(acList.get(1));
		candidateList.get(1).addAssessmentCenter(acList.get(1));
		candidateList.get(2).addAssessmentCenter(acList.get(1));
		interviewerList.get(4).addAssessmentCenter(acList.get(1));
		interviewerList.get(3).addAssessmentCenter(acList.get(1));
		interviewerList.get(8).addAssessmentCenter(acList.get(1));
		interviewerList.get(5).addAssessmentCenter(acList.get(1));
		interviewerList.get(7).addAssessmentCenter(acList.get(1));
		
		// AC 3	(C)
		List<Interview> interviewC = new ArrayList<>();
		interviewC.add(new Interview(acList.get(2),interviewerList.get(2),candidateList.get(0),"Feedback Form", time,23));
		interviewC.add(new Interview(acList.get(2),interviewerList.get(1),candidateList.get(0),"Feedback Form", time,123));
		interviewC.add(new Interview(acList.get(2),interviewerList.get(4),candidateList.get(1),"Feedback Form", time,63));
		interviewC.add(new Interview(acList.get(2),interviewerList.get(4),candidateList.get(1),"Feedback Form", time,478));
		interviewC.add(new Interview(acList.get(2),interviewerList.get(6),candidateList.get(2),"Feedback Form", time,234));
		interviewC.add(new Interview(acList.get(2),interviewerList.get(6),candidateList.get(2),"Feedback Form", time,613));
		interviewC.add(new Interview(acList.get(2),interviewerList.get(7),candidateList.get(3),"Feedback Form", time,123));
		interviewC.add(new Interview(acList.get(2),interviewerList.get(8),candidateList.get(3),"Feedback Form", time,52));
		
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
		
		this.interviewRepository.saveAll(interviewA);
		this.interviewRepository.saveAll(interviewB);
		this.interviewRepository.saveAll(interviewC);
		
		// Roles
		List<Role> rolesList = new ArrayList<>();
		rolesList.add(new Role());
		rolesList.add(new Role());
		rolesList.add(new Role());
		rolesList.add(new Role());

		rolesList.get(0).setName(ERole.ROLE_ADMIN);
		rolesList.get(1).setName(ERole.ROLE_INTERVIEWER);
		rolesList.get(2).setName(ERole.ROLE_RECRUITER);
		rolesList.get(3).setName(ERole.ROLE_CANDIDATE);

		this.roleRepository.saveAll(rolesList);
		
		// Auth Sign-In
		List<User> userList = new ArrayList<>();
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
		
		
		
		
		
		this.userRepository.saveAll(userList);
		
	
		
	
		
		// Update all changes
		this.userRepository.saveAll(userList);
		this.roleRepository.saveAll(rolesList);
		this.candidateRepository.saveAll(candidateList);
		this.recruiterRepository.saveAll(recruiterList);
		this.interviewerRepository.saveAll(interviewerList);
		this.packsRepository.saveAll(packList);
		this.assessmentCenterRepository.saveAll(acList);
		this.interviewRepository.saveAll(interviewA);
		this.interviewRepository.saveAll(interviewB);
		this.interviewRepository.saveAll(interviewC);
	}

}

