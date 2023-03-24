// React + css
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
// Webpage Components
import NavBar from "./NavBar";
import AssignQuestionPack from './AssignQuestionPack';
// Material UI
import AddIcon from '@mui/icons-material/Add';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Button, IconButton, Paper, Typography, Box } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// This should be a component for Recruiter users, should be another tab
const FormSelect = () => {
    localStorage.setItem("status", "ROLE_RECRUITER")
    const packDummyList = [
        { name: '1', stream: 'Java Development', intSales: 'Interview 2', intTech: 'Interview 3' },
        { name: '2', stream: 'BA/BI', intSales: 'Interview 1', intTech: 'Interview 4' },
        { name: '3', stream: 'Data Engineering', intSales: 'Interview 3', intTech: 'Interview 5' },
        { name: '4', stream: 'Java Development', intSales: 'Interview 2', intTech: 'Interview 3' }
    ]
    const changeForm = () => {
        return (<AssignQuestionPack />)
    }
    const packListItem = (pack) => {
        return (

            <Paper className="formSelectBox" sx={{

                '& > :not(style)': {
                    m: 1,
                    width: '100%',
                    height: '5vh'

                }
            }} >
                <Box 
                    sx={{

                        '& > :not(style)': {
                            m: 2,
                            width: '100%',

                        }
                    }}>
                    {/* Display the information of the candidate */}

                    
                        <div aria-label="Users table">
                        <h2>Form {pack.name}</h2>
                        </div>
                </Box>

            </Paper>


        )
    }

    return (
        <div className="pageSection" >

            <div className="bodySection"   >
                <div className="header" style={{ display: "flex" }}>
                    <Typography
                        component="h1"
                        variant="h3"
                        mt={2}
                        ml={2}
                        sx={{ flex: 1 }}>
                        Technical Interview
                    </Typography>
                    <div className="right-header" style={{ display: 'flex', paddingRight: "2%", paddingTop: "2%" }}>
                        <NotificationsIcon fontSize="large" />
                        <Avatar src="/broken-image.jpg" />
                    </div>
                </div>

                <Divider sx={{ mt: 2, mb: 2 }} />

                {/* ===> Indentation needs fixing ===> */}
                <div className='packList' style={{ display: 'flex', marginLeft: 20 }}>
                    <Typography
                        component="h2"
                        variant="h4"
                        style={{ flex: 1 }}>
                        Stream:
                    </Typography>

                    <div className='add-c' style={{ marginRight: 20, float: "right" }}>
                        <Link to={"/questions"}>
                            <IconButton> <AddIcon fontSize='large' style={{ color: "black" }} /> </IconButton>
                        </Link>
                    </div>
                </div>



                <div style={{ marginLeft: "8%", marginRight: "8%" }}>
                    {
                        packDummyList.map((pack, index) =>
                        <a href="/questions">
                                {packListItem(pack)}
                               
                           </a>
                        )
                    }
                </div>


            </div>
        </div>
    )
}

export default FormSelect;