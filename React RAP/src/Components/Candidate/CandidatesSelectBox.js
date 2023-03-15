// React
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Components
import '../Styling/RecruiterStyles.css';

// Material UI
import { Button, Menu, MenuItem, IconButton, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const CandidateSelectBox = ({ candidate }) => {
  // For Material UI Menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenDeleteModal = () => {
    setDeleteModalOpen(true);
    handleClose();
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
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

      handleCloseDeleteModal();
      window.location.reload();
  }

  return (

    <div className='candidateSelectBox' style={{ clear: "both" }}>
      <div className='candidateSelectBox-menu' style={{ position: 'absolute', right: 30 }}>
        <IconButton
          id="basic-button"
          onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}>
          <Link to={`candidate/info/${candidate.id}`}>
            <MenuItem>
              View
            </MenuItem>
          </Link>
          <Link to={`candidate/update/${candidate.id}`}>
            <MenuItem>
              Update
            </MenuItem>
          </Link>
          <MenuItem 
          onClick={handleOpenDeleteModal}>Delete
          </MenuItem>
        </Menu>
      </div>

      <div className='box' style={{ margin: "20px" }}>
        <Typography component="h3" variant='h5'> {candidate.first_name + " " + candidate.last_name} </Typography>
        <Typography component="h3" variant='h6'> {candidate.mobile_number} </Typography>
        <Typography component="h3" variant='h6'> {candidate.email} </Typography>
        <Typography component="h3" variant='h6'> {candidate.applied_stream} </Typography>
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteModalOpen} onClose={handleCloseDeleteModal}>
        <DialogTitle>Delete Candidate</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete {candidate.first_name + ' ' + candidate.last_name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteModal}>Cancel</Button>
          <Button onClick={() => handleDelete(candidate.id)} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>

  )
}

export default CandidateSelectBox;
