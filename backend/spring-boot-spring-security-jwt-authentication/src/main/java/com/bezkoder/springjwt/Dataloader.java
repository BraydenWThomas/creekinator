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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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
	private QuestionsFeedbackRepository questionsFeedbackRepository;
	private InterviewFeedbackRepository interviewFeedbackRepository;
	private QuestionsRepository questionsRepository;
	private PasswordEncoder encoder;
	
	
	
	@Autowired
	public Dataloader(AssessmentCenterRepository assessmentCenterRepository, CandidateRepository candidateRepository ,
			InterviewerRepository interviewerRepository, InterviewsRepository interviewRepository, 
			PacksRepository packsRepository,RecruiterRepository recruiterRepository,UserRepository userRepository,RoleRepository roleRepository, 
			QuestionsFeedbackRepository questionsFeedbackRepository, InterviewFeedbackRepository interviewFeedbackRepository, QuestionsRepository questionsRepository,PasswordEncoder encoder) {
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
		this.encoder = encoder;
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
		candidateList.add(new Candidate("Mr", "John", "William", "Smith", "0412321345", "JohnWSmith@Gmail.com", date, "1948 Poplar Street", 2019, "Data Science", "Highland Univeristy", "resume-link", "Business Analyst", "applied", "N/A"));
		candidateList.add(new Candidate("Ms", "Raquel", "Kasey", "Lacey", "0453194231", "RaquelKLacey@Gmail.com", date, "881 Pinewood Avenue", 2020, "Mechanical Engineering", "Big Valley College", "resume-link", "Business Intelligence", "interviewed", "N/A"));
		candidateList.add(new Candidate("Miss", "Sammi", "Corinna", "Radcliff", "0463927382", "SammiCRadcliff@Gmail.com", date, "1552 Millbrook Road", 2021, "Data Science", "Summerfield University", "resume-link", "Cloud (AWS)", "applied", "N/A"));
		candidateList.add(new Candidate("Mr", "Burt", "Esmond", "Everill", "0452123623", "Burt_E_Everill@Gmail.com", date, "1444 Derek Drive", 2022, "Electrial Engineering", "Savanna University", "resume-link", "Technical Analyst", "applied", "N/A"));
		candidateList.add(new Candidate("Mr","Martie", "Tim", "Anderson", "0453021295", "MartieTAnderson@Gmail.com", date, "1114 Loving Acres Road", 2023, "Data Science", "Woodcreek College", "resume-link", "Testing", "applied", "N/A"));
		candidateList.add(new Candidate("Dr","Carver", "Blessing", "Corwin", "0445407108", "CarverBCorwin@Gmail.com", date, "2270 Pinnickinick Street", 2022, "Electrial Engineering", "Pacific Coast University", "resume-link", "Software Development", "applied", "N/A"));
		candidateList.add(new Candidate("Mr","Carson", "Tylor", "Willard", "0483531179", "CarsonTWillard@Gmail.com", date, "3306 Lamberts Branch Road", 2021, "Mechanical Engineering", "Skyline College", "resume-link", "Business Intelligence", "interviewed", "N/A"));
		candidateList.add(new Candidate("Mrs","Ariah", "Alana", "Massey", "0483742485", "AriahAMassey@Gmail.com", date, "2912 Hershell Hollow Road", 2020, "Electrial Engineering", "Emerald City College", "resume-link", "Business Analyst", "applied", "N/A"));
		candidateList.add(new Candidate("Ms","Kimberleigh", "Bettie", "Chambers", "0490716975", "KimberleighBChambers@Gmail.com", date, "3498 Cunningham Court", 2018, "Electrial Engineering", "River Valley University", "resume-link", "Testing", "applied", "N/A"));
		candidateList.add(new Candidate("Dr","Jessi", "Izzy", "Dixon", "0490906346", "JessiIDixon@Gmail.com", date, "906 Tree Frog Lane", 2021, "Data Science", "Rustic Ridge College", "resume-link", "Cloud (AWS)", "applied", "N/A"));
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
		packList.add(new Pack("Pack1", "Tech", "Java", null, null, null, null));
		packList.add(new Pack("Pack2", "Sales", "SalesPackType", null, null, null, null));
		packList.add(new Pack("Pack3", "Tech", "AWS", null, null, null, null));
		packList.add(new Pack("Pack4", "Sales", "SalesPackType", null, null, null, null));

		
		this.packsRepository.saveAll(packList);
		
		//QUESTIONS
		List<Questions> questionList = new ArrayList<>();
		questionList.add(new Questions(packList.get(0), "Question", "Answer", null));
		questionList.add(new Questions(packList.get(0), "Question", "Answer", null));
		questionList.add(new Questions(packList.get(0), "Question", "Answer", null));
		questionList.add(new Questions(packList.get(0), "Question", "Answer", null));
		
		this.questionsRepository.saveAll(questionList);
		
		//INTERVIEW FEEDBACK
		List<InterviewFeedback> interviewFeedbackList = new ArrayList<InterviewFeedback>();
		interviewFeedbackList.add(new InterviewFeedback(null, null, null, "Feedback", 2));
		interviewFeedbackList.get(0).setPackId(packList.get(0));
		
		this.interviewFeedbackRepository.saveAll(interviewFeedbackList);
		
		//QUESTIONS FEEDBACK
		List<QuestionsFeedback> questionsFeedbackList = new ArrayList<QuestionsFeedback>();
		questionsFeedbackList.add(new QuestionsFeedback(null, questionList.get(0), "Response", "Feedback", 6));
		questionsFeedbackList.add(new QuestionsFeedback(null, questionList.get(1), "Response", "Feedback", 3));
		questionsFeedbackList.add(new QuestionsFeedback(null, questionList.get(2), "Response", "Feedback", 1));
		questionsFeedbackList.add(new QuestionsFeedback(null, questionList.get(3), "Response", "Feedback", 9));
		
		interviewFeedbackList.get(0).setQuestionFeedback(questionsFeedbackList);
		questionsFeedbackList.forEach(qf -> qf.setInterviewFeedback(interviewFeedbackList.get(0)));
		this.interviewFeedbackRepository.saveAll(interviewFeedbackList);
		this.questionsFeedbackRepository.saveAll(questionsFeedbackList);
		
		// ASSESSMENT CENTERS 
		List<AssessmentCenter> acList = new ArrayList<>();
		acList.add(new AssessmentCenter("AC Thursday 16/3", "", LocalDate.of(2023, 3, 16),LocalTime.of(14, 30, 0, 0),LocalTime.of(16, 30, 0, 0),true));//past
		acList.add(new AssessmentCenter("AC Tuesday 21/3", "", LocalDate.of(2023, 3, 21),LocalTime.of(14, 30, 0, 0),LocalTime.of(16, 30, 0, 0),false));//future
		acList.add(new AssessmentCenter("AC Thursday 23/3", "", LocalDate.of(2023, 3, 23),LocalTime.of(14, 30, 0, 0),LocalTime.of(16, 30, 0, 0),false));//future
		
		List<Recruiter> acRecruiter = new ArrayList<>();
		acRecruiter.add(recruiterList.get(0));
		acRecruiter.add(recruiterList.get(3));
		acRecruiter.add(recruiterList.get(6));
			
		acList.get(0).setRecruiters(acRecruiter);
		acList.get(1).setRecruiters(acRecruiter);
		acList.get(2).setRecruiters(acRecruiter);
		
		
		this.assessmentCenterRepository.saveAll(acList);
			
		// INTERVIEWS
		// AC 1 (A)
		List<Interview> interviewA = new ArrayList<>();
		interviewA.add(new Interview(acList.get(0),interviewerList.get(2),candidateList.get(1),"Feedback Form", LocalTime.of(14, 40, 0, 0),78));
		interviewA.add(new Interview(acList.get(0),interviewerList.get(8),candidateList.get(1),"Feedback Form", LocalTime.of(15, 20, 0, 0),84));
		interviewA.add(new Interview(acList.get(0),interviewerList.get(2),candidateList.get(7),"Feedback Form", LocalTime.of(15, 20, 0, 0),96));
		interviewA.add(new Interview(acList.get(0),interviewerList.get(8),candidateList.get(7),"Feedback Form", LocalTime.of(14, 40, 0, 0),81));

		interviewA.get(0).setPack(packList.get(0));
		interviewA.get(1).setPack(packList.get(1));
		interviewA.get(2).setPack(packList.get(0));
		interviewA.get(3).setPack(packList.get(1));
		
		candidateList.get(1).addAssessmentCenter(acList.get(0));
		candidateList.get(7).addAssessmentCenter(acList.get(0));
		interviewerList.get(2).addAssessmentCenter(acList.get(0));
		interviewerList.get(8).addAssessmentCenter(acList.get(0));
		
		// AC 2 (B)
		List<Interview> interviewB = new ArrayList<>();
		interviewB.add(new Interview(acList.get(1),interviewerList.get(1),candidateList.get(0),"Feedback Form", LocalTime.of(14, 40, 0, 0),-1));
		interviewB.add(new Interview(acList.get(1),interviewerList.get(9),candidateList.get(0),"Feedback Form", LocalTime.of(15, 20, 0, 0),-1));
		interviewB.add(new Interview(acList.get(1),interviewerList.get(1),candidateList.get(2),"Feedback Form", LocalTime.of(15, 20, 0, 0),-1));
		interviewB.add(new Interview(acList.get(1),interviewerList.get(9),candidateList.get(2),"Feedback Form", LocalTime.of(16, 00, 0, 0),-1));
		interviewB.add(new Interview(acList.get(1),interviewerList.get(1),candidateList.get(4),"Feedback Form", LocalTime.of(16, 00, 0, 0),-1));
		interviewB.add(new Interview(acList.get(1),interviewerList.get(9),candidateList.get(4),"Feedback Form", LocalTime.of(14, 40, 0, 0),-1));
		
		interviewB.get(0).setPack(packList.get(2));
		interviewB.get(1).setPack(packList.get(3));
		interviewB.get(2).setPack(packList.get(2));
		interviewB.get(3).setPack(packList.get(3));
		interviewB.get(4).setPack(packList.get(2));
		interviewB.get(5).setPack(packList.get(3));
		
		
		candidateList.get(0).addAssessmentCenter(acList.get(1));
		candidateList.get(2).addAssessmentCenter(acList.get(1));
		candidateList.get(4).addAssessmentCenter(acList.get(1));
		interviewerList.get(1).addAssessmentCenter(acList.get(1));
		interviewerList.get(9).addAssessmentCenter(acList.get(1));
		
		// AC 3	(C)
		List<Interview> interviewC = new ArrayList<>();
		interviewC.add(new Interview(acList.get(2),interviewerList.get(3),candidateList.get(3),"Feedback Form", LocalTime.of(14, 40, 0, 0),-1));
		interviewC.add(new Interview(acList.get(2),interviewerList.get(7),candidateList.get(3),"Feedback Form", LocalTime.of(15, 20, 0, 0),-1));
		interviewC.add(new Interview(acList.get(2),interviewerList.get(3),candidateList.get(5),"Feedback Form", LocalTime.of(16, 00, 0, 0),-1));
		interviewC.add(new Interview(acList.get(2),interviewerList.get(7),candidateList.get(5),"Feedback Form", LocalTime.of(14, 40, 0, 0),-1));
		interviewC.add(new Interview(acList.get(2),interviewerList.get(4),candidateList.get(6),"Feedback Form", LocalTime.of(14, 40, 0, 0),-1));
		interviewC.add(new Interview(acList.get(2),interviewerList.get(6),candidateList.get(6),"Feedback Form", LocalTime.of(15, 20, 0, 0),-1));
		interviewC.add(new Interview(acList.get(2),interviewerList.get(4),candidateList.get(8),"Feedback Form", LocalTime.of(15, 20, 0, 0),-1));
		interviewC.add(new Interview(acList.get(2),interviewerList.get(6),candidateList.get(8),"Feedback Form", LocalTime.of(14, 40, 0, 0),-1));
		interviewC.add(new Interview(acList.get(2),interviewerList.get(3),candidateList.get(9),"Feedback Form", LocalTime.of(15, 20, 0, 0),-1));
		interviewC.add(new Interview(acList.get(2),interviewerList.get(6),candidateList.get(9),"Feedback Form", LocalTime.of(16, 00, 0, 0),-1));
		
		candidateList.get(3).addAssessmentCenter(acList.get(2));
		candidateList.get(5).addAssessmentCenter(acList.get(2));
		candidateList.get(6).addAssessmentCenter(acList.get(2));
		candidateList.get(8).addAssessmentCenter(acList.get(2));
		candidateList.get(9).addAssessmentCenter(acList.get(2));
		interviewerList.get(3).addAssessmentCenter(acList.get(2));
		interviewerList.get(4).addAssessmentCenter(acList.get(2));
		interviewerList.get(6).addAssessmentCenter(acList.get(2));
		interviewerList.get(7).addAssessmentCenter(acList.get(2));
		
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
		userList.add(new User("admin1","admin1@gmail.com",encoder.encode("admin1"),"adminName1"));
		userList.get(0).addRole(rolesList.get(0));
		
		userList.add(new User("interviewer1","interviewer1@gmail.com",encoder.encode("interviewer1"),"interviewerName1"));
		userList.get(1).addRole(rolesList.get(1));
		interviewerList.get(0).addUser(userList.get(1));
		userList.add(new User("interviewer2","interviewer2@gmail.com",encoder.encode("interviewer2"),"interviewerName2"));
		userList.get(2).addRole(rolesList.get(1));
		interviewerList.get(1).addUser(userList.get(2));
		userList.add(new User("interviewer3","interviewer3@gmail.com",encoder.encode("interviewer3"),"interviewerName3"));
		userList.get(3).addRole(rolesList.get(1));
		interviewerList.get(2).addUser(userList.get(3));
		userList.add(new User("interviewer4","interviewer4@gmail.com",encoder.encode("interviewer4"),"interviewerName4"));
		userList.get(4).addRole(rolesList.get(1));
		interviewerList.get(3).addUser(userList.get(4));
		
		userList.add(new User("recruiter1","recruiter1@gmail.com",encoder.encode("recruiter1"),"recruiterName1"));
		userList.get(5).addRole(rolesList.get(2));
		recruiterList.get(0).addUser(userList.get(5));
		userList.add(new User("recruiter2","recruiter2@gmail.com",encoder.encode("recruiter2"),"recruiterName2"));
		userList.get(6).addRole(rolesList.get(2));
		recruiterList.get(1).addUser(userList.get(6));
		
		userList.add(new User("candidate1","candidate1@gmail.com",encoder.encode("candidate1"),"candidateName1"));
		userList.get(7).addRole(rolesList.get(3));
		candidateList.get(0).addUser(userList.get(7));
		userList.add(new User("candidate2","candidate2@gmail.com",encoder.encode("candidate2"),"candidateName2"));
		userList.get(8).addRole(rolesList.get(3));
		candidateList.get(1).addUser(userList.get(8));
		userList.add(new User("candidate3","candidate3@gmail.com",encoder.encode("candidate3"),"candidateName3"));
		userList.get(9).addRole(rolesList.get(3));
		candidateList.get(2).addUser(userList.get(9));
		userList.add(new User("candidate4","candidate4@gmail.com",encoder.encode("candidate4"),"candidateName4"));
		userList.get(10).addRole(rolesList.get(3));
		candidateList.get(3).addUser(userList.get(10));
		
		
		this.userRepository.saveAll(userList);
		
		
		
		interviewFeedbackList.get(0).setInterview(interviewA.get(0));
		interviewA.get(0).setFeedback(interviewFeedbackList.get(0));
		packList.get(0).setAssessmentCenters(acList);
		
		
		
		recruiterList.get(3).addCandidate(candidateList.get(0));
		recruiterList.get(1).addCandidate(candidateList.get(1));
		recruiterList.get(2).addCandidate(candidateList.get(2));
		recruiterList.get(4).addCandidate(candidateList.get(3));
		recruiterList.get(0).addCandidate(candidateList.get(4));
		recruiterList.get(1).addCandidate(candidateList.get(5));
		recruiterList.get(3).addCandidate(candidateList.get(6));
		recruiterList.get(4).addCandidate(candidateList.get(7));
		recruiterList.get(2).addCandidate(candidateList.get(8));
		recruiterList.get(1).addCandidate(candidateList.get(9));
		
		

		
		

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
		this.interviewFeedbackRepository.saveAll(interviewFeedbackList);

	}

}

