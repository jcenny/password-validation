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
padding-top: 50px;
`
const Input = styled.input`
margin: 5px;
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
margin-left: 7px;
font-weight: 400;
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
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.checkValidation = this.checkValidation.bind(this);
    this.checkEmail = this.checkEmail.bind(this);
    this.checkLetterCasing = this.checkLetterCasing.bind(this);
    this.includesNumber = this.includesNumber.bind(this);
    this.checkPasswordMatch = this.checkPasswordMatch.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value
    }, () => {
      this.checkValidation()})
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

  checkPasswordMatch() {
    const { password, confirm } = this.state;
    if (password === confirm) {
      this.setState({
        validated: true,
      })
    } else {
      this.setState({
        validated: false,
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
    const { password, confirm, type, length, lowercase, uppercase, number, email, validated } = this.state;
    return (
      <NavForm>
        <form>
          {password ? <Label>Password</Label> : <Label></Label>}
          <Input type={type} name='password' placeholder='Password' value={password} onChange={this.handleChange} />
          <input type='checkbox' onClick={this.handleShow} />
          <label>Show</label>
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
          {validated ? <i className="fa fa-check-circle" aria-hidden="true"></i> : ''}
          <button onClick={this.handleSubmit}>Submit</button>
        </form>
      </NavForm>
    )
  }
}

export default PasswordForm;