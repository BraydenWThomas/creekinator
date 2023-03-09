import React from 'react';
import '../Styling/RecruiterStyles.css';
import DeleteIcon from '@mui/icons-material/Delete';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import CandidateInformation from './CandidateInformation';
const CandidateSelectBox = (props) => {
    
    return (
       
        <a href="/createcandidate" target={"_blank"}>
        <div className='candidateSelectBox' style={{ clear: "both" }}>
                
                <button className='candidateDelete' onClick={props}><DeleteIcon /></button>
            
                <div style={{ marginLeft: "20px"}}>
                    <div style={{ display: "flex", clear: "both" }}>
                    
                        <h3>NAME</h3>
                    </div>
                    <div style={{ display: "flex", clear: "both" }}>
                    
                        <h3>PHONE</h3>
                    </div>
                    <div style={{ display: "flex", marginBottom: "20px", clear: "both" }}>
                    
                        <h3>EMAIL</h3>
                    </div>
                </div>
            </div>
        </a>

        
            
              
        

        

      
        
    )
}

export default CandidateSelectBox;