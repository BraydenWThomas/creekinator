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
const ViewAC = () => {
    const [value, setValue] = React.useState('one');

    const handleChange = (event, newValue) => {
        setValue(newValue);
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

                <hr/>

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

                <hr/>

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
                        <Tab value="one" label="Candidate One" style={{ fontWeight: 'bold', fontSize: "20px", textTransform: "none" }} />
                        <Tab value="two" label="Candidate Two" style={{ fontWeight: 'bold', fontSize: "20px", textTransform: "none" }} />
                        <Tab value="three" label="Candidate Three" style={{ fontWeight: 'bold', fontSize: "20px", textTransform: "none" }} />
                        <Tab value="four" label="Candidate Three" style={{ fontWeight: 'bold', fontSize: "20px", textTransform: "none" }} />
                    </Tabs>
                </Box>
                <Button variant="contained" component="label" sx={{ m: 5 }} style={{ float: 'right' }}>View Profile</Button>
                <Button variant="contained" component="label" sx={{ m: 5 }} style={{ float: 'right' }}>View Interview Form</Button>
                
                {/* <label>Comment</label> */}
                <textarea rows={"4"} cols={"50"} resize={"none"}/>

                <hr/>

            </div>

            {

            }


        </div>
    )
}


export default ViewAC;