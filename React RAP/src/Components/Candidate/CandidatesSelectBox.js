// React
import React from 'react';

// Components
import '../Styling/RecruiterStyles.css';

// Material UI
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Menu, MenuItem, IconButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const CandidateSelectBox = ({ candidate }) => {
  // For Menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleConfirm = () => {
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
    // console.log("Working")
    // return (
    //   <div>
    //     <Button
    //       variant="contained"
    //       color="red"
    //       onClick={handleConfirm}>
    //       Confirm
    //     </Button>

    //     <Button
    //       variant="outlined"
    //       onClick={handleCancel}>
    //       Cancel
    //     </Button>
    //   </div>
    // )
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
        {/* <Button 
          className='candidateDelete'
          onClick = {() => handleDelete(candidate.id)}> 
            <DeleteIcon /> 
        </Button> */}
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
          <MenuItem>
            View
          </MenuItem>
          <MenuItem>
            Update
          </MenuItem>
          <MenuItem>
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