import CandidateSelectBox from './CandidatesSelectBox';
import AssessmentCentreInfo from './AssessmentCentreInfo';
import './RecruiterStyles.css';
import NavBar from './NavBar';

const Recruiter = () => {
  
  return (
   
    <div className="pageSection">

        <NavBar/>
    
        <div className='bodySection'> 
            
            <div className='bellAndAvatar'>
                <h1 style={{paddingLeft: "20px", paddingTop: "20px"}}>Dashboard</h1>
                <p>BELL ICON</p>
                <p>AVATAR</p>
            </div>

            <hr/>

            <div className='recruiterToolBar'>
                <div style={{float: "left"}}>
                    <button>Applications</button>
                    <button>Assessment Centres</button>
                </div>
                <div style={{float: "right"}}>
                    <button>Filter</button>
                    <input type={'text'}/>
                </div>

            </div>
            
            <div className='applicantToolBar' style={{clear: "both"}}>
               
                    <h4 style={{float: "left"}}>Applied</h4>
                
                    <button className='addCandidate'>+</button>
            
                
            </div>
            <div className='candidatesInfo' style={{marginTop: "30px"}}>
            
            <CandidateSelectBox/>
            <AssessmentCentreInfo/>
            </div>

        </div>

  </div>
  
    )
}


export default Recruiter;