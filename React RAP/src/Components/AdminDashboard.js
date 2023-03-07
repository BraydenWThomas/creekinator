import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import NavBar from './NavBar';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

const AdminDashboard = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Recruiter');
  const [users, setUsers] = useState([
    { username: "John Doe", email: 'johndoe@fdm.com', role: "Recruiter" },
    { username: "Jane Doe", email: 'janedoe@fdm.com', role: "Interviewer" },
    { username: "Bob Smith", email: 'bobsm@fdm.com', role: "Recruiter" },
    { username: "Alice Smith", email: 'alicesmith@fdm.com', role: "Interviewer" },
  ]);

  // For filter
  const [selection, setSelection] = useState('All');
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleSubmit = () => {
    const newUser = { username, password, email, role };
    setUsers([...users, newUser]);
    setUsername('');
    setPassword('');
    setEmail('');
    setRole('Recruiter')
  }

  const handleFilter = (event) => {
    const filter = event.target.value
    setSelection(filter);

    if (filter === "Recruiter") {
      //console.log("Recruiter");
      setFilteredUsers(users.filter(user => user.role === filter));
    } else if (filter === "Interviewer") {
      //console.log("Interviewers")
      setFilteredUsers(users.filter(user => user.role === filter));
    } else {
      console.log("Else called in filter"); //There is an issues if this is being called :))
    }
  }

  return (
    <div>
      <NavBar />
      <div className='Content' style={{ float: 'left', width: '80%', backgroundColor: "#f2f2f2" }}>
        <div className="header" style={{ display: "flex" }}>
          <h1 style={{ flex: 1, margin: '1%' }}>Admin Dashboard</h1>
          <div className="right-header" style={{ display: 'flex', paddingRight: "2%", paddingTop: "2%" }}>
            <NotificationsIcon fontSize="large" />
            <Avatar src="/broken-image.jpg" />
          </div>
        </div>
        <Divider variant='middle' />
        <div className="create-user">
          <h2 style={{ margin: '1%' }}>Create User</h2>
          <div className='CreateUser' style={{}}>
            <TextField
              required
              id="outlined-username-input"
              label="Username"
              type="text"
              autoComplete="current-username"
              sx={{ m: 2 }}
              onChange={(event) => setUsername(event.target.value)}
            />
            <TextField
              required
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              sx={{ m: 2 }}
              onChange={(event) => setPassword(event.target.value)}
            />
            <TextField
              required
              id="outlined-email-input"
              label="Email"
              type="email"
              autoComplete="current-email"
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
                <MenuItem value={"Interviewer"}>Interviewer</MenuItem>
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
              <MenuItem value={"Interviewer"}>Interviewer</MenuItem>
            </Select>
          </FormControl>
        </div>

        {selection === "All"
          ? <ul>
            {users.map((user) => (
              <li key={user.username}>{user.username} ({user.role})</li>
            ))}
          </ul>
          : <ul>
            {filteredUsers.map((filteredUser) => (
              <li key={filteredUser.username}>{filteredUser.username} ({filteredUser.role})</li>
            ))}
          </ul>
        }
      </div>
    </div>
  )
}

export default AdminDashboard;