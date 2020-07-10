import React from 'react';
import styled from 'styled-components';

const List = styled.li`
font-size: 10px;
color: ${({color}) => `${color};`};
`;

class PasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'password',
      password: '',
      length: 'black',
      lowercase: 'black',
      uppercase: 'black',
      number: 'black',
      email: 'black',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.checkValidation = this.checkValidation.bind(this);
    this.includesNumber = this.includesNumber.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value
    }, () => {
      this.checkValidation();
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
        length: 'green',
      })
    } else {
      this.setState({
        length: 'black',
      })
    }
    // check for lowercase and uppercase
    if (password.toUppercase !== password && password.toLowerCase() !== password) {
      this.setState({
        lowercase: 'green',
        uppercase: 'green'
      })
    } else if (password.toUpperCase() !== password && password.toLowerCase() === password) {
      this.setState({
        lowercase: 'green',
        uppercase: 'black',
      })
    } else if (password.toUpperCase() === password && password.toLowerCase() !== password) {
      this.setState({
        uppercase: 'green',
        lowercase: 'black',
      })
    } else {
      this.setState({
        uppercase: 'black',
        lowercase: 'black',
      })
    }
    // check for number
    if (this.includesNumber(password)) {
      this.setState({
        number: 'green'
      })
    } else {
      this.setState({
        number: 'black'
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
    const { password, type, length, lowercase, uppercase, number, email } = this.state;
    return (
      <div>
        <form>
          <label>Password</label>
          <input type={type} name='password' value={password} onChange={this.handleChange} />
          <input type='checkbox' onClick={this.handleShow} />
          <label>Show</label>
          <button onClick={this.props.handleSubmit}>Submit</button>
        </form>
        <div>Should contain</div>
        <ul>
          <List color={length}>8-72 Characters</List>
          <List color={lowercase}>1 Lowercase Character</List>
          <List color={uppercase}>1 Uppercase Character</List>
          <List color={number}>Number</List>
          <List color={email}>Should Not Match Your Email Address</List>
        </ul>
      </div>
    )
  }
}

export default PasswordForm;