import React, { useState } from 'react';
import fdm from './fdm-logo.png';

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

  const handleFilter = (filter) => {
    setSelection(filter);

    if (selection === "Recruiter") {
      console.log(selection)
      const filteredUsers = users.filter(user =>
        user.role === selection);

      setFilteredUsers(filteredUsers);
    } else if (selection === "Interviewer") {
      console.log(selection)
      const filteredUsers = users.filter(user =>
        user.role === selection);

      setFilteredUsers(filteredUsers);
    } else {
      console.log(selection)
      setFilteredUsers(users);
    }
  }

  return (
    <div>
      <div className='NavSide' style={{ float: 'left', width: '20%' }}>
        <img src={fdm} alt="FDM Logo" />
        <h1>
          <a href='Dashboard'> Dashboard </a>
        </h1>
      </div>

      <div className='Dashboard' style={{ float: 'left', width: '80%' }}>
        <h1>Dashboard</h1>
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

          <button type='submit'>Create User</button>

        <div>
          <h1> Users </h1>
          <select
            id='filter' onChange={(event) => setSelection(event.target.value)}>
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
            {filteredUsers.map((user) => (
              <li key={user.username}>{user.username} ({user.role})</li>
            ))}
          </ul>
        }
      </div>
    </div>
  )
}

export default AdminDashboard;