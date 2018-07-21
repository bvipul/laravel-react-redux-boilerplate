import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { Provider } from 'react-redux';

import LandingPage from './LandingPage';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import Header from './Header'; 

const rootReducer = combineReducers({
  form: formReducer,
  // my other reducers come here
});


const store = createStore(rootReducer);

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