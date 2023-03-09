import React from 'react';

const MakeAC = () => {
  return (
    <div>
      <img alt="placeholder" />

      <label htmlFor='username'>Username:</label>
      <input type='text' id='username' placeholder='Enter email address' />

      <label htmlFor='password'>Password:</label>
      <input type='password' id='password' placeholder='Enter password' />

      <button> Login </button>
    </div>
  )
}

export default MakeAC;