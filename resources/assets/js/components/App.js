import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { Provider } from 'react-redux';

import LandingPage from './LandingPage';
import Login from './Login';
import Register from './Register';
import BackendLayout from '../Layout/BackendLayout';
import Errors from './Errors';
import jwt_decode from 'jwt-decode';

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

function auth(state=[], action) {
  switch(action.type) {
    case 'LOGGED_IN':
      return {
        user: action.payload
      };
    default:
      return state;
  }
}

function errors(state=[], action) {
  switch(action.type) {
    case 'LOGIN_FAILED':
      console.log("payload", action.payload);
      return [...action.payload];
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  form: formReducer,
  auth,
  errors
  // my other reducers come here
});

const isAuthenticated = () => {
  
  if(localStorage.getItem('token'))
  {
    let token = jwt_decode(localStorage.getItem('token'));

    if (token.exp > (new Date().getTime() / 1000))
    {
      return true;
    }
    console.log("has token", token);
  }

  return false;
};

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={(props) => (
  isAuthenticated() === true
    ? <Component {...props} />
    : <Redirect to='/login' />
  )} />
);

const store = createStore(rootReducer, {});

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
              <PrivateRoute path="/dashboard" component={BackendLayout}/>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
};

ReactDOM.render(<App />, document.getElementById('app'));