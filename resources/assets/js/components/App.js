import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route } from 'react-router-dom';

import LandingPage from './LandingPage';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard'; 

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
            <div>
                <Route exact path="/" component={LandingPage} />
                <Route path="/login" component={Login} />
                <Route path="/account/create" component={Register} />
                <Route path="/dashboard" component={Dashboard} />
            </div>
        </BrowserRouter>
      );
  }
}
;

ReactDOM.render(<App />, document.getElementById('app'));