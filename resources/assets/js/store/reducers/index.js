import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import auth from './Auth';
import errors from './Errors';

const rootReducer = combineReducers({
    form: formReducer,
    auth,
    errors
});

export default rootReducer;