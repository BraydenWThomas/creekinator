import React from 'react';
import './RecruiterStyles.css';
const AssessmentCentreInfo = () => {

    return (
        <div className='assessmentCentreInfo'>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />

            <div className="streamInfo">
                <button className='acDetails'>....</button>
                <h2>Stream Name</h2>
                <h4>Stream Name</h4>
            </div>


            <div style={{ marginRight: "20px", marginLeft: "20px", backgroundColor: "white", paddingLeft: "20px"}}>
                <div style={{ width: "30%", float: "left" }}>
                    <h4>Interviewers assigned</h4>
                    <p>Sales</p>
                    <ul style={{ marginLeft: "20px"}}>
                        <li>Karen</li>
                        <li>Joe</li>
                    
                    </ul>
                    <p>Techincal</p>
                    <ul style={{ marginLeft: "20px"}}>
                        <li>Karen</li>
                        <li>Joe</li>
                    
                    </ul>
                </div>

                <div style={{ width: "30%", float: "left" }}>
                    <h4>Candidate Attending</h4>
                    <ul style={{ marginLeft: "20px"}}>
                        <li>Kay</li>
                        <li>Joan</li>
                        <li>Harry</li> 
                        <li>George</li>
                    </ul>  
                </div>
                <div style={{ width: "40%", float: "left" }}>
                    <h4>Interview Pack</h4>
                    <p>Sales</p>
                    <ul style={{ marginLeft: "20px"}}>
                        <li>Pack 1</li>
                       
                    
                    </ul>
                    <p>Techincal</p>
                    <ul style={{ marginLeft: "20px"}}>
                        <li>Pack 1</li>
                       
                    
                    </ul>
                </div>
                <div style={{ display: "flex", clear: "both" }}>
                    <i className="glyphicon glyphicon-user" style={{ fontSize: "50px", position: "relative", marginRight: "20px" }} />
                    <h3>NAME</h3>
                </div>

            </div>
        </div>
    )
}

export default AssessmentCentreInfo;