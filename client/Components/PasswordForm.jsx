import React from 'react';

class PasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'password',
      password: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value
    }, () => {
      console.log(`onchange: ${this.state.password}`)
    })
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
    const { password, type } = this.state;
    return (
      <div>
        <form>
          <label>Password</label>
          <input type={type} name='password' value={password} onChange={this.handleChange} />
          <input type='checkbox' onClick={this.handleShow} />
          <label>Show</label>
        </form>
        <div>Should contain</div>
        <ul>
          <li>8-72 Characters</li>
          <li>1 Lowercase Character</li>
          <li>1 Uppercase Character</li>
          <li>Number</li>
          <li>Should Not Match Your Email Address</li>
        </ul>
      </div>
    )
  }
}

export default PasswordForm;