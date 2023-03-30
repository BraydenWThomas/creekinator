// React + css
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

// Webpage Components
import NavBar from "./NavBar";

// Material UI
import AddIcon from '@mui/icons-material/Add';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Button, IconButton, Modal, Paper, Typography } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import PackModal from './PackModal';
import axios from 'axios';
// This should be a component for Recruiter users, should be another tab

// Re-think how the packs work
//  Packs are either 'sales', or technical
//  Sales packs are universal, no need to filter by stream
//  Tech packs are more focussed, need to be filtered by stream

const PackView = () => {

    // Modals
    const [openSale, setOpenSale] = useState(false);
    const handleOpenSale = () => setOpenSale(true);
    const handleCloseSale = () => setOpenSale(false);

    const [openTech, setOpenTech] = useState(false);
    const handleOpenTech = () => setOpenTech(true);
    const handleCloseTech = () => setOpenTech(false);

    const [packList, setPackList] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/pack`)
            .then(response => setPackList(response.data));
    }, [packList]);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };




    // Dummy Data
    const interviewDummySales = ["Sales Interview 1", "Sales Interview 2", "Sales Interview 3", "Sales Interview 4"]
    const interviewDummyTech = ["Technical Interview 1", "Technical Interview 2", "Technical Interview 3", "Technical Interview 4"]

    const packDummyList = [
        { name: '1', stream: 'Java Development', intSales: interviewDummySales[1], intTech: interviewDummyTech[2] },
        { name: '2', stream: 'BA/BI', intSales: interviewDummySales[0], intTech: interviewDummyTech[3] },
        { name: '3', stream: 'Data Engineering', intSales: interviewDummySales[3], intTech: interviewDummyTech[0] },
        { name: '4', stream: 'Java Development', intSales: interviewDummySales[1], intTech: interviewDummyTech[1] },
        { name: '5', stream: 'AWS', intSales: interviewDummySales[0], intTech: interviewDummyTech[0] }
    ]
    //////////////////////////////////////

    const packListItem = (pack) => {
        localStorage.setItem("status", "ROLE_RECRUITER")
        return (
            <Paper sx={{ borderRadius: 2 }} style={{ width: "90%", margin: "20px auto" }}>
                {/* Dispalys the information of the candidate */}
                <TableContainer>
                    <Table aria-label="Users table">
                        <TableHead >
                            <TableRow>
                                <TableCell><h2>Pack {pack.name}</h2></TableCell>
                                <TableCell>
                                    <IconButton
                                        id="basic-button"
                                        style={{ float: "right" }}>
                                        <MoreVertIcon />
                                    </IconButton></TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            <TableRow>
                                {/* Align tto the bottom of PACK NAME */}
                                <TableCell><h3>Stream - {pack.stream}</h3></TableCell>

                                {/* Has to be redone I think, cant links may not work properly
                                    Have convert the sales/tech form maps to functions later for efficiency
                                    have to links have todiscern between sales and tech ninterview forms
                                */}
                                <TableCell style={{ float: "right" }}>

                                    <TableRow >
                                        <TableCell>Sales Interview</TableCell>
                                        <TableCell>

                                            <Tooltip title="Change sales form">
                                                <Button onClick={handleOpenSale}> {pack.intSales} </Button>
                                            </Tooltip>

                                            {/* sales */}
                
                                            <PackModal 
                                                open={openSale}
                                                handleClose={handleCloseSale}
                                                // TODO: Fetch list of all sales interviews
                                                interviews={interviewDummySales}
                                            />

                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>
                                            Technical Interview
                                        </TableCell>
                                        <TableCell>
                                            <Tooltip title="Change technical form">
                                                <Button onClick={handleOpenTech}> {pack.intTech} </Button>
                                            </Tooltip>

                                            {/* Technical Modal */}
                                            <PackModal 
                                                open={openTech}
                                                handleClose={handleCloseTech}
                                                // TODO: Fetch filtered list of interviews by technical and stream
                                                interviews={interviewDummyTech}
                                            />
                                        </TableCell>
                                    </TableRow>

                                </TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>
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
                        Interview Packs
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
                        Packs
                    </Typography>
                </div>

                <div className='add-c' style={{ marginRight: 20, float: "right" }}>
                    <Link to={"/questions"}>
                        <IconButton> <AddIcon fontSize='large' style={{ color: "black" }} /> </IconButton>
                    </Link>
                </div>

                <div style={{ clear: "both" }}>
                    {
                        packList.map((pack) =>
                            <div>
                                {packListItem(pack)}
                            </div>
                        )
                    }
                </div>


            </div>
        </div>
    )
}

export default PackView;