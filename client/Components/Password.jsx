import React from 'react';
import { Input, Label } from './Styles/PasswordFormStyles.jsx';

const Password = ({ password, type, handleChange, handleShow}) => {
  return (
    <div>
      {password ? <Label>Password</Label> : ''}
      <Input type={type} name='password' placeholder='Password' value={password} onChange={handleChange} />
      <input type='checkbox' onClick={handleShow} />
      <label style={{ color: 'grey', fontSize: '16px' }}>Show</label>
    </div>
  )
}

export default Password;