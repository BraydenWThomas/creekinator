import React from 'react';
import './RecruiterStyles.css';
const CandidateSelectBox = () => {
    
    return (
        <div className='candidateSelectBox'>
           <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
            <button className='candidateDetails'>....</button>
           
            <div style={{ marginLeft: "20px"}}>
                <div style={{ display: "flex", clear: "both" }}>
                    <i className="glyphicon glyphicon-user" style={{ fontSize: "50px", position: "relative", marginRight: "20px" }} />
                    <h3>NAME</h3>
                </div>
                <div style={{ display: "flex", clear: "both" }}>
                    <i className="glyphicon glyphicon-phone" style={{ fontSize: "50px", position: "relative", marginTop: "10px", marginRight: "20px" }} />
                    <h3>PHONE</h3>
                </div>
                <div style={{ display: "flex", marginBottom: "20px", clear: "both" }}>
                    <i className="glyphicon glyphicon-envelope" style={{ fontSize: "50px", position: "relative", marginTop: "10px", marginRight: "20px" }} />
                    <h3>EMAIL</h3>
                </div>
            </div>
        </div>
    )
}

export default CandidateSelectBox;