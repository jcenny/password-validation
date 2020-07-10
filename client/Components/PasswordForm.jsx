import React from 'react';
import styled from 'styled-components';

const ListItem = styled.li`
font-size: 14px;
color: ${({ color }) => `${color};`};
left: 40px;
padding-top: 5px;
font-style: normal;
`;

const List = styled.ul`
list-style-type: circle;
padding: 10px 0px 30px 0px;
font-size: 15px;
font-style: italic;
`;

const NavForm = styled.div`
display: flex;
align-items: center;
justify-content: center;
padding-top: 60px;
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

class PasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'password',
      password: '',
      confirm: '',
      length: false,
      lowercase: false,
      uppercase: false,
      number: false,
      email: false,
      validated: false,
      matched: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.checkValidation = this.checkValidation.bind(this);
    this.checkEmail = this.checkEmail.bind(this);
    this.checkLetterCasing = this.checkLetterCasing.bind(this);
    this.includesNumber = this.includesNumber.bind(this);
    this.isAllValidated = this.isAllValidated.bind(this);
    this.checkPasswordMatch = this.checkPasswordMatch.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value
    }, () => {
      if (name === 'password') {
        this.checkValidation();
        this.checkPasswordMatch();
      } else {
        this.checkPasswordMatch();
      }
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    const { password } = this.state;
    this.props.handleSubmit(password);
  }

  checkValidation() {
    const { password } = this.state;
    // check for password length
    if (password.length >= 8) {
      this.setState({
        length: true,
      })
    } else {
      this.setState({
        length: false,
      })
    }
    // check for lowercase and uppercase
    this.checkLetterCasing();

    // check for number
    if (this.includesNumber(password)) {
      this.setState({
        number: true
      })
    } else {
      this.setState({
        number: false
      })
    }

    // check for email 
    this.checkEmail();

    // check for all validations
    this.isAllValidated();
  }

  checkLetterCasing() {
    const { password } = this.state;
    if (password.toUppercase !== password && password.toLowerCase() !== password) {
      this.setState({
        lowercase: true,
        uppercase: true
      })
    } else if (password.toUpperCase() !== password && password.toLowerCase() === password) {
      this.setState({
        lowercase: true,
        uppercase: false,
      })
    } else if (password.toUpperCase() === password && password.toLowerCase() !== password) {
      this.setState({
        uppercase: true,
        lowercase: false,
      })
    } else {
      this.setState({
        uppercase: false,
        lowercase: false,
      })
    }
  }

  checkEmail() {
    const { password } = this.state;
    const { email } = this.props;
    const emailStarter = email.split('@')[0];
    if (!password.includes(emailStarter) && password !== '') {
      this.setState({
        email: true
      })
    } else {
      this.setState({
        email: false
      })
    }
  }

  includesNumber(password) {
    let char;
    for (let i = 0; i < password.length; i++) {
      char = password[i];
      if (!isNaN(char) && char !== ' ') {
        return true;
      }
    }
    return false;
  }

  isAllValidated() {
    const { length, lowercase, uppercase, number, email } = this.state;
    if (length && lowercase && uppercase && number && email) {
      this.setState({
        validated: true,
      })
    } else {
      this.setState({
        validated: false,
      })
    }
  }

  checkPasswordMatch() {
    const { password, confirm } = this.state;
    if (password === confirm && confirm !== '' && password !== '') {
      this.setState({
        matched: true,
      })
    } else {
      this.setState({
        matched: false,
      })
    }
  }

  handleShow() {
    const { type } = this.state;
    if (type === 'password') {
      this.setState({
        type: 'text'
      })
    } else {
      this.setState({
        type: 'password'
      })
    }
  }

  render() {
    const { password, confirm, type, length, lowercase, uppercase, number, email, validated, matched } = this.state;
    return (
      <NavForm>
        <form>
          {password ? <Label>Password</Label> : <Label></Label>}
          <Input type={type} name='password' placeholder='Password' value={password} onChange={this.handleChange} />
          <input type='checkbox' onClick={this.handleShow} />
          <label style={{color: 'grey', fontSize: '16px'}}>Show</label>
          <List className='fa-ul'> Must contain the following: 
            <ListItem color={!length ? 'black' : 'green'}>
              {!length ? '8-72 Characters' : <div>8-72 Characters <i className="fa-il fa fa-check-circle" aria-hidden="true"></i></div>}
            </ListItem>
            <ListItem color={!lowercase ? 'black' : 'green'}>
              {!lowercase ? '1 Lowercase Character' : <div>1 Lowercase Character <i className="fa-il fa fa-check-circle" aria-hidden="true"></i></div>}
            </ListItem>
            <ListItem color={!uppercase ? 'black' : 'green'}>
              {!uppercase ? '1 Uppercase Character' : <div>1 Uppercase Character <i className="fa-il fa fa-check-circle" aria-hidden="true"></i></div>}
            </ListItem>
            <ListItem color={!number ? 'black' : 'green'}>
              {!number ? '1 Number' : <div>1 Number <i className="fa-il fa fa-check-circle" aria-hidden="true"></i></div>}
            </ListItem>
            <ListItem color={!email ? 'black' : 'green'}>
              {!email ? 'Should Not Match Your Email Address' : <div>Should Not Match Your Email Address <i className="fa-il fa fa-check-circle" aria-hidden="true"></i></div>}
            </ListItem>
          </List>
          {confirm ? <Label>Confirm</Label> : ''}
          <Input type={type} placeholder='Confirm' name='confirm' value={confirm} onChange={this.handleChange} />
          <i className="fa fa-check-circle" aria-hidden="true" style={!matched ? {color: 'grey'} : {color: 'green'}}></i>
          <Button onClick={this.handleSubmit}>Submit</Button>
        </form>
      </NavForm>
    )
  }
}

export default PasswordForm;