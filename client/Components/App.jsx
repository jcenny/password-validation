import React from 'react';
import PasswordForm from './PasswordForm.jsx';
import Axios from 'axios';
import { GlobalStyle } from './Styles/AppStyles.jsx';

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

  componentDidMount() {
    Axios.get('http://www.mocky.io/v2/5de6c328370000a21d0925f2')
      .then((data) => {
        const { user } = eval('(' + data.data + ')');
        this.setState({
          name: user.name,
          email: user.email,
        })
      })
      .catch((err) => {
        console.log(`error retrieving user info: ${err}`);
      })
  }

  handleSubmit(password) {
    this.setState({
      password,
      page: 'login'
    })
  }

  handlePages() {
    const { page, email } = this.state;
    if (page === 'password') {
      return <PasswordForm email={email} handleSubmit={this.handleSubmit}/>
    } else {
      return <h3>Validate your email to continue...</h3>
    }
  }

  render() {
    return (
      <div>
        <GlobalStyle />
        {this.handlePages()}
      </div>
    )
  }
}

export default App;