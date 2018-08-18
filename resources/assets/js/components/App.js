import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import LandingPage from './LandingPage';
import Login from './Auth/Login';
import Register from './Auth/Register';
import BackendLayout from '../Layout/BackendLayout';
import Errors from './Errors';
import PrivateRoute from '../routes/PrivateRoute';
import store from '../store';

// import './App.css';
// Styles
// CoreUI Icons Set
import '@coreui/icons/css/coreui-icons.min.css';
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import '../scss/style.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="app">
              <Errors />
              <Route exact path="/" component={LandingPage} />
              <Route path="/login" component={Login} />
              <Route path="/account/create" component={Register} />
              <PrivateRoute path="/admin" component={BackendLayout}/>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
};

ReactDOM.render(<App />, document.getElementById('app'));