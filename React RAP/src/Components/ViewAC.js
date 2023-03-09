import NavBar from "./NavBar";
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import { Divider } from "@mui/material";
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { margin } from "@mui/system";

const ViewAC = () => {
    const [value, setValue] = React.useState(0);
    const candidates = ["John", "Robert", "Bob", "Joe"]
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const showTextArea = (user) => {
        console.log("dsfsd")
        return (

            <textarea placeholder={user} rows={"5"} cols={"100"} style={{ resize: "none" }} />

        )
    };




    return (

        <div>
            <NavBar />
            <div style={{ float: "left", width: '75%', marginLeft: "20px" }}>

                <div>
                    <h1 >Assessment Centre</h1>
                    <div className="right-header" style={{ display: 'flex', float: "right", marginTop: "10px" }}>
                        <NotificationsIcon fontSize="large" />
                        <Avatar src="/broken-image.jpg" />

                    </div>


                </div>

                <hr />

                <div className="subHeader" style={{ clear: "both", marginBottom: "80px" }}>
                    <div style={{ float: "left" }}>
                        <h2>*Software Development* Stream</h2>
                        <h3>Wednesday, DAY MONTH YEAR TIMESLOT</h3>
                    </div>
                    <div style={{ float: "right", display: "flex" }}>
                        <Avatar src="/broken-image.jpg" />
                        <p>Assessment Centre Coordinator: *NAME*</p>
                    </div>
                    {/*something to do with float*/}
                </div>

                <hr />

                <div>
                    <h2>Assigned Candidates</h2>
                </div>
                <Box sx={{}}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="primary"
                        indicatorColor="secondary"
                        aria-label="secondary tabs example"
                        centered
                        variant="fullWidth"
                    >

                        {/* <Tab value="one" label="Candidate One" style={{ fontWeight: 'bold', fontSize: "20px", textTransform: "none" }} />
                        <Tab value="two" label="Candidate Two" style={{ fontWeight: 'bold', fontSize: "20px", textTransform: "none" }} />
                        <Tab value="three" label="Candidate Three" style={{ fontWeight: 'bold', fontSize: "20px", textTransform: "none" }} />
                        <Tab value="four" label="Candidate Four" style={{ fontWeight: 'bold', fontSize: "20px", textTransform: "none" }} /> */}
                        {candidates.map((user, index) => <Tab value={index} label={user} style={{ fontWeight: 'bold', fontSize: "20px", textTransform: "none" }} key={index} />

                        )
                        }
                    

                    </Tabs>
                    <Box sx={{display: "block" }} >
                            {value === 0 && (
                                <Box>
                                    <textarea placeholder="1111" rows={"5"} cols={"100"} style={{ resize: "none" }} />
                                </Box>
                            )}
                            {value === 1 && (
                                <Box>
                                    <textarea placeholder="2222" rows={"5"} cols={"100"} style={{ resize: "none" }} />
                                </Box>
                            )}
                            {value === 2 && (
                                <Box>
                                    <textarea placeholder="3333" rows={"5"} cols={"100"} style={{ resize: "none" }} />
                                </Box>
                            )}
                            {value === 3 && (
                                <Box>
                                    <textarea placeholder="44444" rows={"5"} cols={"100"} style={{ resize: "none" }} />
                                </Box>
                            )}

                        </Box>
                </Box>
                <div style={{ clear: "both", padding: "20px 0 0 0" }}>


                    <div style={{ float: "right" }}>
                        <a href="/candidateinformation/:abc" target="_blank"><Button variant="contained" component="label" sx={{ m: 5 }}>View Profile</Button></a>
                        <Button variant="contained" component="label" sx={{ m: 5 }}>View Interview Form</Button>
                    </div>
                </div>


                <div style={{ clear: "both" }}>
                    <hr />
                    <h2>Assigned Interviewers</h2>

                    <div className="assignedInterviewers" style={{ width: "80%" }}>
                        <div className="salesColumn" style={{ float: "left" }}>
                            <div>
                                <h3>Sales Interviewer 1</h3>
                                <p>Sal Innervewer</p>
                                <h4>Assigned Candidates</h4>
                                <ul style={{ listStyleType: "none" }}>
                                    <li>John Doe</li>
                                    <li>Jon Doe</li>
                                    <li>Joe Doe</li>
                                    <li>Do Doe</li>
                                </ul>
                            </div>
                            <div style={{ marginTop: "6px" }}>
                                <h3>Sales Interviewer 2</h3>
                                <p>Sal Innervewer</p>
                                <h4>Assigned Candidates</h4>
                                <ul style={{ listStyleType: "none" }}>
                                    <li>John Doe</li>
                                    <li>Jon Doe</li>
                                    <li>Joe Doe</li>
                                    <li>Do Doe</li>
                                </ul>
                            </div>
                        </div>

                        <div className="techColumn" style={{ float: "right" }}>
                            <div>
                                <h3>Techinical Interviewer 1</h3>
                                <p>Sal Innervewer</p>
                                <h4>Assigned Candidates</h4>
                                <ul style={{ listStyleType: "none" }}>
                                    <li>John Doe</li>
                                    <li>Jon Doe</li>
                                    <li>Joe Doe</li>
                                    <li>Do Doe</li>
                                </ul>
                            </div>
                            <div style={{ marginTop: "6px" }}>
                                <h3>Techinical Interviewer 2</h3>
                                <p>Sal Innervewer</p>
                                <h4>Assigned Candidates</h4>
                                <ul style={{ listStyleType: "none" }}>
                                    <li>John Doe</li>
                                    <li>Jon Doe</li>
                                    <li>Joe Doe</li>
                                    <li>Do Doe</li>
                                </ul>
                            </div>
                        </div>

                    </div>
                    <div style={{ float: "right", clear: "both" }}>
                        <Button variant="contained" component="label" sx={{ m: 5 }}>Back</Button>
                    </div>
                </div>
            </div>


        </div>
    )
}


export default ViewAC;