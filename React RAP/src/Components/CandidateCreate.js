import { Divider, TextField } from "@mui/material";
import { useState } from "react";
import NavBar from "./NavBar";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

 const CreateCandidate = () => {
    const [title, setTitle] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobilePhone, setMobilePhone] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [address, setAddress] = useState('');
    const [gradYear, setGradYear] = useState('');
    const [Degree, setDegree] = useState('');
    const [university, setUniversity] = useState('');
    
    const [appliedStream, setAppliedStream] = useState('');
    const [recruitmentPhase, setRecruitmentPhase] = useState('');
    const [pastACResult, setPastACResult] = useState('');

 return (
    <div className="create-candidate">
        <NavBar />
    <div className="content" style={{ float: 'left', width: '80%' }}>
        <div className="header">
            <h1>Create Candidate</h1>
            <Divider variant='middle'/>
        </div>
        <div className="details">
            <h2>Details</h2>
            <div className="personal-details-row">
            <FormControl sx={{ minWidth: 80 }}>
                    <InputLabel id="title-select-label">Title</InputLabel>
                    <Select
                    labelId="title-select-label"
                    id="title-select"
                    value={title}
                    label="Title"
                    onChange={(event) => setTitle(event.target.value)}
                    >
                    <MenuItem value={"Mr"}>Mr</MenuItem>
                    <MenuItem value={"Ms"}>Ms</MenuItem>
                    <MenuItem value={"Miss"}>Miss</MenuItem>
                    <MenuItem value={"Mrs"}>Mrs</MenuItem>
                    <MenuItem value={"Dr"}>Dr</MenuItem>
                    </Select>
                </FormControl>
            <TextField 
                id="outlined-first-name-input" 
                label="First Name" 
                type="text" 
                autoComplete="current-first-name"
                onChange={(event) => setFirstName(event.target.value)}
            />
            <TextField 
                id="outlined-middle-name-input" 
                label="Middle Name" 
                type="text" 
                autoComplete="current-middle-name"
                onChange={(event) => setMiddleName(event.target.value)}
            />
            <TextField 
                id="outlined-last-name-input" 
                label="Last Name" 
                type="text" 
                autoComplete="current-last-name"
                onChange={(event) => setLastName(event.target.value)}
            />
            </div>
            <div className="contact-details-row">
            <TextField 
                id="outlined-mobile-input" 
                label="Mobile Phone" 
                type="number" 
                autoComplete="current-mobile"
                onChange={(event) => setMobilePhone(event.target.value)}
            />
            <TextField 
                id="outlined-email-input" 
                label="Email" 
                type="text" 
                autoComplete="current-email"
                onChange={(event) => setEmail(event.target.value)}
            />
            </div>
            <div className="contact-details-row">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="D.O.B" />
            </LocalizationProvider>
            <TextField 
                id="outlined-address-input" 
                label="Address" 
                type="text" 
                autoComplete="current-address"
                onChange={(event) => setAddress(event.target.value)}
            />
            </div>
            <div className="contact-details-row">
            <TextField 
                id="outlined-year-input" 
                label="Graduation Year" 
                type="number" 
                autoComplete="current-year"
                onChange={(event) => setGradYear(event.target.value)}
            />
            <TextField 
                id="outlined-degree-input" 
                label="Degree" 
                type="text" 
                autoComplete="current-degree"
                onChange={(event) => setDegree(event.target.value)}
            />
            <TextField 
                id="outlined-university-input" 
                label="University" 
                type="text" 
                autoComplete="current-university"
                onChange={(event) => setUniversity(event.target.value)}
            />
            </div>
        </div>
        <div className="application-details">
            <div className="application-details-header"></div>
            <Divider style={{paddingTop:'2%'}} />
            <h2>Application Details</h2>
            <div className="resume-row">
                <Button variant="outlined" component="label">
                    Upload Resume
                    <input hidden accept="image/*" multiple type="file" />
                </Button>
            </div>
            <div className="stream-details-row">
                <FormControl sx={{ minWidth: 450 }}>
                    <InputLabel id="applied-stream-select-label">Applied Stream</InputLabel>
                    <Select
                    labelId="applied-stream-select-label"
                    id="applied-stream-select"
                    value={appliedStream}
                    label="Applied Stream"
                    onChange={(event) => setAppliedStream(event.target.value)}
                    >
                    <MenuItem value={"Software Development"}>Software Development</MenuItem>
                    <MenuItem value={"Technical Analyst"}>Technical Analyst</MenuItem>
                    <MenuItem value={"Business Analytics"}>Business Analytics</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 450 }}>
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
                </FormControl>
                <TextField 
                id="past-ac-result-input" 
                label="Past AC Result" 
                type="number" 
                autoComplete="past-ac-result"
                onChange={(event) => setPastACResult(event.target.value)}
                />
            </div>

        </div>
    </div>
    </div>
 )
 }
 export default CreateCandidate;