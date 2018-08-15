import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { Provider } from 'react-redux';

import LandingPage from './LandingPage';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import Header from './Header';

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
  return true;
  if(store.getState().auth.hasOwnProperty('user')) return true;

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
              {/* <Header /> */}
              <Route exact path="/" component={LandingPage} />
              <Route path="/login" component={Login} />
              <Route path="/account/create" component={Register} />
              <PrivateRoute path="/dashboard" component={Dashboard}/>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
};

ReactDOM.render(<App />, document.getElementById('app'));