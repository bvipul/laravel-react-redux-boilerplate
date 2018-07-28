import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { Provider, connect } from 'react-redux';

import LandingPage from './LandingPage';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import Header from './Header';

function auth(state=[], action) {
  console.log(state, action);
  switch(action.type) {
    case 'LOGGED_IN':
      return {
        user: action.user,
        token: action.token
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  form: formReducer,
  auth
  // my other reducers come here
});


const store = createStore(rootReducer, {});

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
              <Header />
              <Route exact path="/" component={LandingPage} />
              <Route path="/login" component={Login} />
              <Route path="/account/create" component={Register} />
              <Route path="/dashboard" component={Dashboard} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
};

ReactDOM.render(<App />, document.getElementById('app'));