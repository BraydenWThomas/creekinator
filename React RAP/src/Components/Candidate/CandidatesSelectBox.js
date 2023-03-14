// React
import React from 'react';
import { Link } from 'react-router-dom';

// Components
import '../Styling/RecruiterStyles.css';

// Material UI
import DeleteIcon from '@mui/icons-material/Delete';
<<<<<<< HEAD
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import CandidateInformation from './CandidateInformation';
const CandidateSelectBox = () => {
    
    return (
       
        <a href="/createcandidate" target={"_blank"}>
        <div className='candidateSelectBox' style={{ clear: "both" }}>
                
                <button className='candidateDelete'><DeleteIcon /></button>
            
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
=======
import { Button, Menu, MenuItem, IconButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
>>>>>>> master

const CandidateSelectBox = ({ candidate }) => {
  // For Material UI Menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleConfirm = (id) => {
    // const requestOptions = {
    //   method: 'DELETE',
    //   redirect: 'follow',
    //   headers: { 'content-type': 'application/json' },
    // };

    // fetch("http://localhost:8080/api/ac/" + id, requestOptions)
    //   .then(response => response.json())
    //   .then(result => console.log(result))
    //   .catch(error => console.log('error', error));
  };

  const handleCancel = () => {

  };

  const handleDelete = (id) => {
    const requestOptions = {
      method: 'DELETE',
      redirect: 'follow',
      headers: { 'content-type': 'application/json' },
    };

    fetch("http://localhost:8080/api/candidate/" + id, requestOptions)
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
  
  return (

      <div className='candidateSelectBox' style={{ clear: "both" }}>
        <IconButton
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}>
            <MoreHorizIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}>
          {/* <Link to={`/candidate/info/name=${candidate.first_name + candidate.middle_name + candidate.last_name}&id=${candidate.id}`}> */}
          <Link to={`/candidate/info/${candidate.id}`}>
            <MenuItem>
              View
            </MenuItem>
          </Link>
          <Link to={`/candidate/update/${candidate.id}`}>
            <MenuItem>
              Update
            </MenuItem>
          </Link>
          <MenuItem onClick={() => handleDelete(candidate.id)}>
            Delete
          </MenuItem>
        </Menu>

        <div style={{ marginLeft: "20px" }}>
          <div style={{ display: "flex", clear: "both" }}>

            <h3> {candidate.first_name + " " + candidate.last_name} </h3>
          </div>
          <div style={{ display: "flex", clear: "both" }}>

            <h3> {candidate.mobile_number} </h3>
          </div>
          <div style={{ display: "flex", clear: "both" }}>

            <h3> {candidate.email} </h3>
          </div>
          <div style={{ display: "flex", marginBottom: "20px", clear: "both" }}>

            <h3> {candidate.applied_stream} </h3>
          </div>
        </div>
      </div>

  )
}

export default CandidateSelectBox;
