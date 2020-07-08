import React from 'react';
import PasswordForm from './PasswordForm.jsx';

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <PasswordForm />
      </div>
    )
  }
}

export default App;