import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import NavBar from './NavBar';
import { useParams } from 'react-router-dom';

const AdminDashboard = () => {
  const {abc} = useParams()
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
    console.log(abc);

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
      <div className='Dashboard' style={{ float: 'left', width: '80%' }}>
        <h1>Dashboard</h1>
        <Divider variant='middle'/>
        <div className='CreateUser' style={{padding: '3%'}}>
          <TextField
          id="outlined-username-input"
          label="Username"
          type="text"
          autoComplete="current-username"
          onChange={(event) => setUsername(event.target.value)}
        />
          <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <TextField
          id="outlined-email-input"
          label="Email"
          type="email"
          autoComplete="current-email"
          onChange={(event) => setEmail(event.target.value)}
        />
          <label htmlFor='role'>Job Role:</label>
          <select id='role' onChange={(event) => setRole(event.target.value)}>
            <option value="Recruiter">Recruiter</option>
            <option value="Interviewer">Interviewer</option>
          </select>
          <Button variant='outlined' size='small' type='button' onClick={handleSubmit}>Create User</Button>
    </div>
        <div>
          <h1>Users</h1>
          <select
            id='filter' onChange={(event) => handleFilter(event)}>
            <option value='All'> All </option>
            <option value='Recruiter'> Recruiter </option>
            <option value='Interviewer'> Interviewer </option>
          </select>
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