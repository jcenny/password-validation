import React from 'react';
import styled from 'styled-components';

const NavForm = styled.div`
display: flex;
align-items: center;
justify-content: center;
padding-top: 60px;
`
const List = styled.ul`
list-style-type: circle;
padding: 10px 0px 30px 0px;
font-size: 15px;
font-style: italic;
`
const Input = styled.input`
margin-right: 10px;
width: 400px;
height: 25px;
font-size: 14px;
border: 1px solid grey;
border-radius: 7px;
`
const Label = styled.div`
weight: 10px;
font-size: 14px;
color: grey;
margin-bottom: 5px;
margin-left: 3px;
font-weight: 400;
`
const Button = styled.button`
margin-left: 10px;
background-color: white;
border: 1px solid grey;
border-radius: 10px;
color: black;
padding: 5px 10px;
text-align: center;
text-decoration: none;
font-size: 14px;
`

export {
  List,
  NavForm,
  Input, 
  Label, 
  Button
}