import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { useParams } from 'react-router-dom';
import { Box, Container } from '@mui/material';

const AdminDashboard = () => {
  const { abc } = useParams();
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [users, setUsers] = useState([
    { fullname: "John Doe", username: "johndoe2", email: "johndoe@fdm.com", role: "Recruiter" },
    { fullname: "Jane Doe", username: "janedoe23", email: "janedoe@fdm.com", role: "Sales Interviewer" },
    { fullname: "Bob Smith", username: "bobsmith123", email: "bobsm@fdm.com", role: "Recruiter" },
    { fullname: "Alice Smith", username: "alicesmithi2", email: "alicesmith@fdm.com", role: "Technical Interviewer" },
  ]);

  // For filter
  const [selection, setSelection] = useState('All');
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleSubmit = () => {
    const newUser = { fullname, username, password, email, role };
    setUsers([...users, newUser]);
    setFullname("");
    setUsername("");
    setPassword("");
    setEmail("");
    setRole("")

    // console.log("Submit clicked")

    const body =
      JSON.stringify({
        username: username,
        email: email,
        password: password,
        role: [role.toLowerCase()]
      });

    const requestOptions = {
      method: 'POST',
      body: body,
      redirect: 'follow',
      headers: { 'content-type': 'application/json' }
    };

    fetch("http://localhost:8080/api/auth/signup", requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  const handleFilter = (event) => {
    const filter = event.target.value
    setSelection(filter);

    if (filter === "Recruiter") {
      setFilteredUsers(users.filter(user => user.role === filter));
    } else if (filter === "Sales Interviewer" || filter === "Technical Interviewer") {
      setFilteredUsers(users.filter(user => user.role === filter));
    } else {
      console.log("Else called in filter"); //There is an issues if this is being called :))
    }
  }

  return (
    <div>
      <Container component="main" maxWidth="xl">
          <div className="header" style={{ display: "flex" }}>
            <h1 style={{ flex: 1, margin: '1%' }}>Admin Dashboard</h1>
            <div className="right-header" style={{ display: 'flex', paddingRight: "2%", paddingTop: "2%" }}>
              <NotificationsIcon fontSize="large" />
              <Avatar src="/broken-image.jpg" />
            </div>
          </div>
          <Divider variant='middle' />
      <Box
            sx={{
              marginTop: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
          <div className="create-user">
            <h2 style={{ margin: '1%' }}>Create User</h2>
            <div className='CreateUser'>
              <FormControl>
                <TextField
                  required
                  id="outlined-fullname-input"
                  label="Full Name"
                  type="text"
                  autoComplete="current-fullname"
                  value={fullname}
                  sx={{ m: 2 }}
                  onChange={(event) => setFullname(event.target.value)}
                />
              </FormControl>

              <TextField
                required
                id="outlined-username-input"
                label="Username"
                type="text"
                autoComplete="current-username"
                value={username}
                sx={{ m: 2 }}
                onChange={(event) => setUsername(event.target.value)}
              />
              <TextField
                required
                id="outlined-password-input"
                label="Password"
                type="text"
                autoComplete="current-password"
                helperText="Minimum password length of 6"
                value={password}
                sx={{ m: 2 }}
                onChange={(event) => setPassword(event.target.value)}
              />
              <TextField
                required
                id="outlined-email-input"
                label="Email"
                type="email"
                autoComplete="current-email"
                value={email}
                sx={{ m: 2 }}
                onChange={(event) => setEmail(event.target.value)}
              />
              <FormControl required sx={{ m: 2, minWidth: 90 }}>
                <InputLabel id="role-select-label">Role</InputLabel>
                <Select
                  required
                  labelId="role-select-label"
                  id="role-select"
                  value={role}
                  label="Role"
                  onChange={(event) => setRole(event.target.value)}
                >
                  <MenuItem value={"Recruiter"}>Recruiter</MenuItem>
                  <MenuItem value={"Sales Interviewer"}>Sales Interviewer</MenuItem>
                  <MenuItem value={"Technical Interviewer"}>Technical Interviewer</MenuItem>
                </Select>
              </FormControl>
              <div className='create-button-row'>
                <Button variant='contained' type='button' sx={{ m: 2 }} onClick={handleSubmit}>Create</Button>
              </div>
            </div>
          </div>
          <Divider variant='middle' style={{ paddingTop: '2%' }} />
          <div className='users-list'>
            <h2 style={{ margin: '1%' }}>Users</h2>
            <FormControl sx={{ m: 2, minWidth: 150 }}>
              <InputLabel id="users-list-filter">Filter</InputLabel>
              <Select
                required
                labelId="filter-select-label"
                id="filter"
                value={selection}
                label="Filter by"
                onChange={(event) => handleFilter(event)}>
                <MenuItem value={"All"}>All</MenuItem>
                <MenuItem value={"Recruiter"}>Recruiter</MenuItem>
                <MenuItem value={"Sales Interviewer"}>Sales Interviewer</MenuItem>
                <MenuItem value={"Technical Interviewer"}>Technical Interviewer</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div style={{ paddingLeft: '40px' }}>
            {selection === "All"
              ? <ul>
                {users.map((user) => (
                  <li key={user.fullname}>{user.fullname} ({user.role})</li>
                ))}
              </ul>
              : <ul>
                {filteredUsers.map((filteredUser) => (
                  <li key={filteredUser.fullname}>{filteredUser.fullname} ({filteredUser.role})</li>
                ))}
              </ul>
            }
          </div>
          </Box>
      </Container>
    </div>
  )
}

export default AdminDashboard;