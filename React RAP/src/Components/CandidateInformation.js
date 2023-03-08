import { Divider, TextField } from "@mui/material";
import { useState } from "react";
import NavBar from "./NavBar";
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const CandidateInformation = () => {
    const [title, setTitle] = useState('');
    

    const [appliedStream, setAppliedStream] = useState('');
    const [recruitmentPhase, setRecruitmentPhase] = useState('');
    const [pastACResult, setPastACResult] = useState('');




    return (
        <div className="create-candidate">
            <NavBar />
            <div className="content" style={{ float: 'left', width: '80%', backgroundColor: "#f2f2f2" }}>
                <div className="header" style={{ display: "flex" }}>
                    <h1 style={{ flex: 1, margin: '1%' }}>Create Candidate</h1>
                    <div className="right-header" style={{ display: 'flex', paddingRight: "2%", paddingTop: "2%" }}>
                        <NotificationsIcon fontSize="large" />
                        <Avatar src="/broken-image.jpg" />
                    </div>
                </div>
                <Divider variant='middle' />
                <div className="details">
                    <h2 style={{ margin: '1%' }}>Details</h2>
                    <div className="personal-details-row">
                       
                            
                            <TextField
                            disabled
                            id="title_select"
                            label="Title"
                            type="text"
                            
                            sx={{ m: 2 }}
                            
                        />
                      
                        <TextField
                            disabled
                            id="outlined-first-name-input"
                            label="First Name"
                            type="text"
                            
                            sx={{ m: 2 }}
                            
                        />
                        <TextField
                            disabled
                            id="outlined-middle-name-input"
                            label="Middle Name"
                            type="text"
                           
                            sx={{ m: 2 }}
                           
                        />
                        <TextField
                            disabled
                            id="outlined-last-name-input"
                            label="Last Name"
                            type="text"
                            sx={{ m: 2 }}
                           
                        />
                    </div>
                    <div className="contact-details-row">
                        <TextField
                            disabled
                            id="outlined-mobile-input"
                            label="Mobile Phone"
                            type="number"
                            sx={{ m: 2 }}
                           
                        />
                        <TextField
                            disabled
                            id="outlined-email-input"
                            label="Email"
                            type="text"
                            sx={{ m: 2 }}
                         
                        />
                    </div>
                    <div className="contact-details-row">
                         <TextField
                            disabled
                            id="outlined-date-input"
                            label="Date of Birth"
                            type="text"
                           
                            sx={{ m: 2 }}
                         
                        />
                        <TextField
                            disabled
                            id="outlined-address-input"
                            label="Address"
                            type="text"
                           
                            sx={{ m: 2, minWidth: 500}}
                           
                        />
                    </div>
                    <div className="contact-details-row">
                        <TextField
                            disabled
                            id="outlined-year-input"
                            label="Graduation Year"
                            type="number"
                            sx={{ m: 2 }}
                           
                        />
                        <TextField
                            disabled
                            id="outlined-degree-input"
                            label="Degree"
                            type="text"
                            sx={{ m: 2 }}
                           
                        />
                        <TextField
                            disabled
                            id="outlined-university-input"
                            label="University"
                            type="text"
                            sx={{ m: 2 }}
                        
                        />
                    </div>
                </div>
                <div className="application-details">
                    <div className="application-details-header"></div>
                    <Divider style={{ paddingTop: '2%' }} />
                    <h2 style={{ margin: '1%' }}>Application Details</h2>
                    <div className="resume-row">
                       
                    </div>
                    <div className="stream-details-row">
                       
                        <TextField
                            disabled
                            id="applied-stream-select"
                            label="Stream"
                            type="text"
                            sx={{ m: 2 }}
                            onChange={(event) => setAppliedStream(event.target.value)}
                        />
                            
                            
                        {/* <FormControl required sx={{ m: 2, minWidth: 450 }}>
                            <InputLabel id="recruitment-phase-select-label">Recruitment Phase</InputLabel>
                            <Select
                                labelId="recruitment-phase-select-label"
                                id="recruitment-phase-select"
                                value={recruitmentPhase}
                                label="Recruitment Phase"
                                onChange={(event) => setRecruitmentPhase(event.target.value)}
                            >
                                <MenuItem value={"Applied"}>Applied</MenuItem>
                                <MenuItem value={"Interviewed"}>Invterviewed</MenuItem>
                            </Select>
                        </FormControl> */}
                        <TextField
                            disabled
                            id="recruitment-phase-select-label"
                            label="Recruitment Phase"
                            type="text"
                            sx={{ m: 2 }}
                            onChange={(event) => setRecruitmentPhase(event.target.value)}
                        />

                        <TextField
                            disabled
                            id="past-ac-result-input"
                            label="Past AC Result"
                            type="text"
                            sx={{ m: 2 }}
                            onChange={(event) => setPastACResult(event.target.value)}
                        />
                    </div>
                    <div className="create-button-row">
                        <Button variant="contained" component="label" sx={{ m: 5 }} style={{ float: 'right' }}>Back</Button>
                    </div>
                   
                </div>

            </div>
        </div>
    )
}
export default CandidateInformation;