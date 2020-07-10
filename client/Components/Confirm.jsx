import React from 'react';
import { Input, Button, Label } from './Styles/PasswordFormStyles.jsx';

const Confirm = ({ confirm, type, matched, handleChange, handleSubmit }) => {
  return (
    <div>
      {confirm ? <Label>Confirm</Label> : ''}
      <Input type={type} placeholder='Confirm' name='confirm' value={confirm} onChange={handleChange} />
      <i className="fa fa-check-circle" aria-hidden="true" style={!matched ? { color: 'grey' } : { color: 'green' }}></i>
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  )
}

export default Confirm;