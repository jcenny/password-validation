import React from 'react';
import PasswordForm from './PasswordForm.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      page: 'password',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePages = this.handlePages.bind(this);
  }

  handleSubmit(password) {
    this.setState({
      password,
      page: 'login'
    })
  }

  handlePages() {
    const { page } = this.state;
    if (page === 'password') {
      return <PasswordForm handleSubmit={this.handleSubmit}/>
    } else {
      return <h1>Validate your email to continue...</h1>
    }
  }

  render() {
    return (
      <div>
        {this.handlePages()}
      </div>
    )
  }
}

export default App;