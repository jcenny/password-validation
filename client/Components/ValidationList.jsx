import React from 'react';
import styled from 'styled-components';
import { List } from './Styles/PasswordFormStyles.jsx';

const ListItem = styled.li`
font-size: 14px;
color: ${({ color }) => `${color};`};
left: 40px;
padding-top: 5px;
font-style: normal;
`;

const ValidationList = ({ length, lowercase, uppercase, number, email }) => {
  return (
    <List className='fa-ul'> Must contain the following:
      <ListItem color={length}>
        {length === 'black' ? '8-72 Characters' : <div>8-72 Characters <i className="fa-il fa fa-check-circle" aria-hidden="true"></i></div>}
      </ListItem>
      <ListItem color={lowercase}>
        {lowercase === 'black' ? '1 Lowercase Character' : <div>1 Lowercase Character <i className="fa-il fa fa-check-circle" aria-hidden="true"></i></div>}
      </ListItem>
      <ListItem color={uppercase}>
        {uppercase === 'black' ? '1 Uppercase Character' : <div>1 Uppercase Character <i className="fa-il fa fa-check-circle" aria-hidden="true"></i></div>}
      </ListItem>
      <ListItem color={number}>
        {number === 'black' ? '1 Number' : <div>1 Number <i className="fa-il fa fa-check-circle" aria-hidden="true"></i></div>}
      </ListItem>
      <ListItem color={email}>
        {email === 'black' ? 'Should Not Match Your Email Address' : <div>Should Not Match Your Email Address <i className="fa-il fa fa-check-circle" aria-hidden="true"></i></div>}
      </ListItem>
    </List>
  )
}

export default ValidationList;