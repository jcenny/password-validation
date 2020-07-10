import React from 'react';
import Password from './Password.jsx';
import ValidationList from './ValidationList.jsx';
import Confirm from './Confirm.jsx';
import { NavForm } from './Styles/PasswordFormStyles.jsx';

class PasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'password',
      password: '',
      confirm: '',
      length: 'black',
      lowercase: 'black',
      uppercase: 'black',
      number: 'black',
      email: 'black',
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
    this.stillInvalid = this.stillInvalid.bind(this);
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
    const { password, length, lowercase, uppercase, number, email } = this.state;
    if (this.isAllValidated()) {
      this.props.handleSubmit(password);
    }
    //check each case
    this.stillInvalid({ length });
    this.stillInvalid({ lowercase });
    this.stillInvalid({ uppercase });
    this.stillInvalid({ number });
    this.stillInvalid({ email });
  }

  stillInvalid(caseObj) {
    const caseType = Object.keys(caseObj)[0];
    const isValid = caseObj[caseType];
    if (isValid === 'black' || isValid === 'red') {
      this.setState({
        [caseType]: 'red'
      })
    } else {
      this.setState({
        [caseType]: 'green'
      })
    }
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
    this.checkLetterCasing();
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
    // check for email 
    this.checkEmail();
  }

  checkLetterCasing() {
    const { password } = this.state;
    if (password.toUpperCase() !== password && password.toLowerCase() !== password) {
      this.setState({
        lowercase: 'green',
        uppercase: 'green',
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
  }

  checkEmail() {
    const { password } = this.state;
    const { email } = this.props;
    const emailStarter = email.split('@')[0];
    if (!password.includes(emailStarter) && password !== '') {
      this.setState({
        email: 'green'
      })
    } else {
      this.setState({
        email: 'black'
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
    const { length, lowercase, uppercase, number, email, matched } = this.state;
    if (length === 'green' && lowercase === 'green' && uppercase === 'green' && number === 'green' && email === 'green' && matched) {
      return true;
    } 
    return false;
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
          <Password password={password} type={type} handleChange={this.handleChange} handleShow={this.handleShow}/>
          <ValidationList length={length} lowercase={lowercase} uppercase={uppercase} number={number} email={email}/>
          <Confirm confirm={confirm} type={type} matched={matched} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
        </form>
      </NavForm>
    )
  }
}

export default PasswordForm;