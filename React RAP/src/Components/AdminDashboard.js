import React, { useEffect, useState } from 'react';
import fdm from './fdm-logo.png';
import Button from '@mui/material/Button';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TuneIcon from '@mui/icons-material/Tune';

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
      <div className='NavSide' style={{ float: 'left', width: '20%' }}>
        <img src={fdm} alt="FDM Logo" />
        <h1>
          <a href='Dashboard'> <DashboardIcon /> Dashboard </a>
          <a href='Calendar'> <CalendarMonthIcon /> Calendar </a>
          <a href='Settings'> <TuneIcon /> Settings</a>
        </h1>
      </div>

      <div className='Dashboard' style={{ float: 'left', width: '80%' }}>
        <h1>Dashboard</h1>
        <hr class="solid"></hr>
          <label htmlFor='username'>Username:</label>
          <input type='text' id='username' onChange={(event) => setUsername(event.target.value)} />

          <label htmlFor='password'>Password:</label>
          <input type='password' id='password' onChange={(event) => setPassword(event.target.value)} />

          <label htmlFor='email'>Email:</label>
          <input type="email" id='email' value={email} onChange={(event) => setEmail(event.target.value)} />

          <label htmlFor='role'>Job Role:</label>
          <select id='role' onChange={(event) => setRole(event.target.value)}>
            <option value="Recruiter">Recruiter</option>
            <option value="Interviewer">Interviewer</option>
          </select>
          <Button variant='outlined' size='small' type='button' onClick={handleSubmit}>Create User</Button>

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