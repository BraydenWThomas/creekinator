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
import { Box, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

const AdminDashboard = () => {
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

  // Fetch all existing users

  const handleSubmit = () => {
    const newUser = { fullname, username, password, email, role };
   
    setUsers([...users, newUser]);
    setFullname("");
    setUsername("");
    setPassword("");
    setEmail("");
    setRole("");
    console.log(role.includes("Interviewer"))
    if (role.includes("Interviewer")) {
      console.log("Working")
      const body =
        JSON.stringify({
          username: username,
          email: email,
          password: password,
          role: ["interviewer"],
          name: fullname
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
    } else {
      const body =
        JSON.stringify({
          username: username,
          email: email,
          password: password,
          role: [role.toLowerCase()],
          name: fullname
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
      <Container component="main">
        <div className="header" style={{ display: "flex" }}>
          <Typography component="h1" variant="h3" fontFamily="barlow" mt={2} sx={{ flex: 1 }}>Admin Dashboard</Typography>
          <div className="right-header" style={{ display: 'flex', paddingRight: "2%", paddingTop: "2%" }}>
            <NotificationsIcon fontSize="large" />
            <Avatar src="/broken-image.jpg" />
          </div>
        </div>
        <Divider sx={{ mt: 2, mb: 2 }} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 3,
          }}>
          <div className="create-user">
            <Typography component="h2" variant="h4"> Create User </Typography>
            <Grid container justifyContent='space-between' alignItems='center' spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  margin='normal'
                  id="outlined-fullname-input"
                  label="Full Name"
                  type="text"
                  autoComplete="current-fullname"
                  value={fullname}
                  onChange={(event) => setFullname(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  margin='normal'
                  id="outlined-username-input"
                  label="Username"
                  type="text"
                  autoComplete="current-username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  margin='normal'
                  id="outlined-password-input"
                  label="Password"
                  type="text"
                  autoComplete="current-password"
                  helperText="Minimum password length of 6"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  margin='normal'
                  id="outlined-email-input"
                  label="Email"
                  type="email"
                  autoComplete="current-email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl required fullWidth sx={{ mt: 4 }}>
                  <InputLabel id="role-select-label">Role</InputLabel>
                  <Select
                    labelId="role-select-label"
                    id="role-select"
                    value={role}
                    label="Role"
                    fullWidth
                    onChange={(event) => setRole(event.target.value)}
                  >
                    <MenuItem value={"Recruiter"}>Recruiter</MenuItem>
                    <MenuItem value={"Sales Interviewer"}>Sales Interviewer</MenuItem>
                    <MenuItem value={"Technical Interviewer"}>Technical Interviewer</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth variant='contained' type='button' sx={{ mt: 3, mb: 2 }} onClick={handleSubmit}>Create</Button>
              </Grid>
            </Grid>
          </div>
        </Box>
        <Divider variant='middle' />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 2
          }}>
          <Container maxWidth="lg" >
            <Grid container justifyContent='space-between' alignItems='center'>
              <Grid item>
                <Typography component="h2" variant="h4"> Users </Typography>
              </Grid>
              <Grid item>
                <FormControl sx={{ m: 2, minWidth: 200 }}>
                  <InputLabel id="users-list-filter">Filter</InputLabel>
                  <Select required labelId="filter-select-label" id="filter" value={selection} label="Filter"
                    onChange={(event) => handleFilter(event)}>
                    <MenuItem value={"All"}>All</MenuItem>
                    <MenuItem value={"Recruiter"}>Recruiter</MenuItem>
                    <MenuItem value={"Sales Interviewer"}>Sales Interviewer</MenuItem>
                    <MenuItem value={"Technical Interviewer"}>Technical Interviewer</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <div className="user-list">
              <Paper sx={{ borderRadius: 2, p: 2 }}>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="Users table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Role</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selection === "All"
                        ? users.map((user) => (
                          <TableRow key={user.email}>
                            <TableCell component="th" scope="row">
                              {user.fullname}
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.role}</TableCell>
                          </TableRow>
                        ))
                        : filteredUsers.map((filteredUser) => (
                          <TableRow key={filteredUser.email}>
                            <TableCell component="th" scope="row">
                              {filteredUser.fullname}
                            </TableCell>
                            <TableCell>{filteredUser.email}</TableCell>
                            <TableCell>{filteredUser.role}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </div>
          </Container>
        </Box>
      </Container>
    </div >
  )
}

export default AdminDashboard;