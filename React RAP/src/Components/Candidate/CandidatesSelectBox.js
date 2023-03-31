// React
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Components
import '../Styling/RecruiterStyles.css';
import CandidateInformationRec from './CandidateInformationRec';
import UpdateCandidate from './UpdateCandidate';

// Material UI
import { Button, Menu, MenuItem, IconButton, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Avatar, Card, List, ListItem, ListItemAvatar, ListItemText, ListItemIcon } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EmailIcon from '@mui/icons-material/Email';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import WorkIcon from '@mui/icons-material/Work';

const CandidateSelectBox = ({ candidate }) => {
  // For Material UI Menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [readModalOpen, setReadModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

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
  }

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

    <div className='candidateSelectBox'>
      <Card>
        <div className='candidateSelectBox-menu'>
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
            <MenuItem onClick={() => setReadModalOpen(true)}>
              View
            </MenuItem>
            <MenuItem onClick={() => setUpdateModalOpen(true)}>
              Update
            </MenuItem>
            <MenuItem
              onClick={handleOpenDeleteModal}>Delete
            </MenuItem>
          </Menu>
        </div>

        <List>
          <ListItem disablePadding sx={{marginLeft:'10px', marginBottom:'1%'}}>
            <ListItemIcon onClick={() => setReadModalOpen(true)}>
              <Avatar>
                <AccountBoxIcon/>
              </Avatar>
            </ListItemIcon>
            <ListItemText sx={{marginLeft:'8px', fontSize:'25px', fontWeight:'bold'}} disableTypography primary={candidate.first_name + " " + candidate.last_name} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
                <EmailIcon />
            </ListItemIcon>
            <ListItemText primary={candidate.email.toLowerCase()} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
                <PhoneInTalkIcon />
            </ListItemIcon>
            <ListItemText primary={candidate.mobile_number} />
          </ListItem>
          <ListItem>
            <ListItemIcon> 
                <WorkIcon />
            </ListItemIcon>
            <ListItemText primary={candidate.applied_stream} />
          </ListItem>
        </List>

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

        <CandidateInformationRec
          readModalOpen={readModalOpen}
          setReadModalOpen={setReadModalOpen}
          candidateId={candidate.id}
        />
        <UpdateCandidate
          updateModalOpen={updateModalOpen}
          setUpdateModalOpen={setUpdateModalOpen}
          candidateId={candidate.id}
        />
      </Card>
    </div>

  )
}

export default CandidateSelectBox;
