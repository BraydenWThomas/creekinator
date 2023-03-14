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
import com.bezkoder.springjwt.repository.AuthorRepository;
import com.bezkoder.springjwt.repository.BookRepository;
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
	private BookRepository bookRepository;
	private AuthorRepository authorRepository;
	
	
	@Autowired
	public Dataloader(AssessmentCenterRepository assessmentCenterRepository, CandidateRepository candidateRepository ,
			InterviewerRepository interviewerRepository, InterviewsRepository interviewRepository, 
			PacksRepository packsRepository,RecruiterRepository recruiterRepository,UserRepository userRepository,RoleRepository roleRepository, 
			AuthorRepository authorRepository, BookRepository bookRepository) {
		super();
		this.assessmentCenterRepository = assessmentCenterRepository;
		this.candidateRepository = candidateRepository;
		this.interviewerRepository = interviewerRepository;
		this.interviewRepository = interviewRepository;
		this.packsRepository = packsRepository;
		this.recruiterRepository = recruiterRepository;
		this.userRepository = userRepository;
		this.roleRepository = roleRepository;
		this.authorRepository = authorRepository;
		this.bookRepository = bookRepository;
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
		recruiterList.add(new Recruiter("Kaitlyn Amberly Rigby", true));
		recruiterList.add(new Recruiter("Braelyn Petal Mathews", false));
		recruiterList.add(new Recruiter("Harper Jayceon Peel", false));
		recruiterList.add(new Recruiter("Jenelle Rosabella Carpenter", false));
		recruiterList.add(new Recruiter("Doyle Kendall Parent", true));
		recruiterList.add(new Recruiter("Kiaran Darnell Jephson", false));
		recruiterList.add(new Recruiter("Jenson Osbourne Ott", false));
		
		this.recruiterRepository.saveAll(recruiterList);

		
		// INTERVIEWERS
		List<Interviewer> interviewerList = new ArrayList<>();
		interviewerList.add(new Interviewer("Drummond Bria Lane"));
		interviewerList.add(new Interviewer("Deryck Cynthia Garnett"));
		interviewerList.add(new Interviewer("Eliana Kassie Quincy"));
		interviewerList.add(new Interviewer("Myra Irvine Bannister"));
		interviewerList.add(new Interviewer("Cherry Adele Oakley"));
		interviewerList.add(new Interviewer("Kerena Alise Horton"));
		interviewerList.add(new Interviewer("Haven Astra Petit"));
		interviewerList.add(new Interviewer("Delilah Rosie Abbey"));
		interviewerList.add(new Interviewer("Nikolas Lexine Yap"));
		interviewerList.add(new Interviewer("Garnet Trista Bean"));
		
		this.interviewerRepository.saveAll(interviewerList);
		
		
		// PACKS
		List<Pack> packList = new ArrayList<>();
		packList.add(new Pack("Pack 1","TechPackLink1","SalesPackLink1"));
		packList.add(new Pack("Pack 2","TechPackLink2","SalesPackLink2"));
		packList.add(new Pack("Pack 3","TechPackLink3","SalesPackLink3"));
		packList.add(new Pack("Pack 4","TechPackLink4","SalesPackLink4"));
		packList.add(new Pack("Pack 5","TechPackLink5","SalesPackLink5"));
		
		this.packsRepository.saveAll(packList);
		
		// ASSESSMENT CENTERS 
		List<AssessmentCenter> acList = new ArrayList<>();
		acList.add(new AssessmentCenter("Ass 1",date,time,time,true));
		acList.add(new AssessmentCenter("Ass 2",date,time,time,true));
		acList.add(new AssessmentCenter("Ass 3",date,time,time,true));
		acList.add(new AssessmentCenter("Ass 4",date,time,time,true));
		acList.add(new AssessmentCenter("Ass 5",date,time,time,true));
		acList.add(new AssessmentCenter("Ass 6",date,time,time,true));
		acList.add(new AssessmentCenter("Ass 7",date,time,time,true));
		acList.add(new AssessmentCenter("Ass 8",date,time,time,true));
		acList.add(new AssessmentCenter("Ass 9",date,time,time,true));
		
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
		rolesList.add(new Role());
		rolesList.add(new Role());
		//rolesList.add(new Role());
		rolesList.get(0).setName(ERole.ROLE_ADMIN);
		rolesList.get(1).setName(ERole.ROLE_INTERVIEWER);
		rolesList.get(2).setName(ERole.ROLE_RECRUITER);
		rolesList.get(3).setName(ERole.ROLE_TECH);
		rolesList.get(4).setName(ERole.ROLE_SALES);
		rolesList.get(5).setName(ERole.ROLE_CANDIDATE);
		// rolesList.get(6).setName(ERole.ROLE_);
		this.roleRepository.saveAll(rolesList);
		
		// Auth Sign-In
		List<User> userList = new ArrayList<>();
		userList.add(new User("admin","admin@gmail.com","admin","a"));
		userList.get(0).addRole(rolesList.get(0));
		userList.add(new User("interviewer","interviewer@gmail.com","interviewer","a"));
		userList.get(1).addRole(rolesList.get(1));
		userList.add(new User("recruiter","recruiter@gmail.com","recruiter","a"));
		userList.get(2).addRole(rolesList.get(2));
		this.userRepository.saveAll(userList);
		
		// Author test 1-1
		List<Book> bookList = new ArrayList<>();
		List<Author> authorList = new ArrayList<>();
		Author author1 = new Author("A", 10);
		Author author2 = new Author("B", 20);
		Author author3 = new Author("C", 30);
		Book book1 = new Book("A", 10);
		Book book2 = new Book("B", 20);
		Book book3 = new Book("C", 30);
		bookList.add(book1);
		bookList.add(book2);
		bookList.add(book3);
		authorList.add(author1);
		authorList.add(author2);
		authorList.add(author3);
		this.bookRepository.saveAll(bookList);
		this.authorRepository.saveAll(authorList);
		author1.setBook(book1);
		author2.setBook(book2);
		author3.setBook(book3);
		book1.setAuthor(author1);
		book2.setAuthor(author2);
		book3.setAuthor(author3);
		this.bookRepository.saveAll(bookList);
		this.authorRepository.saveAll(authorList);
		
	
		
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
